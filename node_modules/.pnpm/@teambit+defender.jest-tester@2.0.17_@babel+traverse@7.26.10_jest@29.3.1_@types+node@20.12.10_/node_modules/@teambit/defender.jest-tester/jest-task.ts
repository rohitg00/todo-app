import type { DevFilesMain } from '@teambit/dev-files';
import type { Logger } from '@teambit/logger';
import type { HarmonyWorker } from '@teambit/worker';
import { TesterTask, TesterTaskOptions } from '@teambit/defender.tester-task';
import { TaskHandler } from '@teambit/builder';
import { JestTester } from './jest-tester';
import { JestOptions } from './jest-options';
import { JestWorker } from './jest.worker';

export type JestTaskOptions = JestOptions & Pick<TesterTaskOptions, 'description'>;

const DEFAULT_NAME = 'JestTest';
const DEFAULT_DESCRIPTION = 'testing components using Jest';

/**
 * a task for a jest task.
 */
export const JestTask = {
  from: (options: JestTaskOptions): TaskHandler => {
    const name = options.name || DEFAULT_NAME;
    const description = options.description || DEFAULT_DESCRIPTION;
    return TesterTask.from({
      ...options,
      name,
      description,
      tester: JestTester.from(options),
    });
  },

  create: (
    options: JestTaskOptions,
    {
      logger,
      worker,
      devFiles,
    }: { logger: Logger; worker: HarmonyWorker<JestWorker>, devFiles: DevFilesMain }
  ) => {
    const name = options.name || DEFAULT_NAME;
    const description = options.description || DEFAULT_DESCRIPTION;
    const tester = JestTester.create(options, { logger, worker });
    return TesterTask.create({...options, name, description}, {devFiles, tester});
  },
};
