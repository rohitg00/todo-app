export function getResolveSnapshotModule(testToSnapshotRelativePath?: string): {
    resolveSnapshotPath: (testPath: any, snapshotExtension: any) => string;
    resolveTestPath: (snapshotFilePath: any, snapshotExtension: any) => any;
    testPathForConsistencyCheck: string;
};
