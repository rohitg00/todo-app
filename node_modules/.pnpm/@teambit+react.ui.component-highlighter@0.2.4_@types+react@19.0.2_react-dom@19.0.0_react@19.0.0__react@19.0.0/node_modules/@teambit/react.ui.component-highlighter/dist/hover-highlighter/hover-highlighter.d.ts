import React from 'react';
import { HybridHighlighterProps } from '../hybrid-highlighter';
export type HoverHighlighterProps = Omit<HybridHighlighterProps, 'mode'>;
export declare function HoverHighlighter({ ...props }: HoverHighlighterProps): React.JSX.Element;
