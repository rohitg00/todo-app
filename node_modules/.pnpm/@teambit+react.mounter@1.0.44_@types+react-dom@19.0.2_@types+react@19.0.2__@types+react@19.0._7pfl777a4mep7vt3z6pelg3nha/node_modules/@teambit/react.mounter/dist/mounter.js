import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createRoot } from 'react-dom/client';
import { HighlighterProvider } from '@teambit/react.ui.highlighter-provider';
/**
 * a reference to a root instance.
 */
let root = null;
/**
 * a reference to the root document.
 */
let rootDoc = null;
/**
 * create a mounter.
 */
export function createMounter(Provider = React.Fragment) {
    return (Composition) => {
        if (root && rootDoc) {
            // Unmount the existing root before mounting a new one.
            root.unmount();
            root = null;
            rootDoc = null;
        }
        rootDoc = document.getElementById('root');
        root = createRoot(rootDoc);
        root.render(
        // @ts-ignore TODO: remove this after release.
        _jsx(ErrorBoundary, { fallback: _jsx(_Fragment, {}), children: _jsx(HighlighterProvider, { children: _jsx(Provider, { children: _jsx(Composition, {}) }) }) }));
    };
}
export default createMounter;
//# sourceMappingURL=mounter.js.map