"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESLintExample = void 0;
const react_1 = __importDefault(require("react"));
const community_ui_content_tabs_1 = require("@teambit/community.ui.content-tabs");
const bit_env_mdx_1 = __importDefault(require("./bit-env.mdx"));
const config_mdx_1 = __importDefault(require("./config.mdx"));
const tsconfig_mdx_1 = __importDefault(require("./tsconfig.mdx"));
const content = [
    { title: 'my-env.bit-env.ts', body: react_1.default.createElement(bit_env_mdx_1.default, null) },
    { title: 'config/eslintrc.js', body: react_1.default.createElement(config_mdx_1.default, null) },
    { title: 'config/tsconfig.json', body: react_1.default.createElement(tsconfig_mdx_1.default, null) },
];
const ESLintExample = () => react_1.default.createElement(community_ui_content_tabs_1.ContentTabs, { tabsContent: content });
exports.ESLintExample = ESLintExample;
//# sourceMappingURL=index.js.map