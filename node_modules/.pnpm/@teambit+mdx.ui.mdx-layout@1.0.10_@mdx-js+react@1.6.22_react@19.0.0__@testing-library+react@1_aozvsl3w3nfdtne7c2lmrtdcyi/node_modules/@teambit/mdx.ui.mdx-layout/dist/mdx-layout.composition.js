import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeCompositions } from '@teambit/documenter.theme.theme-compositions';
import { MDXLayout } from './mdx-layout';
// @ts-ignore
import MdxContentDefault from './mdx-layout.docs.md';
// @ts-ignore
import MdxContentExample from './md-example.md';
export const MDXLayoutExample = () => (_jsx(ThemeCompositions, { children: _jsx(MDXLayout, { children: _jsx(MdxContentDefault, {}) }) }));
export const MDXLayoutSecondExample = () => (_jsx(ThemeCompositions, { children: _jsx(MDXLayout, { children: _jsx(MdxContentExample, {}) }) }));
MDXLayoutSecondExample.canvas = {
    overflow: 'scroll',
    height: 200,
};
//# sourceMappingURL=mdx-layout.composition.js.map