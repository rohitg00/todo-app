"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.affix = void 0;
/**
 * Optionally append prefix/postfix to a string.
 * @returns affixed string, or undefined if target is empty or undefined
 */
function affix(prefix = '', str, suffix = '') {
    if (!str)
        return '';
    return `${prefix}${str}${suffix}`;
}
exports.affix = affix;
//# sourceMappingURL=affix.js.map