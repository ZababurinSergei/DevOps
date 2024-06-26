import React, { CSSProperties } from 'react';
export declare enum DirectionKind {
    vertical = "vertical",
    horizontal = "horizontal"
}
export interface IScrollbarProps {
    inactiveHidden?: boolean;
    style?: CSSProperties;
    trackStyle?: CSSProperties;
    className?: string;
    direction?: DirectionKind;
    isShowShadow?: boolean;
    onScroll?: (evt: IScrollEvent, e: MouseEvent | React.MouseEvent) => void;
    onScrollStart?: (evt: IScrollEvent, e: MouseEvent | React.MouseEvent) => void;
    onScrollEnd?: (evt: IScrollEvent, e: MouseEvent | React.MouseEvent) => void;
}
export interface IScrollEvent {
    scrollTop: number;
}
export interface IScrollRef {
    scrollHeight: number;
    scrollTo: (offset: number) => void;
}
export declare const ScrollBar: React.ForwardRefExoticComponent<IScrollbarProps & {
    children?: React.ReactNode;
} & React.RefAttributes<IScrollRef>>;
