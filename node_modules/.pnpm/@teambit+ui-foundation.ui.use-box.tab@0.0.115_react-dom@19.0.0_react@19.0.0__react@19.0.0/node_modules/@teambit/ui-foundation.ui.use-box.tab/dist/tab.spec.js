"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const tab_compositions_1 = require("./tab.compositions");
describe('basic tab', () => {
    it('should render with the correct text', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(tab_compositions_1.TabWithText, null));
        const rendered = getByText('bit');
        expect(rendered).toBeTruthy();
    });
    it('should render without active class', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(tab_compositions_1.TabWithText, null));
        const rendered = getByText('bit');
        expect(rendered.classList).not.toContain('active');
    });
    it('should accept an element as a child', () => {
        const { getByAltText } = (0, react_2.render)(react_1.default.createElement(tab_compositions_1.TabWithChildElement, null));
        const rendered = getByAltText('bit-logo');
        expect(rendered).toBeTruthy();
    });
});
describe('active tab', () => {
    it('should render with the active class', () => {
        const { getByText } = (0, react_2.render)(react_1.default.createElement(tab_compositions_1.ActiveTab, null));
        const rendered = getByText('bit');
        expect(rendered.classList).toContain('active');
    });
});
//# sourceMappingURL=tab.spec.js.map