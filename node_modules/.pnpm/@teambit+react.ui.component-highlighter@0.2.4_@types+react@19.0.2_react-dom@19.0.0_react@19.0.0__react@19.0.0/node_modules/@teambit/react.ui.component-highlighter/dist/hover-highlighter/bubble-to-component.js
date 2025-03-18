"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleToComponent = void 0;
const react_modules_dom_to_react_1 = require("@teambit/react.modules.dom-to-react");
const react_ui_highlighter_component_metadata_bit_component_meta_1 = require("@teambit/react.ui.highlighter.component-metadata.bit-component-meta");
const rule_matcher_1 = require("../rule-matcher");
/** go up the dom tree until reaching a react bit component */
function bubbleToComponent(element, { elementRule, componentRule, propagateSameParents = true } = {}) {
    let current = bubbleToFirstComponent(element, elementRule, componentRule);
    if (!propagateSameParents)
        return current;
    while (current) {
        const parentElement = current.element.parentElement;
        const parent = bubbleToFirstComponent(parentElement, elementRule, componentRule);
        const primeComponent = current === null || current === void 0 ? void 0 : current.components.slice(-1).pop();
        const parentPrimeComponent = parent === null || parent === void 0 ? void 0 : parent.components.slice(-1).pop();
        if ((primeComponent === null || primeComponent === void 0 ? void 0 : primeComponent[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField].id) !== (parentPrimeComponent === null || parentPrimeComponent === void 0 ? void 0 : parentPrimeComponent[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField].id))
            return current;
        current = parent;
    }
    return undefined;
}
exports.bubbleToComponent = bubbleToComponent;
/** go up the dom tree until reaching a react bit component */
function bubbleToFirstComponent(element, elementRule, componentRule) {
    for (let current = element; current; current = current.parentElement) {
        current = (0, react_modules_dom_to_react_1.toRootElement)(current);
        if (!current)
            return undefined;
        if ((0, rule_matcher_1.ruleMatcher)(current, elementRule)) {
            const components = (0, react_modules_dom_to_react_1.domToReacts)(current);
            const relevantComponents = components.filter((x) => (0, react_ui_highlighter_component_metadata_bit_component_meta_1.hasComponentMeta)(x) && (0, rule_matcher_1.componentRuleMatcher)({ meta: x[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField] }, componentRule));
            if (relevantComponents.length < 1)
                return undefined;
            return {
                element: current,
                components: relevantComponents,
            };
        }
    }
    return undefined;
}
//# sourceMappingURL=bubble-to-component.js.map