"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cjsPlugins = exports.cjsPresets = void 0;
/* eslint-disable import/order */
/* eslint-disable global-require */
const base_transformer_process_1 = require("./base-transformer-process");
const base_transformer_plugins_1 = require("./base-transformer-plugins");
const base_transformer_presets_1 = require("./base-transformer-presets");
exports.cjsPresets = [
    ...base_transformer_presets_1.basePresets,
    [
        require('@babel/preset-env'),
        {
            targets: {
                node: 16,
            },
            // useBuiltIns: 'usage',
            // corejs: 3,
        },
    ],
];
exports.cjsPlugins = [
    [require('@babel/plugin-transform-modules-commonjs')],
    ...base_transformer_plugins_1.basePlugins,
];
exports.default = { process: (0, base_transformer_process_1.generateProcessFunc)(exports.cjsPresets, exports.cjsPlugins) };
//# sourceMappingURL=cjs-transformer.js.map