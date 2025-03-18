import type { DevFilesMain } from '@teambit/dev-files';
import type { Logger } from '@teambit/logger';
import type { HarmonyWorker } from '@teambit/worker';
import { TesterTask, TesterTaskOptions } from '@teambit/defender.tester-task';
import { TaskHandler } from '@teambit/builder';
import { JestOptions } from './jest-options';
import { JestWorker } from './jest.worker';
export type JestTaskOptions = JestOptions & Pick<TesterTaskOptions, 'description'>;
/**
 * a task for a jest task.
 */
export declare const JestTask: {
    from: (options: JestTaskOptions) => TaskHandler;
    create: (options: JestTaskOptions, { logger, worker, devFiles, }: {
        logger: Logger;
        worker: HarmonyWorker<JestWorker>;
        devFiles: DevFilesMain;
    }) => TesterTask;
};
