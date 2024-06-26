import { IActionBarItemProps, IMenuItemProps, ITabProps } from './../../../../this/components';
import { IEditor, IEditorTab } from './../../../../this/model';
import { Component } from './../../../../this/react';
import { UniqueId } from './../../../../this/common/types';
export interface IEditorTreeService extends Component<IEditor> {
    /**
     * Callabck for close a certain tab
     * @param callback
     */
    onClose(callback: (tabId: UniqueId, groupId: UniqueId) => void): void;
    /**
     * Callback for close others tabs except this tabItem
     * @param callback
     */
    onCloseOthers(callback: (tabItem: IEditorTab, groupId: UniqueId) => void): void;
    /**
     * Callback for close saved tabs in this group
     * @param callback
     */
    onCloseSaved(callback: (groupId: UniqueId) => void): void;
    /**
     * Callback for select tab in this group
     * @param callback
     */
    onSelect(callback: (tabId: UniqueId, groupId: UniqueId) => void): void;
    /**
     * Callback for close all tabs
     * When specify groupId, it'll close that group
     * @param callback
     */
    onCloseAll(callback: (groupId?: UniqueId) => void): void;
    /**
     * Callback for save all tabs
     * When specify groupId, it'll save that group
     * @param callback
     */
    onSaveAll(callback: (groupId?: UniqueId) => void): void;
    /**
     * Callback for the click event from toolbar buttons, except for saving button and closing button,
     * if you want to subscribe to the click events for these two buttons, please use the methods of `onSaveAll` and `onCloseAll`
     * @param callback
     */
    onToolbarClick(callback: (toolbar: IActionBarItemProps, groupId?: UniqueId) => void): void;
    /**
     * Callback for adjust editor layout
     * @param callback
     */
    onLayout(callback: () => void): void;
    /**
     * Callback for context menu click event which isn't in buit-in menus
     * @param callback
     */
    onContextMenu(callback: (menu: IMenuItemProps, file: ITabProps, groupId: UniqueId) => void): void;
}
export declare class EditorTreeService extends Component<IEditor> implements IEditorTreeService {
    protected state: IEditor;
    private readonly editorService;
    constructor();
    onClose(callback: (tabId: UniqueId, groupId: UniqueId) => void): void;
    onCloseOthers(callback: (tabItem: IEditorTab, groupId: UniqueId) => void): void;
    onCloseSaved(callback: (groupId: UniqueId) => void): void;
    onSelect(callback: (tabId: UniqueId, groupId: UniqueId) => void): void;
    onCloseAll(callback: (groupId?: UniqueId) => void): void;
    onSaveAll(callback: (groupId?: UniqueId) => void): void;
    onToolbarClick(callback: (toolbar: IActionBarItemProps, groupId?: UniqueId) => void): void;
    onLayout(callback: () => void): void;
    onContextMenu(callback: (menu: IMenuItemProps, file: ITabProps, groupId: UniqueId) => void): void;
}
