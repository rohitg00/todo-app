"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHoverHighlighter = void 0;
const react_1 = require("react");
const use_debounce_1 = require("use-debounce");
const react_ui_hover_selector_1 = require("@teambit/react.ui.hover-selector");
const ignore_highlighter_1 = require("../ignore-highlighter");
const bubble_to_component_1 = require("./bubble-to-component");
/** fires onChange when targeting a new component */
function useHoverHighlighter(onChange, props = {}, { debounceDuration, scopeClass, disabled, rule, componentRule }) {
    const { handleElement } = useHoverHandler({ onChange, scopeClass, debounceDuration, disabled, rule, componentRule });
    const handlers = (0, react_ui_hover_selector_1.useHoverSelection)(disabled ? undefined : handleElement, props);
    return handlers;
}
exports.useHoverHighlighter = useHoverHighlighter;
function useHoverHandler({ onChange, scopeClass = '', debounceDuration, disabled, rule, componentRule, }) {
    // debounced method is ref'ed, so no need for useCallback
    const _handleElement = (element) => {
        // clear highlighter at the edges:
        if (!element || element.hasAttribute('data-nullify-component-highlight')) {
            onChange(undefined);
            return;
        }
        // clear when ancestor has 'data-ignore-component-highlight'
        if (element.closest(`.${scopeClass} ${ignore_highlighter_1.excludeHighlighterSelector}`)) {
            onChange(undefined);
            return;
        }
        // skip DOM trees having 'data-skip-component-highlight'
        if (element.closest(`.${scopeClass} ${ignore_highlighter_1.skipHighlighterSelector}`))
            return;
        const result = (0, bubble_to_component_1.bubbleToComponent)(element, { elementRule: rule, componentRule });
        if (!result)
            return;
        onChange({
            element: result.element,
            components: result.components,
        });
    };
    const handleElement = (0, use_debounce_1.useDebouncedCallback)(_handleElement, debounceDuration);
    // clear when disabling
    (0, react_1.useEffect)(() => {
        if (disabled)
            handleElement.cancel();
    }, [disabled, handleElement]);
    return { handleElement };
}
//# sourceMappingURL=use-hover-highlighter.js.map