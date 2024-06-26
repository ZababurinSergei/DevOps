/// <reference types="react" />
import 'reflect-metadata';
import { Component } from './../../../../this/react/component';
import { FileType, IFolderTree, IFolderTreeNodeProps } from './../../../../this/model/workbench/explorer/folderTree';
import { IMenuItemProps } from './../../../../this/components';
import type { UniqueId } from './../../../../this/common/types';
export interface IFolderTreeService extends Component<IFolderTree> {
    /**
     * Reset the FolderTreeService state
     */
    reset(): void;
    /**
     * Add data into folder tree
     * @param data
     * @param id - Except adding a root folder, the id is required
     */
    add(data: IFolderTreeNodeProps, id?: UniqueId): void;
    /**
     * Remove specific data in folder tree
     * @param id
     */
    remove(id: UniqueId): void;
    /**
     * Update specific data in folder tree
     * @param data - The `id` property is required in data
     */
    update(data: IFolderTreeNodeProps): void;
    /**
     * Get specific data in folder tree
     * @param id
     */
    get(id: UniqueId): IFolderTreeNodeProps | null;
    /**
     * get the current treeNode's parentNode
     * @param id
     */
    getParentNode(id: UniqueId): IFolderTreeNodeProps | null;
    /**
     * Get the context menus for file
     */
    getFileContextMenu: () => IMenuItemProps[];
    /**
     * Get the context menus for folder
     */
    getFolderContextMenu: () => IMenuItemProps[];
    /**
     * Get the expandKeys in folderTree
     */
    getExpandKeys: () => UniqueId[];
    /**
     * Set the expandKeys for folderTree
     */
    setExpandKeys: (expandKeys: UniqueId[]) => void;
    /**
     * Get the loadedKeys for folderTree
     */
    getLoadedKeys: () => string[];
    /**
     * Set the loadedKeys for folderTree
     */
    setLoadedKeys: (loadedKeys: string[]) => void;
    /**
     * Active specific node,
     * or unactive any node in folder tree
     * @param id
     */
    setActive(id?: UniqueId): void;
    /**
     * Set a entry page for folder tree
     * @param entry
     */
    setEntry(entry: React.ReactNode): void;
    /**
     * Set the context menus for file
     * @param menus
     */
    setFileContextMenu: (menus: IMenuItemProps[]) => void;
    /**
     * Set the context menus for folder
     * @param menus
     */
    setFolderContextMenu: (menus: IMenuItemProps[]) => void;
    /**
     * Listen to event about clicking rename button
     * @param callback
     */
    onRename(callback: (id: UniqueId) => void): void;
    /**
     * Listen to remove a node
     * @param callback
     */
    onRemove(callback: (id: UniqueId) => void): void;
    /**
     * Listen to update file or folder name
     * @param callback
     */
    onUpdateFileName(callback: (file: IFolderTreeNodeProps) => void): void;
    /**
     * Listen to select a file
     * @param callback
     */
    onSelectFile(callback: (file: IFolderTreeNodeProps) => void): void;
    /**
     * Listen to drop event
     * @param treeData
     */
    onDropTree(callback: (source: IFolderTreeNodeProps, target: IFolderTreeNodeProps) => void): void;
    /**
     * Listen to right click event
     * @param callback
     */
    onRightClick(callback: (treeData: IFolderTreeNodeProps, menus: IMenuItemProps[]) => void): void;
    /**
     * Listen to create a node for folder tree
     * @param callback
     */
    onCreate(callback: (type: FileType, nodeId?: UniqueId) => void): void;
    /**
     * Listen to the click event about the context menu except for built-in menus
     * @param callback
     */
    onContextMenu(callback: (contextMenu: IMenuItemProps, treeNode?: IFolderTreeNodeProps) => void): void;
    /**
     * Callback for load folder tree data
     * @param callback
     */
    onLoadData(callback: (treeNode: IFolderTreeNodeProps, callback: (treeNode: IFolderTreeNodeProps) => void) => void): void;
    /**
     * Callback for expanding tree node
     * @param callback
     */
    onExpandKeys(callback: (expandKeys: UniqueId[]) => void): void;
    /**
     * Toggle whether to enable sorting, which is disabled by default.
     */
    toggleAutoSort(): void;
}
export declare class FolderTreeService extends Component<IFolderTree> implements IFolderTreeService {
    protected state: IFolderTree;
    private readonly explorerService;
    private readonly builtinService;
    private fileContextMenu;
    private folderContextMenu;
    constructor();
    private isHiddenFile;
    private sortTree;
    reset(): void;
    getFileContextMenu(): IMenuItemProps[];
    getParentNode(id: UniqueId): IFolderTreeNodeProps | null;
    setFileContextMenu(menus: IMenuItemProps[]): void;
    getFolderContextMenu(): IMenuItemProps[];
    setFolderContextMenu(menus: IMenuItemProps[]): void;
    getExpandKeys(): UniqueId[];
    setExpandKeys(expandKeys: UniqueId[]): void;
    getLoadedKeys(): string[];
    setLoadedKeys(loadedKeys: string[]): void;
    private setCurrentFolderLocation;
    /**
     * Returns the node of root folder in folderTree
     */
    private getRootFolderById;
    private addRootFolder;
    private getRootFolderIndex;
    private getCurrentRootFolderInfo;
    private getPosOfType;
    add(data: IFolderTreeNodeProps, id?: UniqueId): void;
    remove(id: UniqueId): void;
    update(data: IFolderTreeNodeProps): void;
    get(id: UniqueId): IFolderTreeNodeProps | null;
    setActive(id?: UniqueId): void;
    setEntry(entry: React.ReactNode): void;
    onRename(callback: (id: UniqueId) => void): void;
    onRemove(callback: (id: UniqueId) => void): void;
    onUpdateFileName(callback: (file: IFolderTreeNodeProps) => void): void;
    onSelectFile(callback: (file: IFolderTreeNodeProps) => void): void;
    onDropTree: (callback: (source: IFolderTreeNodeProps, target: IFolderTreeNodeProps) => void) => void;
    onRightClick: (callback: (treeData: IFolderTreeNodeProps, menus: IMenuItemProps[]) => void) => void;
    onCreate: (callback: (type: FileType, nodeId?: UniqueId | undefined) => void) => void;
    onContextMenu: (callback: (contextMenu: IMenuItemProps, treeNode?: IFolderTreeNodeProps | undefined) => void) => void;
    onLoadData: (callback: (treeNode: IFolderTreeNodeProps, callback: (treeNode: IFolderTreeNodeProps) => void) => void) => void;
    onExpandKeys: (callback: (expandKeys: UniqueId[]) => void) => void;
    toggleAutoSort(): void;
}
