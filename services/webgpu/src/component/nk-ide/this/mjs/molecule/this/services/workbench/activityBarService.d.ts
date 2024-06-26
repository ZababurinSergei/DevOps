import 'reflect-metadata';
import { Component } from './../../../this/react/component';
import { IActivityBar, IActivityBarItem } from './../../../this/model/workbench/activityBar';
import { IActivityMenuItemProps } from './../../../this/model';
import type { UniqueId } from './../../../this/common/types';
export interface IActivityBarService extends Component<IActivityBar> {
    /**
     * Reset the activityBar state data,
     * if you want to whole customize the activityBar, you can reset it first,
     * and then using the activityBar.add() method to fill the data you need.
     */
    reset(): void;
    /**
     * Add IActivityBarItem data
     * @param isActive If provide, Activity Bar will set data active automatically. Only works in one data
     */
    add(data: IActivityBarItem | IActivityBarItem[], isActive?: boolean): void;
    /**
     * Set active bar
     */
    setActive(id?: UniqueId): void;
    /**
     * Remove the specific activity bar by id
     * @param id
     */
    remove(id: UniqueId | UniqueId[]): void;
    /**
     * Toggle the specific activity bar between show or hide
     * @param id activity bar id
     */
    toggleBar(id: UniqueId): void;
    /**
     * Toggle the contextMenu between checked or unchecked
     * @param id contextmenu id
     */
    toggleContextMenuChecked(id: UniqueId): void;
    /**
     * Add new contextMenus for the activityBar
     */
    addContextMenu(data: IActivityMenuItemProps | IActivityMenuItemProps[]): void;
    /**
     * Remove the specific contextMenu item by id
     * @param id contextmenu id
     */
    removeContextMenu(id: UniqueId | UniqueId[]): void;
    /**
     * Add click event listener
     * @param callback
     */
    onClick(callback: (selectedKey: UniqueId, item: IActivityBarItem) => void): any;
    /**
     * Called when activity bar item which is not global is changed
     */
    onChange(callback: (prevSelectedKey?: UniqueId, nextSelectedKey?: UniqueId) => void): any;
}
export declare class ActivityBarService extends Component<IActivityBar> implements IActivityBarService {
    protected state: IActivityBar;
    private sidebarService;
    constructor();
    setActive(id?: UniqueId): void;
    reset(): void;
    add(data: IActivityBarItem | IActivityBarItem[], isActive?: boolean): void;
    private getRemoveList;
    remove(id: UniqueId | UniqueId[]): void;
    toggleBar(id: UniqueId): void;
    toggleContextMenuChecked(id: UniqueId): void;
    addContextMenu(contextMenu: IActivityMenuItemProps | IActivityMenuItemProps[]): void;
    removeContextMenu(id: UniqueId | UniqueId[]): void;
    onClick(callback: (selectedKey: UniqueId, item: IActivityBarItem) => void): void;
    onChange(callback: (prevSelectedKey?: UniqueId, nextSelectedKey?: UniqueId) => void): void;
}
