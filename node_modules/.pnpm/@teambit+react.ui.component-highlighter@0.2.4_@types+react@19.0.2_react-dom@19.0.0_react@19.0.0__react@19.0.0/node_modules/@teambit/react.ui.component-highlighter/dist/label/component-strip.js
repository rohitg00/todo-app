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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentStrip = void 0;
const react_1 = __importStar(require("react"));
const base_ui_routing_native_link_1 = require("@teambit/base-ui.routing.native-link");
const component_id_1 = require("@teambit/component-id");
const component_modules_component_url_1 = require("@teambit/component.modules.component-url");
const react_ui_highlighter_component_metadata_bit_component_meta_1 = require("@teambit/react.ui.highlighter.component-metadata.bit-component-meta");
const component_strip_module_scss_1 = __importDefault(require("./component-strip.module.scss"));
const links_1 = require("./links");
exports.ComponentStrip = (0, react_1.forwardRef)(function ComponentStrip({ component, children }, ref) {
    const { id, homepage, exported } = extractMetadata(component);
    const parsedId = (0, react_1.useMemo)(() => component_id_1.ComponentID.tryFromString(id), [id]);
    const componentLink = homepage || (0, links_1.calcComponentLink)(parsedId, exported);
    return (react_1.default.createElement("div", { className: component_strip_module_scss_1.default.componentStrip, ref: ref },
        !parsedId && react_1.default.createElement(LabelBlock, { link: homepage }, id),
        parsedId && react_1.default.createElement(LabelBlock, { link: component_modules_component_url_1.ScopeUrl.toUrl(parsedId.scope) }, parsedId.scope),
        parsedId && (react_1.default.createElement(LabelBlock, { link: componentLink, className: component_strip_module_scss_1.default.nameBlock },
            react_1.default.createElement("span", null, parsedId.fullName),
            parsedId.version && parsedId.version !== 'latest' && (react_1.default.createElement("span", { className: component_strip_module_scss_1.default.version },
                "@",
                parsedId.version)))),
        children));
});
function LabelBlock({ link, children, className }) {
    const Comp = link ? base_ui_routing_native_link_1.NativeLink : 'span';
    return (react_1.default.createElement(Comp, { href: link, external: !!link, className: className }, children));
}
function extractMetadata(metadata) {
    if (typeof metadata === 'string') {
        return { id: metadata, exported: true };
    }
    return metadata[react_ui_highlighter_component_metadata_bit_component_meta_1.componentMetaField];
}
//# sourceMappingURL=component-strip.js.map