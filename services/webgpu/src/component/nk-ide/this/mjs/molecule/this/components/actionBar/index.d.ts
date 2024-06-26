import React from 'react';
import { IMenuItemProps } from './../../../this/components/menu';
import type { HTMLElementProps, UniqueId } from './../../../this/common/types';
export interface IActionBarItemProps<T = any> {
    id: UniqueId;
    title?: string | JSX.Element;
    name?: React.ReactNode;
    icon?: string | JSX.Element;
    disabled?: boolean;
    checked?: boolean;
    data?: T;
    contextMenu?: IMenuItemProps[];
    onContextMenuClick?: (e: React.MouseEvent, item: IMenuItemProps | undefined) => void;
    onClick?(event: React.MouseEvent, item: IActionBarItemProps): void;
    [key: string]: any;
}
export interface IActionBarProps<T = any> extends HTMLElementProps {
    data: IActionBarItemProps<T>[];
    onContextMenuClick?: (e: React.MouseEvent, item: IMenuItemProps | undefined) => void;
    onClick?(event: React.MouseEvent, item: IActionBarItemProps): void;
    [key: string]: any;
}
export declare function ActionBarItem(props: IActionBarItemProps): React.JSX.Element;
export declare function ActionBar<T = any>(props: IActionBarProps<T>): React.JSX.Element;
