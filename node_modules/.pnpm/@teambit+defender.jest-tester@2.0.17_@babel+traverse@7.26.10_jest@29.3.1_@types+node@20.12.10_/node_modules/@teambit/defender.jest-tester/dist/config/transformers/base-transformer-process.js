"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProcessFunc = void 0;
const core_1 = require("@babel/core");
const generateProcessFunc = (presets, plugins) => (src, filename) => {
    const result = (0, core_1.transform)(src, {
        sourceMap: 'inline',
        filename,
        presets,
        plugins,
        babelrc: false,
        configFile: false,
    });
    return result || { code: src };
};
exports.generateProcessFunc = generateProcessFunc;
//# sourceMappingURL=base-transformer-process.js.map