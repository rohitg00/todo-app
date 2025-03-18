"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherComponentsPopper = void 0;
const react_1 = __importDefault(require("react"));
const headless_1 = __importDefault(require("@tippyjs/react/headless"));
const component_strip_1 = require("./component-strip");
const label_module_scss_1 = __importDefault(require("./label.module.scss"));
// a popper ("tooltip") that shows the additional React Components related to this dom element
function OtherComponentsPopper(_a) {
    var { components, children, start, end = -1, placement = 'bottom', interactive = true } = _a, tippyProps = __rest(_a, ["components", "children", "start", "end", "placement", "interactive"]);
    const content = (react_1.default.createElement(react_1.default.Fragment, null, components
        .slice(start, end)
        .reverse()
        .map((comp, idx) => (react_1.default.createElement(component_strip_1.ComponentStrip, { key: idx, component: comp })))));
    return (react_1.default.createElement(headless_1.default, Object.assign({ placement: placement, interactive: interactive }, tippyProps, { 
        // second parameter "content" is always undefined, use content inline
        // https://github.com/atomiks/tippyjs-react/issues/341
        render: (attrs) => (react_1.default.createElement("div", Object.assign({}, attrs, { className: label_module_scss_1.default.othersContainer }), content)) }), children));
}
exports.OtherComponentsPopper = OtherComponentsPopper;
//# sourceMappingURL=other-components.js.map