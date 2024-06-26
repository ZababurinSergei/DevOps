import 'reflect-metadata';
import { Component } from './../../../this/react';
import { ISidebar, ISidebarPane } from './../../../this/model/workbench/sidebar';
import type { UniqueId } from './../../../this/common/types';
export interface ISidebarService extends Component<ISidebar> {
    /**
     * Get a specific pane via id
     * @param id
     */
    get(id: UniqueId): ISidebarPane | undefined;
    /**
     * Add a new Sidebar pane
     * @param pane
     * @param isActive Whether to activate the current pane
     */
    add(pane: ISidebarPane, isActive?: boolean): void;
    /**
     * Update a specific pane
     * @param pane
     */
    update(pane: ISidebarPane): void;
    /**
     * Remove a pane
     * @param id
     */
    remove(id: UniqueId): void;
    /**
     * Set the specific pane as active
     * @param id
     */
    setActive(id?: UniqueId): void;
    /**
     * Reset the sidebar data
     */
    reset(): void;
}
export declare class SidebarService extends Component<ISidebar> implements ISidebarService {
    protected state: ISidebar;
    constructor();
    private getPane;
    get(id: UniqueId): ISidebarPane | undefined;
    add(data: ISidebarPane, isActive?: boolean): void;
    update(pane: ISidebarPane): void;
    remove(id: UniqueId): void;
    setActive(id?: UniqueId): void;
    reset(): void;
}
