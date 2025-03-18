"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHoverSelection = exports.HoverSelector = void 0;
const react_1 = __importStar(require("react"));
function HoverSelector(_a) {
    var { onElementChange, disabled } = _a, rest = __rest(_a, ["onElementChange", "disabled"]);
    const handlers = useHoverSelection(onElementChange, rest);
    return react_1.default.createElement("div", Object.assign({}, rest, (disabled ? {} : handlers)));
}
exports.HoverSelector = HoverSelector;
/**
 * create handlers for hover selection. fires `onChange` with the target element when hovering in,
 * and fires again with `null` when hovering out.
 * @returns the event handlers to be applied on the element (onMouseOver, onMouseLeave, etc)
 */
function useHoverSelection(
/** handle element selection. set `undefined` to disable the hook */
onChange, 
/** existing props to extend. If props includes hover actions, they will be triggered when relevant */
props = {}) {
    const { onMouseOver, onMouseLeave } = props;
    const handleEnter = (0, react_1.useCallback)((event) => {
        onMouseOver === null || onMouseOver === void 0 ? void 0 : onMouseOver(event);
        const { target } = event;
        if (!target)
            return;
        onChange === null || onChange === void 0 ? void 0 : onChange(target);
    }, [onMouseOver, onChange]);
    const handleLeave = (0, react_1.useCallback)((event) => {
        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(event);
        onChange === null || onChange === void 0 ? void 0 : onChange(null);
    }, [onMouseLeave, onChange]);
    return onChange ? { onMouseOver: handleEnter, onMouseLeave: handleLeave } : {};
}
exports.useHoverSelection = useHoverSelection;
//# sourceMappingURL=hover-selector.js.map