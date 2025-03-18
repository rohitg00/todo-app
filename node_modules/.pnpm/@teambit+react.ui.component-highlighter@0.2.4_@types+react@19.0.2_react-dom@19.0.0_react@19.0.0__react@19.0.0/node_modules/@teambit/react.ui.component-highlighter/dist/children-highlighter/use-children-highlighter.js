"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChildrenHighlighter = void 0;
const react_1 = require("react");
const get_xpath_1 = __importDefault(require("get-xpath"));
const react_modules_dom_to_react_1 = require("@teambit/react.modules.dom-to-react");
const react_ui_highlighter_component_metadata_bit_component_meta_1 = require("@teambit/react.ui.highlighter.component-metadata.bit-component-meta");
const ignore_highlighter_1 = require("../ignore-highlighter");
const rule_matcher_1 = require("../rule-matcher");
function useChildrenHighlighter({ onChange, disabled, scopeRef, scopeClass: scopeSelector = '', rule, componentRule, }) {
    (0, react_1.useEffect)(() => {
        const nextTargets = {};
        const scopeElement = scopeRef.current;
        if (!scopeElement || disabled)
            return;
        // select all elements (except excluded)
        let allElements = Array.from(scopeElement.querySelectorAll(targetsSelector(`.${scopeSelector}`)));
        // apply rule filtering
        if (rule)
            allElements = allElements.filter((elem) => (0, rule_matcher_1.ruleMatcher)(elem, rule));
        // seek the root element:
        const rootElements = allElements.map(react_modules_dom_to_react_1.toRootElement).filter((x) => !!x);
        // deduplicate
        const uniqueRoots = new Set(rootElements);
        uniqueRoots.forEach((element) => {
            if (!element)
                return;
            const comps = (0, react_modules_dom_to_react_1.domToReacts)(element);
            const componentsWithMeta = comps.filter((x) => (0, react_ui_highlighter_component_metadata_bit_component_meta_1.hasComponentMeta)(x) && (0, rule_matcher_1.componentRuleMatcher)({ meta: x[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField] }, componentRule));
            if (componentsWithMeta.length < 1)
                return;
            const key = (0, get_xpath_1.default)(element);
            nextTargets[key] = { element, components: componentsWithMeta };
        });
        onChange(nextTargets);
    }, [disabled, scopeSelector]);
}
exports.useChildrenHighlighter = useChildrenHighlighter;
function targetsSelector(
/**
 * the scope in which to consider the exclude selector.
 * The `:scope` modifier is appropriate, but is not supported in older browsers.
 */
scopeSelector = ':scope') {
    const excludedSelector = `${scopeSelector} ${ignore_highlighter_1.excludeHighlighterSelector}, ${scopeSelector} ${ignore_highlighter_1.excludeHighlighterSelector} *`;
    const skippedSelector = `${scopeSelector} ${ignore_highlighter_1.skipHighlighterSelector}, ${scopeSelector} ${ignore_highlighter_1.skipHighlighterSelector} *`;
    return `:not(${excludedSelector}, ${skippedSelector})`;
}
//# sourceMappingURL=use-children-highlighter.js.map