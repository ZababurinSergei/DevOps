import React from 'react';
import { HTMLElementProps, UniqueId } from './../../../this/common/types';
import { IActionBarItemProps } from '../actionBar';
declare type RenderFunctionProps = (data: ICollapseItem) => React.ReactNode;
export interface ICollapseItem extends HTMLElementProps {
    id: UniqueId;
    name: string;
    hidden?: boolean;
    toolbar?: IActionBarItemProps[];
    renderPanel?: RenderFunctionProps;
    config?: {
        /**
         * Specify how much of the remaining space should be assigned to the item, default is 1
         *
         * It unfolds in its own content height or the `MAX_GROW_HEIGHT` rather than in calculated height
         */
        grow?: number;
    };
    [key: string]: any;
}
export interface ICollapseProps extends HTMLElementProps {
    activePanelKeys?: UniqueId[];
    data?: ICollapseItem[];
    onCollapseChange?: (keys: UniqueId[]) => void;
    onResize?: (resizes: number[]) => void;
    onToolbarClick?: (item: IActionBarItemProps, parentPanel: ICollapseItem) => void;
    [key: string]: any;
}
/**
 * It's the max height for the item which set the grow to 0
 */
export declare const MAX_GROW_HEIGHT = 220;
export declare const HEADER_HEIGTH = 26;
export declare function Collapse({ data, activePanelKeys: controlActivePanelKeys, className, title, style, role, onCollapseChange, onToolbarClick, onResize, ...restProps }: ICollapseProps): React.JSX.Element;
export {};
