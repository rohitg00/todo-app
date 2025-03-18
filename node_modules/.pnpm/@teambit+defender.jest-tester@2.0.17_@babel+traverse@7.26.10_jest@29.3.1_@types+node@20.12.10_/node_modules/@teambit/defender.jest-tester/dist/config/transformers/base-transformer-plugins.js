"use strict";
/* eslint-disable global-require */
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePlugins = void 0;
exports.basePlugins = [
    [require('babel-plugin-transform-typescript-metadata')],
    [require('@babel/plugin-proposal-decorators'), { legacy: true }],
    // [require('@babel/plugin-transform-runtime')],
    [require('@babel/plugin-transform-object-rest-spread')],
    [require('@babel/plugin-transform-class-properties')],
];
//# sourceMappingURL=base-transformer-plugins.js.map