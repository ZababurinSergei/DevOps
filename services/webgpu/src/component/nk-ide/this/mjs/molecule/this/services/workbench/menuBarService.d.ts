import 'reflect-metadata';
import type { UniqueId } from './../../../this/common/types';
import { IMenuBar, IMenuBarItem } from './../../../this/model/workbench/menuBar';
import { Component } from './../../../this/react';
export interface IMenuBarService extends Component<IMenuBar> {
    /**
     * Set the menus data
     * @param data
     */
    setMenus(data: IMenuBarItem[]): void;
    /**
     * Append a new menu into the specific menu found by `parentId`
     * @param menuItem the new menu
     * @param parentId
     */
    append(menuItem: IMenuBarItem, parentId: UniqueId): void;
    /**
     * Remove the specific menu item
     * @param menuId
     */
    remove(menuId: UniqueId): void;
    /**
     * Get the specific menu item
     * @param menuId
     */
    getMenuById(menuId: UniqueId): IMenuBarItem | undefined;
    /**
     * Update the specific menu item data
     * @param menuId
     * @param menuItem
     */
    update(menuId: UniqueId, menuItem: IMenuBarItem): void;
    /**
     * Reset menu bar data;
     */
    reset(): void;
    /**
     * listen to the onSelect event in menu
     * @param menuId
     */
    onSelect(callback: (menuId: UniqueId) => void): void;
}
export declare class MenuBarService extends Component<IMenuBar> implements IMenuBarService {
    protected state: IMenuBar;
    private sperator;
    constructor();
    /**
     * Get the specific menu reference type via menuId
     * @param menuId
     * @returns source is the target menu and path is the collections of indexs that contain the specific menu position
     */
    private getReferenceMenu;
    getMenuById(menuId: UniqueId): IMenuBarItem | undefined;
    setMenus: (menuData: IMenuBarItem[]) => void;
    append(menuItem: IMenuBarItem, parentId: UniqueId): void;
    remove(menuId: UniqueId): void;
    update(menuId: UniqueId, menuItem?: IMenuBarItem): void;
    reset(): void;
    onSelect: (callback: (menuId: UniqueId) => void) => void;
}
