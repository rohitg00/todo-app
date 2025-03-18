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
exports.MockSnap = exports.MockButton = exports.MockTarget = void 0;
const react_1 = __importDefault(require("react"));
const react_ui_highlighter_component_metadata_bit_component_meta_1 = require("@teambit/react.ui.highlighter.component-metadata.bit-component-meta");
function MockTarget(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return react_1.default.createElement("div", Object.assign({}, rest), children);
}
exports.MockTarget = MockTarget;
MockTarget[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField] = {
    id: 'teambit.design/ui/mock-target@1.6.2',
};
function MockButton(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return react_1.default.createElement("button", Object.assign({}, rest), children);
}
exports.MockButton = MockButton;
MockButton[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField] = {
    id: 'teambit.design/ui/icon-button@1.6.2',
};
function MockSnap(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return react_1.default.createElement("button", Object.assign({}, rest), children);
}
exports.MockSnap = MockSnap;
MockSnap[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField] = {
    id: 'teambit.design/ui/icon-button@a21594d5cc63fd24d2b4763fa7d817b131f0edbb',
};
//# sourceMappingURL=mock-component.js.map