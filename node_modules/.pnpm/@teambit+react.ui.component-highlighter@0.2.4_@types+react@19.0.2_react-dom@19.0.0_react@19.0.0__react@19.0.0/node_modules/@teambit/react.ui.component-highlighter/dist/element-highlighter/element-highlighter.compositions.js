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
exports.OffscreenElements = exports.FullscreenElement = exports.MovingElement = exports.Sizes = exports.Customized = exports.HighlightedElement = void 0;
const react_1 = __importStar(require("react"));
const element_highlighter_1 = require("./element-highlighter");
const mock_component_1 = require("../mock-component");
const HighlightedElement = ({ style, targetStyle, watchMotion, className }) => {
    const targetRef = (0, react_1.createRef)();
    return (react_1.default.createElement("div", { className: className, style: { padding: '16px 16px 40px 16px', width: 300, fontFamily: 'sans-serif' } },
        react_1.default.createElement("div", { ref: targetRef, style: Object.assign({ width: 100 }, targetStyle) }, "highlight target"),
        react_1.default.createElement(element_highlighter_1.ElementHighlighter, { targetRef: targetRef, components: [mock_component_1.MockTarget], style: style, watchMotion: watchMotion, placement: "bottom" })));
};
exports.HighlightedElement = HighlightedElement;
const Customized = () => {
    return (react_1.default.createElement(exports.HighlightedElement, { style: {
            '--bit-highlighter-color': '#94deb4',
            '--bit-highlighter-color-hover': '#d0f1de',
            '--bit-highlighter-color-active': '#37b26c',
        } }));
};
exports.Customized = Customized;
const Sizes = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(exports.HighlightedElement, { style: { fontSize: 10 } }),
        react_1.default.createElement(exports.HighlightedElement, { style: { fontSize: 14 } }),
        react_1.default.createElement(exports.HighlightedElement, { style: { fontSize: 18 } })));
};
exports.Sizes = Sizes;
const fps = 30;
const frameInterval = 1000 / fps;
const MovingElement = () => {
    const [margin, setMargin] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const intervalId = setInterval(() => setMargin((x) => (x + 1) % 100), frameInterval);
        return () => clearInterval(intervalId);
    }, []);
    return react_1.default.createElement(exports.HighlightedElement, { targetStyle: { marginLeft: margin }, watchMotion: true });
};
exports.MovingElement = MovingElement;
const FullscreenElement = () => {
    const targetRef = (0, react_1.createRef)();
    return (react_1.default.createElement("div", { style: { fontFamily: 'sans-serif' } },
        react_1.default.createElement("div", { ref: targetRef, style: {
                height: '100vh',
                width: '100%',
                background: '#bceed4',
            } },
            "This element will cover the entire document,",
            react_1.default.createElement("br", null),
            "pushing the highlighter to the edge of the window.",
            react_1.default.createElement("br", null),
            "The highlighter should remain inside and expand no further than the document."),
        react_1.default.createElement(element_highlighter_1.ElementHighlighter, { targetRef: targetRef, components: [mock_component_1.MockTarget], watchMotion: true })));
};
exports.FullscreenElement = FullscreenElement;
const edgeStyles = { position: 'absolute', background: 'cyan', padding: 30 };
const centerStyles = {
    top: { top: -30, left: '50%', transform: 'translate(-50%,0)' },
    right: { right: -30, top: '50%', transform: 'translate(0, -50%)' },
    bottom: { bottom: -30, left: '50%', transform: 'translate(-50%,0)' },
    left: { left: -30, top: '50%', transform: 'translate(0, -50%)' },
};
function OffscreenElements() {
    const target01 = (0, react_1.createRef)();
    const target02 = (0, react_1.createRef)();
    const target03 = (0, react_1.createRef)();
    const target04 = (0, react_1.createRef)();
    return (react_1.default.createElement("div", { style: { fontFamily: 'sans-serif', height: '100%' } },
        react_1.default.createElement("div", { style: { position: 'relative', width: '100%', height: '100%', overflow: 'hidden' } },
            react_1.default.createElement("div", { ref: target01, style: Object.assign(Object.assign({}, edgeStyles), centerStyles.top) }, "top"),
            react_1.default.createElement("div", { ref: target02, style: Object.assign(Object.assign({}, edgeStyles), centerStyles.right) }, "right"),
            react_1.default.createElement("div", { ref: target03, style: Object.assign(Object.assign({}, edgeStyles), centerStyles.bottom) }, "bottom"),
            react_1.default.createElement("div", { ref: target04, style: Object.assign(Object.assign({}, edgeStyles), centerStyles.left) }, "left"),
            react_1.default.createElement(element_highlighter_1.ElementHighlighter, { targetRef: target01, components: [mock_component_1.MockTarget], watchMotion: true }),
            react_1.default.createElement(element_highlighter_1.ElementHighlighter, { targetRef: target02, components: [mock_component_1.MockTarget], watchMotion: true }),
            react_1.default.createElement(element_highlighter_1.ElementHighlighter, { targetRef: target03, components: [mock_component_1.MockTarget], watchMotion: true }),
            react_1.default.createElement(element_highlighter_1.ElementHighlighter, { targetRef: target04, components: [mock_component_1.MockTarget], watchMotion: true }))));
}
exports.OffscreenElements = OffscreenElements;
//# sourceMappingURL=element-highlighter.compositions.js.map