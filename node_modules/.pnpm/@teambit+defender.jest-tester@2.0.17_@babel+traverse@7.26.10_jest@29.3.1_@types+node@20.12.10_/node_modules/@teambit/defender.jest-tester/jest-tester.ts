import { resolve, basename } from 'path';
import { readFileSync } from 'fs-extra';
import normalize from 'normalize-path';
import minimatch from 'minimatch';
import { compact, flatten, isEmpty } from 'lodash';
import { proxy } from 'comlink';
import { Logger } from '@teambit/logger';
import { HarmonyWorker } from '@teambit/worker';
import { Tester, CallbackFn, TesterContext, Tests, ComponentsResults, ComponentPatternsEntry } from '@teambit/tester';
import { TestsFiles, TestResult, TestsResult } from '@teambit/tests-results';
import { TestResult as JestTestResult, AggregatedResult } from '@jest/test-result';
import { formatResultsErrors } from 'jest-message-util';
import { Component, ComponentMap } from '@teambit/component';
import { EnvContext, EnvHandler } from '@teambit/envs';
// import { EnvPolicyConfigObject, PeersAutoDetectPolicy } from '@teambit/dependency-resolver';
import type jest from 'jest';
import { JestError } from './jest-error';
import type { JestWorker } from './jest.worker';
import { JestOptions, JestTesterOptions } from './jest-options';

export const jestWorkerPath = require.resolve('./jest.worker');

const DEFAULT_NAME = 'jest-tester';

export class JestTester implements Tester {
  private readonly jestModule: typeof jest;

  constructor(
    readonly id: string,
    readonly jestConfig: string,
    private jestModulePath: string = require.resolve('jest'),
    private jestWorker: HarmonyWorker<JestWorker>,
    private logger: Logger,
    private opts: JestTesterOptions = {}
  ) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    this.jestModule = require(jestModulePath);
  }

  configPath = this.jestConfig;

  // eslint-disable-next-line react/static-property-placement
  displayName = 'Jest';

  _callback: CallbackFn | undefined;

  displayConfig() {
    return readFileSync(this.jestConfig, 'utf8');
  }

  version() {
    return this.jestModule.getVersion();
  }

  private attachTestsToComponent(testerContext: TesterContext, testResult: JestTestResult[]) {
    return ComponentMap.as(testerContext.components, (component) => {
      // TODO: remove this ts-ignore once we have updated the TesterContext on bit
      // @ts-ignore
      const patterns = this.opts.useSourceFiles ? testerContext.sourcePatterns : testerContext.patterns;
      const componentPatternValue = patterns!.get(component);
      if (!componentPatternValue) return undefined;
      const [currComponent, patternEntry] = componentPatternValue;
      const resolvedPatterns = this.resolveComponentPattern(currComponent, patternEntry, testerContext);
      return testResult.filter((test) =>
        resolvedPatterns.some(
          (resolvedPattern) =>
            minimatch(test.testFilePath, resolvedPattern) ||
            // on Windows, `test.testFilePath` has only single black slashes, while `resolvedPattern` has double black slashes.
            minimatch(normalize(test.testFilePath), normalize(resolvedPattern))
        )
      );
    });
  }

  private buildTestsObj(
    aggregatedResult: AggregatedResult,
    components: ComponentMap<JestTestResult[] | undefined>,
    testerContext: TesterContext,
    config?: any
  ): ComponentsResults[] {
    const testsSuiteResult = components.toArray().map(([component, testsFiles]) => {
      if (!testsFiles) return undefined;
      if (testsFiles?.length === 0) return undefined;
      const errors = this.getErrors(testsFiles);
      const tests = testsFiles.map((test) => {
        const testResults = test.testResults.map((testResult) => {
          const error =
            formatResultsErrors([testResult], config, {
              noStackTrace: true,
            }) || undefined;
          const isFailure = testResult.status === 'failed';
          return new TestResult(
            testResult.ancestorTitles,
            testResult.title,
            testResult.status as TestResult['status'],
            testResult.duration,
            isFailure ? undefined : error,
            isFailure ? error : undefined
          );
        });
        const filePath = basename(test.testFilePath);
        const getError = () => {
          if (!test.testExecError) return undefined;
          if (testerContext.watch) {
            // for some reason, during watch ('bit start'), if a file has an error, the `test.testExecError` is `{}`
            // (an empty object). the failureMessage contains the stringified error.
            // @todo: consider to always use the failureMessage, regardless the context.watch.
            return new JestError(test.failureMessage as string);
          }
          return new JestError(test.testExecError?.message, test.testExecError?.stack);
        };
        const error = getError();
        return new TestsFiles(
          filePath,
          testResults,
          test.numPassingTests,
          test.numFailingTests,
          test.numPendingTests,
          test.perfStats.runtime,
          test.perfStats.slow,
          error
        );
      });
      return {
        componentId: component.id,
        results: new TestsResult(tests, aggregatedResult.success, aggregatedResult.startTime),
        errors,
      };
    });

    return compact(testsSuiteResult);
  }

  private getErrors(testResult: JestTestResult[]): Error[] {
    return testResult.reduce((errors: Error[], test) => {
      if (test.testExecError) {
        const { message, stack, code, type } = test.testExecError;
        errors.push(new JestError(message, stack, code, type));
      } else if (test.failureMessage) {
        errors.push(new JestError(test.failureMessage));
      }
      return errors;
    }, []);
  }

  async onTestRunComplete(callback: CallbackFn) {
    this._callback = callback;
  }

  customizeJestConfig(jestConfig: any, context: TesterContext) {
    const snapshotResolverPath = context.release && !this.opts.useSourceFiles ?
      require.resolve('./config/custom-resolver/snapshotResolverBuild.js')
      : require.resolve('./config/custom-resolver/snapshotResolverLocal.js');
    const testIgnoreRegex = '^.*__snapshots__.*.spec.*';
    const testMatchPatterns = [...this.patternsToArray(context)];

    const config = Object.assign(jestConfig, {
      testMatch: testMatchPatterns,
      snapshotResolver: snapshotResolverPath,
      testPathIgnorePatterns: [...(jestConfig.testPathIgnorePatterns || []), testIgnoreRegex],
    });

    if (this.opts.useSourceFiles) {
      config.testPathIgnorePatterns.push('dist/*');
      config.resolver = require.resolve('./config/custom-resolver/resolver.js')
    }

    return config;
  }

  async test(context: TesterContext): Promise<Tests> {
    // const envRootDir = context.envRuntime.envAspectDefinition.aspectPath;

    const config: any = {
      // Setting the rootDir to the env root dir to make sure we can resolve all the jest presets/plugins
      // from the env context
      // rootDir: envRootDir,
      // TODO: set it to envRootDir and make sure we can make the --coverage to work
      // with the current value as context.rootPath it will probably won't work correctly when using rootComponents:true (maybe even won't work at all)
      // TODO: when changing to envRootDir we have some issues with the react-native tests. so once changed again, it needs to be validated.
      rootDir: context.rootPath,
      // Setting the roots (where to search for spec files) to the root path (either workspace or capsule root)
      // TODO: consider change this to be an array of the components running dir.
      // TODO: aka: in the workspace it will be something like <ws>/node_modules/<comp-package-name>/node_modules/<comp-package-name>
      // TODO: see dependencyResolver.getRuntimeModulePath (this will make sure the peer deps resolved correctly)
      // TODO: (@GiladShoham - when trying to set it to this paths, jest ignores it probably because the paths contains "node_modules"
      // TODO: trying to set the https://jestjs.io/docs/27.x/configuration#testpathignorepatterns-arraystring to something else (as it contain node_modules by default)
      // TODO: didn't help)
      roots: [context.rootPath],
    };

    // eslint-disable-next-line no-console
    console.warn = (message: string) => {
      this.logger.warn(message);
    };

    if (context.debug) {
      config.debug = true;
      // config.runInBand = true;
    }
    if (context.coverage) config.coverage = true;
    // config.runInBand = true;

    if (context.watch) {
      config.watchAll = true;
      config.noCache = true;
    }

    // TODO: remove the any type later (https://github.com/teambit/bit/pull/9025)
    if ((context as any).updateSnapshot) {
      config.updateSnapshot = true;
    }

    // eslint-disable-next-line global-require,import/no-dynamic-require
    const jestConfig = require(this.jestConfig);

    // TODO: rollback this for now, as it makes issues.
    // TODO: it's mostly relevant for when the root components feature is enabled.
    // TODO: we might want to enable it only on that case (along with setting the env root dir as the root dir, above)
    // const moduleNameMapper = await this.calculateModuleNameMapper(
    //   context.env,
    //   context.rootPath,
    //   context.additionalHostDependencies
    // );
    // jestConfig.moduleNameMapper = Object.assign({}, jestConfig.moduleNameMapper || {}, moduleNameMapper);

    const jestConfigCustomized = this.customizeJestConfig(jestConfig, context);

    const withEnv = Object.assign(jestConfigCustomized, config);

    const testsOutPut = await this.jestModule.runCLI(withEnv, [this.jestConfig]);
    const { testResults } = testsOutPut.results;
    const componentsWithTests = this.attachTestsToComponent(context, testResults);
    const componentTestResults = this.buildTestsObj(
      testsOutPut.results,
      componentsWithTests,
      context,
      jestConfigCustomized
    );
    return new Tests(componentTestResults);
  }

  async watch(context: TesterContext): Promise<Tests> {
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      const workerApi = this.jestWorker.initiate(
        context.ui ? { stdout: true, stderr: true, stdin: true } : { stdout: false, stderr: false, stdin: false }
      );

      // eslint-disable-next-line
      const jestConfig = require(this.jestConfig);

      const envRootDir = context.envRuntime.envAspectDefinition?.aspectPath;
      if (!envRootDir) {
        this.logger.warn(`jest tester, envRootDir is not defined, for env ${context.envRuntime.id}`);
      }

      const jestConfigCustomized = this.customizeJestConfig(jestConfig, context);

      try {
        const cbFn = proxy((results: any) => {
          if (!this._callback) return;
          const { testResults } = results;
          const componentsWithTests = this.attachTestsToComponent(context, testResults);
          const componentTestResults = this.buildTestsObj(results, componentsWithTests, context, jestConfigCustomized);
          const globalErrors = this.getErrors(testResults);
          const watchTestResults: any = {
            loading: false,
            errors: globalErrors,
            components: componentTestResults,
          };
          this._callback(watchTestResults);
          resolve(watchTestResults);
        });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await workerApi.onTestComplete(cbFn);

        await workerApi.watch(
          this.jestConfig,
          this.patternsToArray(context),
          context.rootPath,
          this.jestModulePath,
          envRootDir
        );
      } catch (err: any) {
        this.logger.error('jest.tester.watch() caught an error', err);
      }
    });
  }

  // private async calculateModuleNameMapper(
  //   env: Environment,
  //   rootPath: string,
  //   additionalHostDependencies?: string[]
  // ): Promise<Record<string, Array<string>>> {
  //   const peerDepsConfig: EnvPolicyConfigObject = await env.getDependencies();
  //   const peersAutoDetectPolicy = new PeersAutoDetectPolicy(peerDepsConfig.peers || []);
  //   const peers = Object.keys(peerDepsConfig.peerDependencies || {}).concat(peersAutoDetectPolicy?.names);
  //   const depsToMap = peers.concat(additionalHostDependencies || []);

  //   /**
  //    * Try to resolve the dependency from the rootDir (the env dir) or from the root path (workspace/capsule root)
  //    */
  //   const mappedValues = ['<rootDir>/node_modules/$1', `${rootPath}/node_modules/$1`];

  //   const moduleNameMapper = depsToMap.reduce((acc, peerName) => {
  //     const keyName = `^(${peerName})$`;
  //     acc[keyName] = mappedValues;
  //     const internalPathKeyName = `^(${peerName}/.*)$`;
  //     acc[internalPathKeyName] = mappedValues;
  //     return acc;
  //   }, {});

  //   return moduleNameMapper;
  // }

  private patternsToArray(context: TesterContext): string[] {
    // TODO: remove this ts-ignore once we have updated the TesterContext on bit
    // @ts-ignore
    const patterns = this.opts.useSourceFiles ? context.sourcePatterns : context.patterns;
    return flatten(
      patterns!
        .toArray()
        .map(([component, patternEntry]) => this.resolveComponentPattern(component, patternEntry, context))
    );
  }

  private resolveComponentPattern(
    component: Component,
    patternEntry: ComponentPatternsEntry,
    context: TesterContext
  ): string[] {
    if (this.opts.resolveSpecPaths) {
      return this.opts.resolveSpecPaths(component, context);
    }
    const customPatterns = this.opts.patterns;
    // If patterns were provided to the specific instance of the tester, use them
    if (customPatterns && !isEmpty(customPatterns)) {
      customPatterns.map((customPattern) => {
        const rootDirs = this.opts.roots || [patternEntry.componentDir];
        return this.resolvePattern(customPattern, rootDirs);
      });
    }
    const paths: string[] = [];
    patternEntry.paths.forEach((p) => {
      if (p.relative.startsWith('!')) {
        paths.push(`!${resolve(patternEntry.componentDir, p.relative.slice(1))}`);
      } else {
        if (p.relative.includes('!')) {
          this.logger.consoleWarning(
            `Negation patterns only work in jest if they start with "!", the glob "${p.relative}" will not work as expected`
          );
        }
        paths.push(p.path);
      }
    });
    return paths;
  }

  private resolvePattern(pattern: string, rootDirs: string[]) {
    return rootDirs.map((dir) => resolve(dir, pattern));
  }

  static create(
    options: JestOptions,
    { logger, worker }: { logger: Logger; worker: HarmonyWorker<JestWorker> }
  ): Tester {
    const id = options.name || DEFAULT_NAME;

    return new JestTester(id, options.config, options.jest, worker, logger, options);
  }

  static from(options: JestOptions): EnvHandler<Tester> {
    const id = options.name || DEFAULT_NAME;
    return (context: EnvContext) => {
      const logger = context.createLogger(id);
      const worker = context.createWorker<JestWorker>(id, jestWorkerPath);
      return JestTester.create(options, { logger, worker });
    };
  }
}
