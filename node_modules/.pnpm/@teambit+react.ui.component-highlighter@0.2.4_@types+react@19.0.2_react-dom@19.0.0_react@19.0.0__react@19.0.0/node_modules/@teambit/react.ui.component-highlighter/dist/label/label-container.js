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
exports.LabelContainer = void 0;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const lodash_compact_1 = __importDefault(require("lodash.compact"));
const react_dom_1 = require("@floating-ui/react-dom");
const label_module_scss_1 = __importDefault(require("./label.module.scss"));
const HAS_RESIZE_OBSERVER = typeof window !== 'undefined' && !!window.ResizeObserver;
function LabelContainer(_a) {
    var _b;
    var { targetRef, offset, placement, flip = true, watchMotion, className, style } = _a, rest = __rest(_a, ["targetRef", "offset", "placement", "flip", "watchMotion", "className", "style"]);
    const { x, y, strategy, floating, reference, refs, update, middlewareData } = (0, react_dom_1.useFloating)({
        placement,
        middleware: (0, lodash_compact_1.default)([
            offset && (0, react_dom_1.offset)({ mainAxis: offset[0], crossAxis: offset[1] }),
            flip && (0, react_dom_1.flip)(),
            // enabling 'shift' for 'crossAxis' will make floating-ui push the label _inside_, when it has nowhere to go
            (0, react_dom_1.shift)({ rootBoundary: 'document', mainAxis: true, crossAxis: true }),
            (0, react_dom_1.hide)({ strategy: 'referenceHidden' }),
        ]),
    });
    (0, react_1.useLayoutEffect)(() => {
        reference(targetRef.current);
    }, [targetRef.current, reference]);
    // automatically update on scroll, resize, etc.
    // `watchMotion` will trigger continuous updates using animation frame
    (0, react_1.useEffect)(() => {
        if (!refs.reference.current || !refs.floating.current || !HAS_RESIZE_OBSERVER)
            return () => { };
        return (0, react_dom_1.autoUpdate)(refs.reference.current, refs.floating.current, update, { animationFrame: !!watchMotion });
    }, [refs.reference.current, refs.floating.current, update, watchMotion]);
    const isReady = !((_b = middlewareData.hide) === null || _b === void 0 ? void 0 : _b.referenceHidden);
    return (react_1.default.createElement("div", Object.assign({}, rest, { ref: floating, className: (0, classnames_1.default)(className, !isReady && label_module_scss_1.default.hidden), 
        // starting at pos [0,0] will ensure the label doesn't increase the document size.
        style: Object.assign(Object.assign({}, style), { position: strategy, top: y !== null && y !== void 0 ? y : 0, left: x !== null && x !== void 0 ? x : 0 }) })));
}
exports.LabelContainer = LabelContainer;
//# sourceMappingURL=label-container.js.map