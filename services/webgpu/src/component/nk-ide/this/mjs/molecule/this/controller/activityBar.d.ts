/// <reference types="react" />
import 'reflect-metadata';
import { Controller } from './../../this/react/controller';
import { IMenuItemProps } from './../../this/components/menu';
import { IActivityBarItem } from './../../this/model';
import type { UniqueId } from './../../this/common/types';
export interface IActivityBarController extends Partial<Controller> {
    /**
     * Called when activity bar item is clicked
     */
    onClick?: (selectedKey: UniqueId, selectedNode: IActivityBarItem) => void;
    /**
     * Called when activity bar item which is not global is changed
     */
    onChange?: (prevSelected?: UniqueId, nextSelected?: UniqueId) => void;
    onContextMenuClick?: (e: React.MouseEvent, item: IMenuItemProps | undefined) => void;
}
export declare class ActivityBarController extends Controller implements IActivityBarController {
    private readonly activityBarService;
    private readonly settingsService;
    private readonly monacoService;
    private readonly menuBarController;
    private readonly builtinService;
    constructor();
    initView(): void;
    readonly onClick: (selectedKey: UniqueId, selctedNode: IActivityBarItem) => void;
    readonly onChange: (prevSelected?: UniqueId | undefined, nextSelected?: UniqueId | undefined) => void;
    private gotoQuickCommand;
    private onSelectColorTheme;
    readonly onContextMenuClick: (e: React.MouseEvent, item: IMenuItemProps | undefined) => void;
}
