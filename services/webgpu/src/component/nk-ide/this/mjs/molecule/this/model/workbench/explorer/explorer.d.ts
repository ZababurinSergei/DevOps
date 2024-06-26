import React from 'react';
import { IActionBarItemProps } from './../../../../this/components/actionBar';
import type { UniqueId } from './../../../../this/common/types';
export declare enum ExplorerEvent {
    onClick = "explorer.onClick",
    onPanelToolbarClick = "explorer.onPanelToolbarClick",
    onCollapseChange = "explorer.onCollapseChange",
    onRemovePanel = "explorer.onRemovePanel",
    onCollapseAllFolders = "explorer.onCollapseAllFolders"
}
export declare type RenderFunctionProps = (props: any) => React.ReactNode;
export interface IExplorerPanelItem {
    /**
     * It must be unique in the Explorer Panel Data
     */
    id: UniqueId;
    /**
     * @requires true
     * explorer panel's title
     */
    name: string;
    /**
     * specify panel order
     * the bigger the number is ranked previous
     */
    sortIndex?: number;
    className?: string;
    toolbar?: IActionBarItemProps[];
    renderPanel?: RenderFunctionProps;
    /**
     * whether hidden in explorer
     */
    hidden?: boolean;
    [key: string]: any;
}
export interface IExplorer {
    data: IExplorerPanelItem[];
    headerToolBar?: IActionBarItemProps;
    activePanelKeys?: UniqueId[];
}
export declare class IExplorerModel implements IExplorer {
    data: IExplorerPanelItem[];
    headerToolBar?: IActionBarItemProps;
    activePanelKeys?: UniqueId[];
    constructor(data?: IExplorerPanelItem[], headerToolBar?: IActionBarItemProps, activePanelKeys?: UniqueId[]);
}
