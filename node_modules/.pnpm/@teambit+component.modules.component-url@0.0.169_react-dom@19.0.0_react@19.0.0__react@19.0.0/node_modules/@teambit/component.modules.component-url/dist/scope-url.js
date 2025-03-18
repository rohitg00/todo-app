"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeUrl = void 0;
const constants_1 = require("./constants");
/** converts a scope id to a url */
exports.ScopeUrl = {
    toUrl,
    toPathname,
};
function toUrl(scope) {
    return `${constants_1.baseUrl}/${toPathname(scope)}`;
}
function toPathname(scope) {
    return scope.replace('.', '/');
}
//# sourceMappingURL=scope-url.js.map