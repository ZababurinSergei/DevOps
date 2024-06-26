import React from 'react';
import { ISubMenuProps } from './../../../this/components/menu/subMenu';
import { IMenuItemProps } from './../../../this/components/menu';
import type { UniqueId } from './../../../this/common/types';
import { MenuBarMode } from './layout';
/**
 * The activity bar event definition
 */
export declare enum MenuBarEvent {
    /**
     * Selected an activity bar
     */
    onSelect = "menuBar.onSelect",
    onChangeMode = "menuBar.onChangeMode"
}
export interface IMenuBarItem {
    id?: UniqueId;
    name?: string;
    icon?: string | JSX.Element;
    data?: ISubMenuProps[];
    render?: (data: IMenuItemProps) => React.ReactNode | JSX.Element;
    disabled?: boolean;
}
export interface IMenuBar {
    data: IMenuBarItem[];
    mode?: keyof typeof MenuBarMode;
    logo?: React.ReactNode;
}
export declare class MenuBarModel implements IMenuBar {
    data: IMenuBarItem[];
    constructor(data?: IMenuBarItem[]);
}
