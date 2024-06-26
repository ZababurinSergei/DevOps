/// <reference types="react" />
import 'reflect-metadata';
import { IActivityBarItem, IMenuBarItem } from './../../this/model';
import { MenuBarMode } from './../../this/model/workbench/layout';
import { Controller } from './../../this/react/controller';
import type { UniqueId } from './../../this/common/types';
export interface IMenuBarController extends Partial<Controller> {
    onSelect?: (key: UniqueId, item?: IActivityBarItem) => void;
    onClick: (event: React.MouseEvent<any, any>, item: IMenuBarItem) => void;
    updateFocusinEle?: (ele: HTMLElement | null) => void;
    updateStatusBar?: () => void;
    updateMenuBar?: () => void;
    updateActivityBar?: () => void;
    updateSideBar?: () => void;
    updateMenuBarMode?: (mode: keyof typeof MenuBarMode) => void;
    getMenuBarDataByMode?: (mode: keyof typeof MenuBarMode, menuData: IMenuBarItem[]) => IMenuBarItem[];
}
export declare class MenuBarController extends Controller implements IMenuBarController {
    private readonly menuBarService;
    private readonly layoutService;
    private readonly monacoService;
    private readonly builtinService;
    private readonly activityBarService;
    private _focusinEle;
    private _automation;
    constructor();
    initView(): void;
    updateFocusinEle: (ele: HTMLElement | null) => void;
    readonly onClick: (event: React.MouseEvent, item: IMenuBarItem) => void;
    createFile: () => void;
    undo: () => void;
    redo: () => void;
    gotoQuickCommand: () => void;
    updateActivityBar: () => void;
    selectAll: () => void;
    copyLineUp: () => void;
    updateMenuBar: () => void;
    updateMenuBarMode: (mode: keyof typeof MenuBarMode) => void;
    private updateMenuBarDataByMode;
    private getMenuBarItem;
    updateStatusBar: () => void;
    updateSideBar: () => void;
    updateAuxiliaryBar: () => void;
    private updatePanel;
    /**
     * Get the menu bar data after filtering out the menu contained in ids
     * @param menuData
     * @param ids
     * @returns Filtered menu bar data
     */
    private getFilteredMenuBarData;
    getMenuBarDataByMode(mode: keyof typeof MenuBarMode, menuData: IMenuBarItem[]): IMenuBarItem[];
    private updateActivityBarContextMenu;
}
