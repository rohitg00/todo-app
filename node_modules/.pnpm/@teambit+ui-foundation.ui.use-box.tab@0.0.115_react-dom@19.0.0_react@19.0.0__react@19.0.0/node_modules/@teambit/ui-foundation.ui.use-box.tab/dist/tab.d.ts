import React from 'react';
export declare type TabProps = {
    isActive?: boolean;
    onClick?: (target: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;
export declare function Tab({ onClick, isActive, className, children, ...rest }: TabProps): JSX.Element;
