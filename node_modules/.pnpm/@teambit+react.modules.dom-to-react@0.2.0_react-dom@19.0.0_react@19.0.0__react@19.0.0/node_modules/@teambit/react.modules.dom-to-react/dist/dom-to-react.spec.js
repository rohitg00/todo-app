"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const dom_to_react_1 = require("./dom-to-react");
describe('domToReact', () => {
    it('should find simple React component', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(DivComponent, null));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReact)(target);
        expect(component).toEqual(DivComponent);
    });
    it('should find React component with fragment', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(FragmentComponent, null));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReact)(target);
        expect(component).toEqual(FragmentComponent);
    });
    it('should find react component with array', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(ArrayComponent, null));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReact)(target);
        expect(component).toEqual(ArrayComponent);
    });
    it('should find react component with nesting', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(NestedComponent, null));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReact)(target);
        expect(component).toEqual(NestedComponent);
    });
    // doesn't work for text-only components
    test.skip('should find React component with fragment', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(Container, null,
            react_1.default.createElement(BasicFragmentComponent, null)));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReact)(target);
        expect(component).toEqual(BasicFragmentComponent);
    });
    test('should return the outer component, when a component is a decoration of two components', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(DecoratedDiv, null));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReact)(target);
        expect(component).toEqual(DecoratedDiv);
    });
    test('should return the outer component, when a component is wrapper of another component', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(WrappedDiv, null));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReact)(target);
        expect(component).toEqual(WrappedDiv);
    });
});
describe('domToReacts', () => {
    it('should find simple React component', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(DivComponent, null));
        const target = getByText('hello');
        const components = (0, dom_to_react_1.domToReacts)(target);
        expect(components).toEqual([DivComponent]);
    });
    it('should find React component with fragment', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(FragmentComponent, null));
        const target = getByText('hello');
        const components = (0, dom_to_react_1.domToReacts)(target);
        expect(components).toEqual([FragmentComponent]);
    });
    it('should find react component with array', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(ArrayComponent, null));
        const target = getByText('hello');
        const components = (0, dom_to_react_1.domToReacts)(target);
        expect(components).toEqual([ArrayComponent]);
    });
    it('should find react component with nesting', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(NestedComponent, null));
        const target = getByText('hello');
        const components = (0, dom_to_react_1.domToReacts)(target);
        expect(components).toEqual([NestedComponent]);
    });
    // doesn't work for text-only components
    test.skip('should find React component with fragment', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(Container, null,
            react_1.default.createElement(BasicFragmentComponent, null)));
        const target = getByText('hello');
        const components = (0, dom_to_react_1.domToReacts)(target);
        expect(components).toEqual([BasicFragmentComponent]);
    });
    test('should both components, when two react components correspond to a single element', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(DecoratedDiv, null));
        const target = getByText('hello');
        const components = (0, dom_to_react_1.domToReacts)(target);
        expect(components).toEqual([DivComponent, DecoratedDiv]);
    });
    test('should return all 3 components, when a component is wrapper of another component', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(WrappedDiv, null));
        const target = getByText('hello');
        const component = (0, dom_to_react_1.domToReacts)(target);
        expect(component).toEqual([DivComponent, WrapperComponent, WrappedDiv]);
    });
});
describe('toRootElement', () => {
    it('should find root element of a simple component', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(DivComponent, { "data-test": "1" }));
        const target = getByText('hello');
        const element = (0, dom_to_react_1.toRootElement)(target);
        expect(element).toBeInstanceOf(HTMLElement);
        // @ts-ignore - TODO - fix conflict with Chai, jest, testing-framework and testing-library/jest-dom
        expect(element).toHaveAttribute('data-test', '1');
    });
    it('should find root element when in a fragment', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(FragmentComponent, { "data-test": "2" }));
        const target = getByText('hello');
        const element = (0, dom_to_react_1.toRootElement)(target);
        expect(element).toBeInstanceOf(HTMLElement);
        // @ts-ignore - TODO - fix conflict with Chai, jest, testing-framework and testing-library/jest-dom
        expect(element).toHaveAttribute('data-test', '2');
        expect(element === null || element === void 0 ? void 0 : element.textContent).toEqual('hello');
    });
    it('should find root element when in array', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(ArrayComponent, { "data-test": "3" }));
        const target = getByText('hello');
        const element = (0, dom_to_react_1.toRootElement)(target);
        expect(element).toBeInstanceOf(HTMLElement);
        // @ts-ignore - TODO - fix conflict with Chai, jest, testing-framework and testing-library/jest-dom
        expect(element).toHaveAttribute('data-test', '3');
    });
    it('should find fiberNode with when nested', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(NestedComponent, { "data-test": "4" }));
        const target = getByText('hello');
        const element = (0, dom_to_react_1.toRootElement)(target);
        expect(element).toBeInstanceOf(HTMLElement);
        // @ts-ignore - TODO - fix conflict with Chai, jest, testing-framework and testing-library/jest-dom
        expect(element).toHaveAttribute('data-test', '4');
    });
});
function DivComponent(props) {
    return react_1.default.createElement("div", Object.assign({}, props), "hello");
}
function Container(props) {
    return react_1.default.createElement("div", Object.assign({}, props));
}
function BasicFragmentComponent() {
    return react_1.default.createElement(react_1.default.Fragment, null, "hello");
}
function WrapperComponent({ children }) {
    return children;
}
function DecoratedDiv(props) {
    return react_1.default.createElement(DivComponent, Object.assign({}, props));
}
function WrappedDiv(props) {
    return (react_1.default.createElement(WrapperComponent, null,
        react_1.default.createElement(DivComponent, Object.assign({}, props))));
}
function FragmentComponent(props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", Object.assign({}, props), "hello"),
        react_1.default.createElement("div", Object.assign({}, props), "world")));
}
function NestedComponent(props) {
    return (react_1.default.createElement("div", Object.assign({}, props),
        "container",
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null, "pre-sibling"),
            "contained",
            react_1.default.createElement("div", null, "hello"),
            react_1.default.createElement("div", null, "sibling"))));
}
function ArrayComponent(props) {
    const arr = ['hello', 'world'];
    return (react_1.default.createElement("div", Object.assign({}, props), arr.map((x) => (react_1.default.createElement("div", { key: x }, x)))));
}
//# sourceMappingURL=dom-to-react.spec.js.map