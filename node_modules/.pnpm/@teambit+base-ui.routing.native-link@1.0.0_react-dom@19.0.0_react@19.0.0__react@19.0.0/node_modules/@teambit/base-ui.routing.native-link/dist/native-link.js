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
exports.NativeLink = void 0;
const react_1 = __importStar(require("react"));
/** anchor tag attributes that securely open link in a new tab. */
const externalLinkAttributes = { rel: 'noopener', target: '_blank' };
/**
 * Equivalent to an `<a/>` tag, with a few additional options.
 * Used to provide default fallbacks for react-router link
 */
function NativeLink(_a) {
    var { href = '', external, replace, onClick } = _a, rest = __rest(_a, ["href", "external", "replace", "onClick"]);
    const externalProps = external ? externalLinkAttributes : {};
    const handleClick = react_1.useCallback((e) => {
        const res = onClick === null || onClick === void 0 ? void 0 : onClick(e);
        if (e.defaultPrevented || !replace || external)
            return res;
        e.preventDefault();
        window.location.replace(href);
        return res;
    }, [href, replace, onClick]);
    // @ts-ignore TOOD: @Uri please check this
    return react_1.default.createElement("a", Object.assign({}, rest, externalProps, { onClick: handleClick, href: href }));
}
exports.NativeLink = NativeLink;
//# sourceMappingURL=native-link.js.map