"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const dom_to_fiber_1 = require("./dom-to-fiber");
describe('domToFiber', () => {
    it('should find fiberNode for simple component', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(DivComponent, null));
        const target = getByText('hello');
        const fiberNode = (0, dom_to_fiber_1.domToFiber)(target);
        expect(fiberNode).not.toBeNull();
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.memoizedProps).toEqual({ children: 'hello' });
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.type).toEqual('div');
    });
    it('should find fiberNode when in fragment', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(FragmentComponent, null));
        const target = getByText('hello');
        const fiberNode = (0, dom_to_fiber_1.domToFiber)(target);
        expect(fiberNode).not.toBeNull();
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.memoizedProps).toEqual({ children: 'hello' });
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.type).toEqual('div');
    });
    it('should find fiberNode when in array', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(ArrayComponent, null));
        const target = getByText('hello');
        const fiberNode = (0, dom_to_fiber_1.domToFiber)(target);
        expect(fiberNode).not.toBeNull();
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.memoizedProps).toEqual({ children: 'hello' });
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.type).toEqual('div');
    });
    it('should find fiberNode with when nested', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(NestedComponent, null));
        const target = getByText('hello');
        const fiberNode = (0, dom_to_fiber_1.domToFiber)(target);
        expect(fiberNode).not.toBeNull();
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.memoizedProps).toEqual({ children: 'hello' });
        expect(fiberNode === null || fiberNode === void 0 ? void 0 : fiberNode.type).toEqual('div');
    });
    // // not working for text fragments. 🤷
    // it.skip('should find fiberNode for Fragment component', () => {
    //   const { getByText } = render(<>hello</>);
    //   const target = getByText('hello');
    //   const fiberNode = domToFiber(target);
    //   expect(fiberNode).not.toBeNull();
    //   expect(fiberNode?.memoizedProps).toEqual({ children: 'hello' });
    //   expect(fiberNode?.type).toEqual('div');
    // });
});
function DivComponent(props) {
    return react_1.default.createElement("div", Object.assign({}, props), "hello");
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
//# sourceMappingURL=dom-to-fiber.spec.js.map