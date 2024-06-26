import React from 'react';
import { IMenuItemProps } from './../../../this/components/menu';
import type { HTMLElementProps, UniqueId } from './../../../this/common/types';
export declare enum Float {
    left = "left",
    right = "right"
}
export interface IStatusBarItem<T = any> extends HTMLElementProps {
    id: UniqueId;
    sortIndex?: number;
    data?: T;
    onClick?(e: React.MouseEvent, item?: IStatusBarItem): any;
    render?: (item: IStatusBarItem) => React.ReactNode;
    name?: string;
}
export interface IStatusBar {
    rightItems: IStatusBarItem[];
    leftItems: IStatusBarItem[];
    contextMenu?: IMenuItemProps[];
}
/**
 * The activity bar event definition
 */
export declare enum StatusBarEvent {
    /**
     * Selected an activity bar
     */
    onClick = "statusBar.onClick",
    /**
     * Activity bar data changed
     */
    DataChanged = "statusBar.data"
}
export declare class StatusBarModel implements IStatusBar {
    leftItems: IStatusBarItem[];
    rightItems: IStatusBarItem[];
    contextMenu: IMenuItemProps[];
    constructor(leftItems?: IStatusBarItem[], rightItems?: IStatusBarItem[], contextMenu?: IMenuItemProps[]);
}
