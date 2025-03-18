"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceHistory = exports.openInNewTab = exports.simpleLink = void 0;
const react_1 = __importDefault(require("react"));
const native_link_1 = require("./native-link");
const simpleLink = () => {
    return react_1.default.createElement(native_link_1.NativeLink, { href: "https://bit.dev" }, "Link");
};
exports.simpleLink = simpleLink;
const openInNewTab = () => {
    return (react_1.default.createElement(native_link_1.NativeLink, { href: "https://bit.dev", external: true }, "External link"));
};
exports.openInNewTab = openInNewTab;
const replaceHistory = () => {
    return (react_1.default.createElement(native_link_1.NativeLink, { href: "#routing/native-link?preview=compositions", replace: true }, "go to composition"));
};
exports.replaceHistory = replaceHistory;
//# sourceMappingURL=native-link.composition.js.map