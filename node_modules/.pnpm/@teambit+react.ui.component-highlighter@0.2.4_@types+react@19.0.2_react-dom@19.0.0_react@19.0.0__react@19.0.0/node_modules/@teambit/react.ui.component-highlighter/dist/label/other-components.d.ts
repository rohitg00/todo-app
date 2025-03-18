import React from 'react';
import { TippyProps } from '@tippyjs/react/headless';
import { ComponentMetaHolder } from '@teambit/react.ui.highlighter.component-metadata.bit-component-meta';
export type OtherComponentsProps = {
    components: (ComponentMetaHolder | string)[];
    start?: number;
    end?: number;
} & TippyProps;
export declare function OtherComponentsPopper({ components, children, start, end, placement, interactive, ...tippyProps }: OtherComponentsProps): React.JSX.Element;
