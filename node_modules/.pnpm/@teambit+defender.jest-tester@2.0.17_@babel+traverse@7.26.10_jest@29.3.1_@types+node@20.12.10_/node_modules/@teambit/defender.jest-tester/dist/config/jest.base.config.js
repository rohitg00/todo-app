"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // "roots": [
    //   "<rootDir>/src"
    // ],
    // "collectCoverageFrom": [
    //   "src/**/*.{js,jsx,ts,tsx}",
    //   "!src/**/*.d.ts"
    // ],
    // "testMatch": [
    // "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    // "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    // ],
    transform: {
        '^.+\\.css$': require.resolve('./transformers/css-transform'),
        '^.+\\.svg$': require.resolve('./transformers/svg-transformer'),
        // '\\.(jpg|jpeg|png|gif)$': require.resolve('./transformers/img-transformer'),
        // '\\.(eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve('./transformers/file-transformer'),
        // '^(?!.*\\.(js|jsx|ts|tsx|css|svg|json)$)': require.resolve('./transformers/file-transformer'),
        // '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': require.resolve('./transformers/file-transformer'),
        // '^.+\\.svg$': require.resolve('./transformers/svg-transformer2'),
        // '^(?!.*\\.(svg|png|jpg|jpeg|gif|webp|woff|ttf|woff2)$)': require.resolve('./file-transformer'),
    },
    // We need to transform JSX and TSX files inside node_modules because Bit components are located there.
    // and now they are using the new jsx runtime.
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|ts|cjs)$',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    modulePaths: [],
    moduleNameMapper: {
        // '\\.(css|less|scss|sass)$': require.resolve('identity-obj-proxy'),
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve('./file-mock.js'),
        // "^.+\\.svg$": require.resolve('./transformers/svg-transformer.js'),
        '^.+\\.(css|sass|scss|less)$': require.resolve('identity-obj-proxy'),
        '^.+\\.module\\.(css|sass|scss|less)$': require.resolve('identity-obj-proxy'),
        // In jest 29 it seems like jest changed something in the way the resolve files from
        // package.json fields.
        // This leads to an errors when using uuid like:
        //
        //   ... node_modules\uuid\dist\esm-browser\index.js:1
        // ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){export { default as v1 } from './v1.js';
        //
        // or in case you tell jest to compile uuid via transformIgnorePatterns:
        //     crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
        //
        // for more details see -
        // https://stackoverflow.com/questions/73203367/jest-syntaxerror-unexpected-token-export-with-uuid-library
        // This shouldn't be an issue with uuid 9 but we are still using 8 in many places.
        uuid: require.resolve('uuid'),
        // "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    },
    moduleFileExtensions: [
        'web.js',
        'js',
        'web.ts',
        'ts',
        'web.tsx',
        'tsx',
        'json',
        'web.jsx',
        'jsx',
        'node',
    ],
    // snapshotResolver: assigned in jest-tester.ts as need different resolvers for local and build,
    // testTimeout: 30000, // @todo remove this once mocha-tester is ready and aspect-api testing are using it.
    // watchPlugins: [require.resolve('jest-watch-typeahead/filename'), require.resolve('jest-watch-typeahead/testname')],
};
//# sourceMappingURL=jest.base.config.js.map