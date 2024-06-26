import React from 'react';
import { IMenuItemProps } from './../../../this/components';
import type { HTMLElementProps, UniqueId } from './../../../this/common/types';
/**
 * The activity bar event definition
 */
export declare enum ActivityBarEvent {
    OnClick = "activityBar.onClick",
    OnChange = "activityBar.onChange",
    /**
     * Activity bar data changed
     */
    DataChanged = "activityBar.data",
    ReRender = "activityBar.reRender"
}
export interface IActivityBarItem extends HTMLElementProps {
    id: UniqueId;
    name?: React.ReactNode;
    hidden?: boolean;
    data?: any;
    icon?: string | JSX.Element;
    checked?: boolean;
    disabled?: boolean;
    type?: 'normal' | 'global';
    contextMenu?: IActivityMenuItemProps[];
    sortIndex?: number;
    render?: () => React.ReactNode | JSX.Element;
}
export interface IActivityMenuItemProps extends IMenuItemProps {
    id: UniqueId;
}
export interface IActivityBar {
    data?: IActivityBarItem[];
    contextMenu?: IActivityMenuItemProps[];
    selected?: UniqueId;
}
export declare class ActivityBarModel implements IActivityBar {
    data: IActivityBarItem[];
    contextMenu: IActivityMenuItemProps[];
    selected: UniqueId;
    constructor(data?: IActivityBarItem[], contextMenu?: IActivityMenuItemProps[], selected?: UniqueId);
}
