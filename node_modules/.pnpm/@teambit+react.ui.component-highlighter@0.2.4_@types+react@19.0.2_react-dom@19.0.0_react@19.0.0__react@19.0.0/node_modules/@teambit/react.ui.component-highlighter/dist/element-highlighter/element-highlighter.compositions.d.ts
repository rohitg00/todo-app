import React, { CSSProperties } from 'react';
type HighlightedElementProps = {
    style?: CSSProperties;
    targetStyle?: CSSProperties;
    className?: string;
    watchMotion?: boolean;
};
export declare const HighlightedElement: ({ style, targetStyle, watchMotion, className }: HighlightedElementProps) => React.JSX.Element;
export declare const Customized: () => React.JSX.Element;
export declare const Sizes: () => React.JSX.Element;
export declare const MovingElement: () => React.JSX.Element;
export declare const FullscreenElement: () => React.JSX.Element;
export declare function OffscreenElements(): React.JSX.Element;
export {};
