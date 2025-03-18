"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = {
    process: (_sourceText, sourcePath) => {
        return {
            code: `module.exports = ${JSON.stringify((0, path_1.basename)(sourcePath))};`,
        };
    }
};
//# sourceMappingURL=file-transformer.js.map