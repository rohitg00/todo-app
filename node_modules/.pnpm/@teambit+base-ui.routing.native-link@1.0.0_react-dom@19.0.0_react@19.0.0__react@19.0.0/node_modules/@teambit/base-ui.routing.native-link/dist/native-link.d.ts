import React from 'react';
export declare type LinkProps = {
    /** When true, clicking the link will replace the current entry in the history stack instead of adding a new one */
    replace?: boolean;
    /** Open link in a new tab */
    external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
/**
 * Equivalent to an `<a/>` tag, with a few additional options.
 * Used to provide default fallbacks for react-router link
 */
export declare function NativeLink({ href, external, replace, onClick, ...rest }: LinkProps): JSX.Element;
