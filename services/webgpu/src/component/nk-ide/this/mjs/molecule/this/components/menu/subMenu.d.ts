import React from 'react';
import { TriggerEvent } from './../../../this/common/dom';
import { IMenuItemProps } from './menuItem';
export declare enum MenuMode {
    Vertical = "vertical",
    Horizontal = "horizontal"
}
export declare function isHorizontal(mode: MenuMode): boolean;
export declare function isVertical(mode: MenuMode): boolean;
export interface ISubMenuProps extends Omit<IMenuItemProps, 'id'> {
    /**
     * The event of show subMenu, default value is 'hover'
     */
    trigger?: TriggerEvent;
    icon?: string | JSX.Element;
    data?: ISubMenuProps[];
    mode?: MenuMode;
}
export declare function SubMenu(props: React.PropsWithChildren<ISubMenuProps>): React.JSX.Element;
