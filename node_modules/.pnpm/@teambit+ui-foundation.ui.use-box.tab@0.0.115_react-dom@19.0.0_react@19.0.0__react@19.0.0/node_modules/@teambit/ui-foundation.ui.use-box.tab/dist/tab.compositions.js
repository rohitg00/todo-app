"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveTab = exports.TabWithChildElement = exports.TabWithText = void 0;
const react_1 = __importDefault(require("react"));
const tab_1 = require("./tab");
const TabWithText = () => {
    return react_1.default.createElement(tab_1.Tab, null, "bit");
};
exports.TabWithText = TabWithText;
const TabWithChildElement = () => {
    return (react_1.default.createElement(tab_1.Tab, null,
        react_1.default.createElement("img", { alt: "bit-logo", src: "https://static.bit.dev/bit-logo.svg" })));
};
exports.TabWithChildElement = TabWithChildElement;
const ActiveTab = () => {
    return react_1.default.createElement(tab_1.Tab, { isActive: true }, "bit");
};
exports.ActiveTab = ActiveTab;
//# sourceMappingURL=tab.compositions.js.map