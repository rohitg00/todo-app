"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const component_id_1 = require("@teambit/component-id");
const component_url_1 = require("./component-url");
const constants_1 = require("./constants");
describe('component url', () => {
    it('should convert to url', () => {
        const id = component_id_1.ComponentID.fromString('teambit.component/component-id@0.0.312');
        const result = component_url_1.ComponentUrl.toUrl(id);
        (0, chai_1.expect)(result).to.equal(`${constants_1.baseUrl}/teambit/component/component-id?version=0.0.312`);
    });
    it('should not require version', () => {
        const id = component_id_1.ComponentID.fromString('teambit.component/component-id');
        const result = component_url_1.ComponentUrl.toUrl(id);
        (0, chai_1.expect)(result).to.equal(`${constants_1.baseUrl}/teambit/component/component-id`);
    });
    it('should skip url when opt out in options', () => {
        const id = component_id_1.ComponentID.fromString('teambit.component/component-id@0.0.312');
        const result = component_url_1.ComponentUrl.toUrl(id, { includeVersion: false });
        (0, chai_1.expect)(result).to.equal(`${constants_1.baseUrl}/teambit/component/component-id`);
    });
});
//# sourceMappingURL=component-url.spec.js.map