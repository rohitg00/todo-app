"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenHighlighterWithComponentRule = exports.ChildrenHighlighterWithRule = exports.ChildrenHighlighterInsideIgnore = exports.ChildrenHighlighterWithCustomColors = exports.ChildrenHighlighterPreview = void 0;
const react_1 = __importDefault(require("react"));
// import { EnterpriseOffering } from '@teambit/evangelist.pages.enterprise-offering';
const react_ui_highlighter_component_metadata_bit_component_meta_1 = require("@teambit/react.ui.highlighter.component-metadata.bit-component-meta");
const ignore_highlighter_1 = require("../ignore-highlighter");
const children_highlighter_1 = require("./children-highlighter");
const mock_component_1 = require("../mock-component");
const ChildrenHighlighterPreview = () => {
    return (
    // highlighter runs in compositions, therefor should not have our font
    react_1.default.createElement(children_highlighter_1.ChildrenHighlighter, { style: { padding: 40, minWidth: 200, fontFamily: 'sans-serif' } },
        react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "target #1"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "target #2")));
};
exports.ChildrenHighlighterPreview = ChildrenHighlighterPreview;
const ChildrenHighlighterWithCustomColors = () => {
    return (react_1.default.createElement(children_highlighter_1.ChildrenHighlighter, { style: { padding: 40, minWidth: 200, color: 'yellow', fontFamily: 'sans-serif' }, bgColor: "cornflowerblue", bgColorHover: "blue", bgColorActive: "DarkSlateBlue" },
        react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "hover here"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "also here")));
};
exports.ChildrenHighlighterWithCustomColors = ChildrenHighlighterWithCustomColors;
const ChildrenHighlighterInsideIgnore = () => {
    return (react_1.default.createElement(ignore_highlighter_1.ExcludeHighlighter, null,
        react_1.default.createElement(children_highlighter_1.ChildrenHighlighter, { style: { fontFamily: 'sans-serif' } },
            "Multi Highlighter should still work when inside ",
            react_1.default.createElement("code", null, '<ExcludeHighlighter>'),
            react_1.default.createElement("br", null),
            "It should only skip exclusion zones inside of it.",
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "hover here"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "also here"))));
};
exports.ChildrenHighlighterInsideIgnore = ChildrenHighlighterInsideIgnore;
const ChildrenHighlighterWithRule = () => {
    const rule = '#someSubTree *';
    return (react_1.default.createElement(children_highlighter_1.ChildrenHighlighter, { rule: rule, style: { minWidth: 300, fontFamily: 'sans-serif' } },
        react_1.default.createElement("div", null,
            "element filter: ",
            react_1.default.createElement("code", null,
                "\"",
                rule,
                "\"")),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "no highlighter"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { id: "someSubTree" },
            react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "this will be highlighted"))));
};
exports.ChildrenHighlighterWithRule = ChildrenHighlighterWithRule;
const ChildrenHighlighterWithComponentRule = () => {
    const filterTarget = 'teambit.design/ui/mock-target';
    return (react_1.default.createElement(children_highlighter_1.ChildrenHighlighter, { componentRule: filterTarget, style: { minWidth: 300, fontFamily: 'sans-serif' } },
        react_1.default.createElement("div", null,
            "component filter: ",
            react_1.default.createElement("code", null,
                "\"",
                filterTarget,
                "\"")),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_ui_highlighter_component_metadata_bit_component_meta_1.MockedComponentWithMeta, null, "no highlighter"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement(mock_component_1.MockTarget, { style: { display: 'inline-block', margin: '0 8px' } }, "this will be highlighted")));
};
exports.ChildrenHighlighterWithComponentRule = ChildrenHighlighterWithComponentRule;
// export const HighlightingAllElementsInTheEnterprisePage = () => {
//   return (
//     <ChildrenHighlighter>
//       <EnterpriseOffering style={{ height: 300 }} />
//     </ChildrenHighlighter>
//   );
// };
//# sourceMappingURL=children-highlighter.composition.js.map