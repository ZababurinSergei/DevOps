import React from 'react';
import type { HTMLElementProps, UniqueId } from './../../../this/common/types';
export interface IMenuItemProps extends HTMLElementProps {
    id: UniqueId;
    /**
     * The name of icon
     */
    icon?: string | JSX.Element;
    type?: 'divider';
    /**
     * Item Name
     */
    name?: string;
    disabled?: boolean;
    /**
     * The description of keybinding
     * example: ⇧⌘P
     */
    keybinding?: string;
    /**
     * Custom render
     */
    render?: (data: IMenuItemProps) => React.ReactNode;
    onClick?: (e: React.MouseEvent, item: IMenuItemProps) => void;
    sortIndex?: number;
    [key: string]: any;
}
export declare function MenuItem(props: React.PropsWithChildren<Omit<IMenuItemProps, 'id'>>): React.JSX.Element;
