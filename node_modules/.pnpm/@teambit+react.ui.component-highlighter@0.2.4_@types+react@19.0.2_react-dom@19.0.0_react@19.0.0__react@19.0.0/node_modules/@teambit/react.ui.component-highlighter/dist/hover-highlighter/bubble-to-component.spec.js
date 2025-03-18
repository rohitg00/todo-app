"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const mock_component_1 = require("../mock-component");
const bubble_to_component_1 = require("./bubble-to-component");
it('should find component when starting from a div', () => {
    const { getByText, getByTestId } = (0, react_2.render)(react_1.default.createElement(mock_component_1.MockTarget, { "data-testid": "expected-result" },
        react_1.default.createElement("div", null, "hello world")));
    const rendered = getByText('hello world');
    const result = (0, bubble_to_component_1.bubbleToComponent)(rendered);
    expect(result === null || result === void 0 ? void 0 : result.element).toBe(getByTestId('expected-result'));
    expect(result === null || result === void 0 ? void 0 : result.components).toEqual([mock_component_1.MockTarget]);
});
it('should bubble to root component when it renders itself recursively', () => {
    const { getByText, getByTestId } = (0, react_2.render)(react_1.default.createElement(mock_component_1.MockTarget, { "data-testid": "expected-result" },
        react_1.default.createElement(mock_component_1.MockTarget, null,
            react_1.default.createElement(mock_component_1.MockTarget, null,
                react_1.default.createElement("div", null, "hello world")))));
    const rendered = getByText('hello world');
    const result = (0, bubble_to_component_1.bubbleToComponent)(rendered);
    expect(result === null || result === void 0 ? void 0 : result.element).toBe(getByTestId('expected-result'));
    expect(result === null || result === void 0 ? void 0 : result.components).toEqual([mock_component_1.MockTarget]);
});
it('should find first component, when parent propagation is disabled', () => {
    const { getByText, getByTestId } = (0, react_2.render)(react_1.default.createElement(mock_component_1.MockTarget, null,
        react_1.default.createElement(mock_component_1.MockTarget, null,
            react_1.default.createElement(mock_component_1.MockTarget, { "data-testid": "expected-result" },
                react_1.default.createElement("div", null, "hello world")))));
    const rendered = getByText('hello world');
    const result = (0, bubble_to_component_1.bubbleToComponent)(rendered, { propagateSameParents: false });
    expect(result === null || result === void 0 ? void 0 : result.element).toBe(getByTestId('expected-result'));
    expect(result === null || result === void 0 ? void 0 : result.components).toEqual([mock_component_1.MockTarget]);
});
//# sourceMappingURL=bubble-to-component.spec.js.map