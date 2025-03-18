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
exports.Label = void 0;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const label_module_scss_1 = __importDefault(require("./label.module.scss"));
const component_strip_1 = require("./component-strip");
const other_components_1 = require("./other-components");
function Label(_a) {
    var { components } = _a, props = __rest(_a, ["components"]);
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const last = components.slice(-1).pop();
    if (!last)
        return null;
    const hasMore = components.length > 1;
    // reset when switching targets
    (0, react_1.useEffect)(() => {
        setShowMore(false);
    }, [components]);
    return (react_1.default.createElement(other_components_1.OtherComponentsPopper, { components: components, visible: showMore, placement: "bottom-start" },
        react_1.default.createElement(component_strip_1.ComponentStrip, Object.assign({}, props, { component: last }), hasMore && (react_1.default.createElement("span", { className: (0, classnames_1.default)(label_module_scss_1.default.othersTooltip, showMore && label_module_scss_1.default.active), onClick: () => setShowMore((x) => !x) })))));
}
exports.Label = Label;
//# sourceMappingURL=label.js.map