"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentStripPreview = void 0;
const react_1 = __importDefault(require("react"));
const component_strip_1 = require("./component-strip");
const mock_component_1 = require("../mock-component");
const ComponentStripPreview = () => {
    return (react_1.default.createElement("div", { style: { fontFamily: 'sans-serif', padding: 8 } },
        react_1.default.createElement(component_strip_1.ComponentStrip, { component: mock_component_1.MockSnap }),
        react_1.default.createElement("br", null),
        react_1.default.createElement(component_strip_1.ComponentStrip, { component: mock_component_1.MockButton })));
};
exports.ComponentStripPreview = ComponentStripPreview;
//# sourceMappingURL=component-strip.compositions.js.map