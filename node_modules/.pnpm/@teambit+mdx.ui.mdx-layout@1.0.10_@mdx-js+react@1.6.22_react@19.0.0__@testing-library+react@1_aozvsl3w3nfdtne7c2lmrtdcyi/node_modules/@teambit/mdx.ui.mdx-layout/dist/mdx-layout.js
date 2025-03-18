import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { MDXLayout as MDXLayoutBase } from '@teambit/documenter.markdown.mdx';
import { Snippet } from '@teambit/mdx.ui.docs.snippet';
import { Link } from '@teambit/mdx.ui.docs.link';
import './mdx-layout.css';
const mdxComponents = {
    code: Snippet,
    a: Link,
};
/**
 * MDX Provider which includes documenter as design system for markdown rendering.
 */
export function MDXLayout({ components, ...rest }) {
    const memoizedComponents = useMemo(() => ({ ...mdxComponents, ...components }), [mdxComponents, components]);
    return _jsx(MDXLayoutBase, { components: memoizedComponents, ...rest });
}
//# sourceMappingURL=mdx-layout.js.map