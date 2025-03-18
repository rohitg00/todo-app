"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const children_highlighter_composition_1 = require("./children-highlighter.composition");
it('should not throw when rendering the children-highlighter', () => {
    const { getByText } = (0, react_2.render)(react_1.default.createElement(children_highlighter_composition_1.ChildrenHighlighterPreview, null));
    const rendered = getByText('target #1');
    expect(rendered).toBeInstanceOf(HTMLElement);
});
// .querySelectorAll() is not working as expected during the test, ignoring for now :(
// it('should render highlighter for all children components', async () => {
//   const { queryAllByText } = render(<Preview />);
//   // allow useEffect to run
//   await new Promise((res) => setTimeout(res, 200));
//   const rendered = queryAllByText('input/button');
//   expect(rendered).toHaveLength(2);
// });
//# sourceMappingURL=children-highlighter.spec.js.map