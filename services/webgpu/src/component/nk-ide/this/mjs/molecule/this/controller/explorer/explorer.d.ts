import 'reflect-metadata';
import React from 'react';
import { Controller } from './../../../this/react/controller';
import { IMenuItemProps } from './../../../this/components/menu';
import { IExplorerPanelItem } from './../../../this/model/workbench/explorer/explorer';
import { IActionBarItemProps } from './../../../this/components/actionBar';
export interface IExplorerController extends Partial<Controller> {
    onActionsContextMenuClick?: (e: React.MouseEvent, item?: IMenuItemProps) => void;
    onCollapseChange?: (keys: any) => void;
    onToolbarClick?: (item: IActionBarItemProps, panel: IExplorerPanelItem) => void;
    onClick?: (event: any, item: any) => void;
}
export declare class ExplorerController extends Controller implements IExplorerController {
    private readonly activityBarService;
    private readonly sidebarService;
    private readonly explorerService;
    private readonly folderTreeController;
    private readonly builtinService;
    constructor();
    initView(): void;
    readonly onClick: (event: React.MouseEvent, item: IActionBarItemProps) => void;
    readonly onActionsContextMenuClick: (e: React.MouseEvent, item?: IMenuItemProps | undefined) => void;
    readonly onCollapseChange: (keys: any) => void;
    readonly onToolbarClick: (item: IActionBarItemProps, parentPanel: IExplorerPanelItem) => void;
    renderFolderTree: (panel: any) => React.JSX.Element;
}
