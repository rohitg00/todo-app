// Credit - https://brunoscheufler.com/blog/2020-03-08-configuring-jest-snapshot-resolvers
const path = require('path');
const fs = require('fs');

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mts', '.cts', '.mjs', '.cjs'];

function replaceExtension(filePath, newExtension) {
    const { base, ext, dir } = path.parse(filePath);
    return path.join(dir, base.replace(ext, newExtension));
}

function findTestFile(inputPath) {
    let outputFilePath = inputPath;
    // eslint-disable-next-line no-restricted-syntax
    for (const ext of extensions) {
        const fileToCheck = replaceExtension(inputPath, ext);
        const exists = fs.existsSync(fileToCheck);
        if (exists) {
            outputFilePath = fileToCheck;
            break;
        }
    }
    return outputFilePath
}

export function getResolveSnapshotModule(testToSnapshotRelativePath = '') {

    // Resolve snapshot file path given test file path
    // and snapshot extension to be used (defaults to .snap)
    // turns dist/src/__test__/Post.spec.js into
    // src/__test__/__snapshot__/Post.spec.ts.snap
    function resolveSnapshotPath(testPath, snapshotExtension) {

        // Get source path of test file (assuming the build
        // output is stored in dist/ )
        const testSourcePath = (testPath.replace(testToSnapshotRelativePath, ''));
    
        // Get directory of test source file
        const testDirectory = path.dirname(testSourcePath);
    
        // Get file name of test source file and set snapshot extension as .js
        const testFilename = replaceExtension(path.basename(testSourcePath), '.js');

        const output = `${testDirectory}/__snapshots__/${testFilename}${snapshotExtension}`;

        // Construct file path for snapshot, saved next to original test source file
        return output;
    }

    // Resolve test file path given snapshot file path and extension
    // of snapshot files (defaults to .snap)
    // turns src/__test__/__snapshot__/Post.spec.js.snap into
    // dist/src/__test__/Post.spec.<ext>
    function resolveTestPath(snapshotFilePath, snapshotExtension) {
        // Transform snapshot file path
        const testSourceFileWithoutExtension = snapshotFilePath
            // Remove __snapshot__ directory
            .replace(/(\\|\/)__snapshots__/gi, '')
            // Remove snapshot extension so we end up with .js
            .replace(snapshotExtension, '')

        
        // find test source file, with correct extension (relevant for local bit test only - bit build will only have .js)
        const testSourceFile  = findTestFile(`${testToSnapshotRelativePath}${testSourceFileWithoutExtension}`);

        // Return test file path in dist directory
        return testSourceFile;
    }

    // This is an example test file path used by jest to guarantee internal consistency
    // Will be used to check if the functions above work properly
    const testPathForConsistencyCheck = `${testToSnapshotRelativePath}src/__test__/Post.spec.js`;

    return {
        resolveSnapshotPath,
        resolveTestPath, 
        testPathForConsistencyCheck
    };
}

