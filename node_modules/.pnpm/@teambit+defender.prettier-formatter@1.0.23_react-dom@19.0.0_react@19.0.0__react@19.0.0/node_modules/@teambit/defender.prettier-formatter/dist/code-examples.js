"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrettierExample = void 0;
const react_1 = __importDefault(require("react"));
const community_ui_content_tabs_1 = require("@teambit/community.ui.content-tabs");
const bit_env_mdx_1 = __importDefault(require("./snippets/bit-env.mdx"));
const config_mdx_1 = __importDefault(require("./snippets/config.mdx"));
const content = [
    { title: 'my-env.bit-env.ts', body: react_1.default.createElement(bit_env_mdx_1.default, null) },
    { title: 'config/prettier.config.js', body: react_1.default.createElement(config_mdx_1.default, null) },
];
const PrettierExample = () => react_1.default.createElement(community_ui_content_tabs_1.ContentTabs, { tabsContent: content });
exports.PrettierExample = PrettierExample;
//# sourceMappingURL=code-examples.js.map