"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const test_utils_1 = require("react-dom/test-utils");
const react_2 = require("@testing-library/react");
const react_ui_highlighter_component_metadata_bit_component_meta_1 = require("@teambit/react.ui.highlighter.component-metadata.bit-component-meta");
const hover_highlighter_1 = require("./hover-highlighter");
const debounceTime = 2;
function ButtonComponent({ children }) {
    return react_1.default.createElement("button", null, children);
}
ButtonComponent[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField] = {
    // could use a non-bit-id to render the "default" bubble
    id: 'teambit.base-ui/input/button',
};
it('should show bubble when hovering on element with bit id', () => __awaiter(void 0, void 0, void 0, function* () {
    const { getByText, findByText } = (0, react_2.render)(react_1.default.createElement(hover_highlighter_1.HoverHighlighter, { debounceSelection: debounceTime },
        react_1.default.createElement(ButtonComponent, null, "hover here")));
    const rendered = getByText('hover here');
    expect(rendered).toBeTruthy();
    (0, test_utils_1.act)(() => {
        react_2.fireEvent.mouseOver(rendered);
    });
    const highlightBubble = yield findByText('input/button');
    expect(highlightBubble).toBeInstanceOf(HTMLElement);
}));
it('should hide the highlight when hovering out of the element', () => __awaiter(void 0, void 0, void 0, function* () {
    const { getByText, findByText, queryByText } = (0, react_2.render)(react_1.default.createElement(hover_highlighter_1.HoverHighlighter, { debounceSelection: debounceTime },
        react_1.default.createElement(ButtonComponent, null, "hover here")));
    const rendered = getByText('hover here');
    (0, test_utils_1.act)(() => {
        react_2.fireEvent.mouseOver(rendered);
    });
    const highlightBubble = yield findByText('input/button');
    expect(highlightBubble).toBeInstanceOf(HTMLElement);
    (0, test_utils_1.act)(() => {
        react_2.fireEvent.mouseOut(rendered);
    });
    yield (0, react_2.waitForElementToBeRemoved)(() => queryByText('input/button'));
}));
it('should keep the highlighter, when hovering on it (even when moving out of the component zone)', () => __awaiter(void 0, void 0, void 0, function* () {
    const { getByText, findByText } = (0, react_2.render)(react_1.default.createElement(hover_highlighter_1.HoverHighlighter, { debounceSelection: debounceTime },
        react_1.default.createElement(ButtonComponent, null, "hover here")));
    const rendered = getByText('hover here');
    (0, test_utils_1.act)(() => {
        // hover on target element:
        react_2.fireEvent.mouseOver(rendered);
    });
    const highlightBubble = yield findByText('input/button');
    yield (0, test_utils_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
        // move mouse out of target element, "towards" the highlighter bubble
        // this should trigger hiding
        react_2.fireEvent.mouseOut(rendered);
        // move mouse into the highlighter bubble
        react_2.fireEvent.mouseEnter(highlightBubble);
        // allow react to update state during the act()
        // and before verifying highlighter remains
        yield new Promise((resolve) => setTimeout(resolve, debounceTime + 10));
    }));
    // highlighter should still focus the target button
    expect(yield findByText('input/button')).toBeInstanceOf(HTMLElement);
}));
it('should hide the highlighter when moving the mouse away of it', () => __awaiter(void 0, void 0, void 0, function* () {
    const { getByText, queryByText, findByText } = (0, react_2.render)(react_1.default.createElement(hover_highlighter_1.HoverHighlighter, { debounceSelection: debounceTime },
        react_1.default.createElement(ButtonComponent, null, "hover here")));
    const rendered = getByText('hover here');
    // hover on target element:
    yield (0, test_utils_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
        react_2.fireEvent.mouseOver(rendered);
    }));
    const highlightBubble = yield findByText('input/button');
    yield (0, test_utils_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
        // hover on highlighter
        react_2.fireEvent.mouseEnter(highlightBubble);
        // leave the highlighter
        react_2.fireEvent.mouseOut(highlightBubble);
        yield new Promise((resolve) => setTimeout(resolve, debounceTime + 10));
    }));
    // highlighter sometimes disappears before this check,
    // so not using waitForElementToBeRemoved, and using setTimeout instead
    expect(queryByText('input/button')).toBeNull();
}));
//# sourceMappingURL=hover-highlighter.spec.js.map