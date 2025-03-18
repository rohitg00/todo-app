"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preview = void 0;
const react_1 = __importStar(require("react"));
const hover_selector_1 = require("./hover-selector");
function Preview() {
    const [current, setCurrent] = (0, react_1.useState)(null);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(hover_selector_1.HoverSelector, { onElementChange: setCurrent },
            react_1.default.createElement("div", null, "hover me!"),
            react_1.default.createElement("span", null, "hover me!")),
        react_1.default.createElement("div", null,
            "results:",
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null,
                react_1.default.createElement("code", { style: { background: '#fafafa' } }, (current === null || current === void 0 ? void 0 : current.outerHTML) || 'NULL')))));
}
exports.Preview = Preview;
//# sourceMappingURL=hover-selector.compositions.js.map