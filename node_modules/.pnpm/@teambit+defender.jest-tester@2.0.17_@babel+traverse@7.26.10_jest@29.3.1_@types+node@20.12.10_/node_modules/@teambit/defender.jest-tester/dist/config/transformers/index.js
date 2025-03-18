"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esmPresets = exports.esmPlugins = exports.cjsPresets = exports.cjsPlugins = void 0;
__exportStar(require("./base-transformer-plugins"), exports);
__exportStar(require("./base-transformer-presets"), exports);
__exportStar(require("./base-transformer-process"), exports);
// export {process} from './file-transformer';
// export {} from './css-transformer';
var cjs_transformer_1 = require("./cjs-transformer");
Object.defineProperty(exports, "cjsPlugins", { enumerable: true, get: function () { return cjs_transformer_1.cjsPlugins; } });
Object.defineProperty(exports, "cjsPresets", { enumerable: true, get: function () { return cjs_transformer_1.cjsPresets; } });
var esm_transformer_1 = require("./esm-transformer");
Object.defineProperty(exports, "esmPlugins", { enumerable: true, get: function () { return esm_transformer_1.esmPlugins; } });
Object.defineProperty(exports, "esmPresets", { enumerable: true, get: function () { return esm_transformer_1.esmPresets; } });
//# sourceMappingURL=index.js.map