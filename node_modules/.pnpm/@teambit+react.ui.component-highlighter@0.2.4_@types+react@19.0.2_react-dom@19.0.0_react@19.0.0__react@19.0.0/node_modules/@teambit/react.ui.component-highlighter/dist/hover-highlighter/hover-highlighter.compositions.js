"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.HoverExclusionZones = exports.UnmountingElement = exports.ShowWhenHovering = void 0;
const react_1 = __importStar(require("react"));
const hover_highlighter_1 = require("./hover-highlighter");
const mock_component_1 = require("../mock-component");
const ignore_highlighter_1 = require("../ignore-highlighter");
const ShowWhenHovering = () => {
    const [disabled, setDisabled] = (0, react_1.useState)(false);
    return (react_1.default.createElement("div", { style: { padding: '16px 50px 32px 16px', minWidth: 300, fontFamily: 'sans-serif' } },
        react_1.default.createElement(hover_highlighter_1.HoverHighlighter, { style: { padding: 16 }, disabled: disabled },
            react_1.default.createElement("div", null,
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(mock_component_1.MockButton, { onClick: () => setDisabled((x) => !x) }, "Hover here")),
                react_1.default.createElement("div", null,
                    disabled ? 'X' : '✓',
                    " highlighter is ",
                    disabled ? 'disabled' : 'enabled')))));
};
exports.ShowWhenHovering = ShowWhenHovering;
const UnmountingElement = () => {
    const [shown, setShown] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const tid = setInterval(() => setShown((x) => !x), 1500);
        return () => clearInterval(tid);
    }, []);
    return (react_1.default.createElement("div", { style: { padding: '16px 50px 32px 16px', minWidth: 300, fontFamily: 'sans-serif' } },
        react_1.default.createElement(hover_highlighter_1.HoverHighlighter, null,
            react_1.default.createElement("div", null, !shown && '(hidden)'),
            react_1.default.createElement("div", null, shown && react_1.default.createElement(mock_component_1.MockButton, null, "Hover here")),
            react_1.default.createElement("br", null),
            react_1.default.createElement(mock_component_1.MockTarget, null,
                react_1.default.createElement("div", null, shown && react_1.default.createElement(mock_component_1.MockButton, null, "Hover here")),
                react_1.default.createElement("div", null, "same with a container")))));
};
exports.UnmountingElement = UnmountingElement;
const HoverExclusionZones = () => {
    return (react_1.default.createElement("div", { style: { padding: '16px 50px 32px 16px', minWidth: 300, fontFamily: 'sans-serif' } },
        react_1.default.createElement(hover_highlighter_1.HoverHighlighter, null,
            react_1.default.createElement(mock_component_1.MockTarget, null,
                "container (target-able)",
                react_1.default.createElement("div", null, react_1.default.createElement(mock_component_1.MockButton, null, "will be highlighted"))),
            react_1.default.createElement("br", null),
            react_1.default.createElement(mock_component_1.MockTarget, null,
                "container (target-able)",
                react_1.default.createElement("div", Object.assign({}, ignore_highlighter_1.excludeHighlighterAtt), react_1.default.createElement(mock_component_1.MockButton, null, "will be ignored"))))));
};
exports.HoverExclusionZones = HoverExclusionZones;
//# sourceMappingURL=hover-highlighter.compositions.js.map