"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const scope_url_1 = require("./scope-url");
const constants_1 = require("./constants");
describe('scope url', () => {
    it('should convert to url', () => {
        const id = 'teambit.base-ui';
        const result = scope_url_1.ScopeUrl.toUrl(id);
        (0, chai_1.expect)(result).to.equal(`${constants_1.baseUrl}/teambit/base-ui`);
    });
    it('should convert to url', () => {
        const id = 'ioncannon';
        const result = scope_url_1.ScopeUrl.toUrl(id);
        (0, chai_1.expect)(result).to.equal(`${constants_1.baseUrl}/ioncannon`);
    });
});
describe('scope url', () => {
    it('should convert to toPathname', () => {
        const id = 'teambit.base-ui';
        const result = scope_url_1.ScopeUrl.toPathname(id);
        (0, chai_1.expect)(result).to.equal(`teambit/base-ui`);
    });
    it('should convert to url', () => {
        const id = 'ioncannon';
        const result = scope_url_1.ScopeUrl.toPathname(id);
        (0, chai_1.expect)(result).to.equal(`ioncannon`);
    });
});
//# sourceMappingURL=scope-url.spec.js.map