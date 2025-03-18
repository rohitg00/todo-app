"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentRuleMatcher = exports.ruleMatcher = void 0;
// in the future, we will add more options here, like include / exclude objects.
const component_id_1 = require("@teambit/component-id");
function ruleMatcher(element, rule) {
    if (typeof rule === 'string') {
        return element.matches(rule);
    }
    if (typeof rule === 'function') {
        return rule(element);
    }
    return true;
}
exports.ruleMatcher = ruleMatcher;
function componentRuleMatcher(target, rule) {
    if (typeof rule === 'string') {
        const targetCmpId = component_id_1.ComponentID.tryFromString(target.meta.id);
        const ruleCmpId = component_id_1.ComponentID.tryFromString(rule);
        return component_id_1.ComponentID.isEqual(ruleCmpId, targetCmpId, { ignoreVersion: true });
    }
    if (Array.isArray(rule)) {
        const targetCmpId = component_id_1.ComponentID.tryFromString(target.meta.id);
        const ruleCmpIds = rule.map((x) => component_id_1.ComponentID.tryFromString(x));
        return ruleCmpIds.some((cmdId) => component_id_1.ComponentID.isEqual(targetCmpId, cmdId, { ignoreVersion: true }));
    }
    if (typeof rule === 'function') {
        return rule(target);
    }
    return true;
}
exports.componentRuleMatcher = componentRuleMatcher;
//# sourceMappingURL=rule-matcher.js.map