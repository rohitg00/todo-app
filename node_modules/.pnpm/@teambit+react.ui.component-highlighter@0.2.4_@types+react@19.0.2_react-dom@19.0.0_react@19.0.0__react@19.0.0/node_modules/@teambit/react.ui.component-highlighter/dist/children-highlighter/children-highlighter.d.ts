import React from 'react';
import { HybridHighlighterProps } from '../hybrid-highlighter';
export type ChildrenHighlighterProps = Omit<HybridHighlighterProps, 'mode'>;
export declare function ChildrenHighlighter({ watchMotion, ...props }: ChildrenHighlighterProps): React.JSX.Element;
