"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcComponentLink = void 0;
const url_join_1 = __importDefault(require("url-join"));
const component_modules_component_url_1 = require("@teambit/component.modules.component-url");
function calcComponentLink(id, exported) {
    if (!id)
        return undefined;
    if (exported)
        return component_modules_component_url_1.ComponentUrl.toUrl(id);
    return (0, url_join_1.default)('/', id.fullName);
}
exports.calcComponentLink = calcComponentLink;
//# sourceMappingURL=links.js.map