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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.HybridHighlighter = void 0;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const uuid_1 = require("uuid");
const hover_highlighter_1 = require("../hover-highlighter");
const element_highlighter_1 = require("../element-highlighter");
const children_highlighter_1 = require("../children-highlighter");
/** automatically highlight components on hover */
function HybridHighlighter(_a) {
    var { disabled, mode = 'hover', debounceSelection = 80, watchMotion = true, placement, rule, componentRule, classes, highlightStyle, className, style, bgColor, bgColorHover, bgColorActive, children } = _a, rest = __rest(_a, ["disabled", "mode", "debounceSelection", "watchMotion", "placement", "rule", "componentRule", "classes", "highlightStyle", "className", "style", "bgColor", "bgColorHover", "bgColorActive", "children"]);
    const ref = (0, react_1.createRef)();
    const [targets, setTarget] = (0, react_1.useState)({});
    const scopeClass = (0, react_1.useRef)(`hl-scope-${(0, uuid_1.v4)()}`).current;
    const hasTargets = Object.entries(targets).length > 0;
    // clear targets when disabled
    (0, react_1.useEffect)(() => {
        if (disabled)
            setTarget({});
    }, [disabled]);
    const handlers = (0, hover_highlighter_1.useHoverHighlighter)((nextTarget) => setTarget(nextTarget ? { 'hover-target': nextTarget } : {}), rest, {
        debounceDuration: hasTargets ? debounceSelection : 0,
        scopeClass,
        disabled: disabled || mode !== 'hover',
        rule,
        componentRule,
    });
    (0, children_highlighter_1.useChildrenHighlighter)({
        onChange: setTarget,
        scopeRef: ref,
        scopeClass,
        disabled: disabled || mode !== 'allChildren',
        rule,
        componentRule,
    });
    const _styles = (0, react_1.useMemo)(() => (Object.assign({ '--bit-highlighter-color': bgColor, '--bit-highlighter-color-hover': bgColorHover, '--bit-highlighter-color-active': bgColorActive }, style)), [bgColor, bgColorHover, bgColorActive, style]);
    return (react_1.default.createElement("div", Object.assign({ ref: ref }, rest, handlers, { style: _styles, className: (0, classnames_1.default)(className, scopeClass), "data-nullify-component-highlight": true }),
        children,
        Object.entries(targets).map(([key, target]) => (react_1.default.createElement(element_highlighter_1.ElementHighlighter, { key: key, targetRef: { current: target.element }, components: target.components, classes: classes, style: highlightStyle, placement: placement, watchMotion: watchMotion })))));
}
exports.HybridHighlighter = HybridHighlighter;
//# sourceMappingURL=hybrid-highlighter.js.map