import React, { ComponentType, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createRoot, Root } from 'react-dom/client';
import { HighlighterProvider } from '@teambit/react.ui.highlighter-provider';

/**
 * a reference to a provider function.
 */
export type MounterProvider = ComponentType<{ children: ReactNode }>;

/**
 * a reference to a root instance.
 */
let root: Root | null = null;
/**
 * a reference to the root document.
 */
let rootDoc: HTMLElement | null = null;

/**
 * create a mounter.
 */
export function createMounter(Provider: MounterProvider = React.Fragment): any {
  return (Composition: React.ComponentType) => {
    if (root && rootDoc) {
      // Unmount the existing root before mounting a new one.
      root.unmount();
      root = null;
      rootDoc = null;
    }

    rootDoc = document.getElementById('root');
    root = createRoot(rootDoc!);
    
    root.render(
        // @ts-ignore TODO: remove this after release.
      <ErrorBoundary fallback={<></>}>
        {/* @ts-ignore TODO: need a react18 HighlighterProvider to fix this */}
        <HighlighterProvider>
          <Provider>
            <Composition />
          </Provider>
        </HighlighterProvider>
      </ErrorBoundary>
    );
  };
}

export default createMounter;
