"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipHighlighterSelector = exports.skipHighlighterAttr = exports.skipHighlighterAttrName = exports.ExcludeHighlighter = exports.excludeHighlighterAtt = exports.excludeHighlighterSelector = exports.excludeHighlighterAttrName = void 0;
const react_1 = __importDefault(require("react"));
/** name of ignore attribute */
exports.excludeHighlighterAttrName = 'data-ignore-component-highlight';
/** selector for elements with the ignore attribute */
exports.excludeHighlighterSelector = `[${exports.excludeHighlighterAttrName}]`;
/** highlighter will exclude elements with this attribute */
exports.excludeHighlighterAtt = { [exports.excludeHighlighterAttrName]: true };
/** children of this element will be excluded by the automatic highlighter */
function ExcludeHighlighter(props) {
    return react_1.default.createElement("div", Object.assign({}, props, exports.excludeHighlighterAtt));
}
exports.ExcludeHighlighter = ExcludeHighlighter;
/** name of skip attribute */
exports.skipHighlighterAttrName = 'data-skip-component-highlight';
/** highlighter will skip (ignore) elements with these attributes */
exports.skipHighlighterAttr = { [exports.skipHighlighterAttrName]: true };
/** selector for elements with the skip attribute */
exports.skipHighlighterSelector = `[${exports.skipHighlighterAttrName}]`;
//# sourceMappingURL=ignore-highlighter.js.map