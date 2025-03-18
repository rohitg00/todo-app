import type { ComponentType } from 'react';
import { ForwardRefInstance } from './fiber-node';
export declare type ReactComponent = ComponentType | ForwardRefInstance;
/**
 * a function that returns the React component of a given
 * DOM node.
 * This supports React 15 and 16+.
 */
export declare function toRootElement(element: HTMLElement | null): HTMLElement;
/** @deprecated */
export declare function domToReact(element: HTMLElement | null): ReactComponent;
export declare function domToReacts(element: HTMLElement | null): ReactComponent[];
