"use strict";
/* eslint-disable global-require */
/* eslint-disable import/order */
Object.defineProperty(exports, "__esModule", { value: true });
exports.esmPlugins = exports.esmPresets = void 0;
const base_transformer_plugins_1 = require("./base-transformer-plugins");
const base_transformer_presets_1 = require("./base-transformer-presets");
const base_transformer_process_1 = require("./base-transformer-process");
exports.esmPresets = [
    ...base_transformer_presets_1.basePresets,
    [
        require('@babel/preset-env'),
        {
            modules: false,
            targets: {
                node: 16,
            },
            // useBuiltIns: 'usage',
            // corejs: 3,
        },
    ],
];
exports.esmPlugins = base_transformer_plugins_1.basePlugins;
exports.default = { process: (0, base_transformer_process_1.generateProcessFunc)(exports.esmPresets, exports.esmPlugins) };
//# sourceMappingURL=esm-transformer.js.map