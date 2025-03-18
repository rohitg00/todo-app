"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const native_link_1 = require("./native-link");
describe('native html link', () => {
    it('should render', () => {
        const { getByText } = react_2.render(react_1.default.createElement(native_link_1.NativeLink, null, "link"));
        const rendered = getByText('link');
        expect(rendered).toBeInstanceOf(HTMLElement);
    });
    it('should link to target', () => {
        const { getByText } = react_2.render(react_1.default.createElement(native_link_1.NativeLink, { href: "http://target" }, "link"));
        const rendered = getByText('link');
        expect(rendered.tagName).toEqual('A');
        expect(rendered).toHaveProperty('href', 'http://target/');
    });
    it('should open in new tab/window, when external=true', () => {
        const { getByText } = react_2.render(react_1.default.createElement(native_link_1.NativeLink, { external: true }, "link"));
        const rendered = getByText('link');
        expect(rendered).toHaveProperty('target', '_blank');
        // security - rel='noopener' prevents the opened page to gain any kind of access to the original page.
        expect(rendered).toHaveProperty('rel', 'noopener');
    });
    it('should replace url without changing history, when replace=true', () => {
        const { getByText } = react_2.render(react_1.default.createElement(native_link_1.NativeLink, { href: "#target", replace: true }, "link"));
        const rendered = getByText('link');
        // '(sanity) initial history length'
        expect(window.history.length).toEqual(1);
        react_2.fireEvent.click(rendered);
        // if this fails, add `await waitFor(() => window.location.hash == '#hash')`
        expect(window.location.hash).toEqual('#target');
        // 'history length after navigation'
        expect(window.history.length).toEqual(1);
    });
});
//# sourceMappingURL=native-link.spec.js.map