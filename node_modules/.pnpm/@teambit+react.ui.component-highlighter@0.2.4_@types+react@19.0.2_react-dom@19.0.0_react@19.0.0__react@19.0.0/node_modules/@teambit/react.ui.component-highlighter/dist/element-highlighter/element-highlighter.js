"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementHighlighter = void 0;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const frame_1 = require("../frame");
const label_1 = require("../label");
const ignore_highlighter_1 = require("../ignore-highlighter");
const element_highlighter_module_scss_1 = __importDefault(require("./element-highlighter.module.scss"));
function ElementHighlighter(_a) {
    var { targetRef, components, placement = 'top', watchMotion, className, classes } = _a, props = __rest(_a, ["targetRef", "components", "placement", "watchMotion", "className", "classes"]);
    return (react_1.default.createElement("div", Object.assign({}, props, ignore_highlighter_1.skipHighlighterAttr, { className: (0, classnames_1.default)(classes === null || classes === void 0 ? void 0 : classes.container, element_highlighter_module_scss_1.default.container, className) }),
        react_1.default.createElement(frame_1.Frame, { targetRef: targetRef, className: (0, classnames_1.default)(element_highlighter_module_scss_1.default.frame, classes === null || classes === void 0 ? void 0 : classes.frame), watchMotion: watchMotion }),
        components && (react_1.default.createElement(label_1.LabelContainer, { targetRef: targetRef, className: element_highlighter_module_scss_1.default.label, placement: placement, watchMotion: watchMotion },
            react_1.default.createElement(label_1.Label, { components: components, className: classes === null || classes === void 0 ? void 0 : classes.label })))));
}
exports.ElementHighlighter = ElementHighlighter;
//# sourceMappingURL=element-highlighter.js.map