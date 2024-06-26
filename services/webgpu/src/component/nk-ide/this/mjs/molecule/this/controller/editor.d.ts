import 'reflect-metadata';
import React from 'react';
import { IEditorTab, IEditorActionsProps } from './../../this/model/workbench/editor';
import { Controller } from './../../this/react/controller';
import { IMenuItemProps } from './../../this/components/menu';
import { IMonacoEditorProps } from './../../this/components/monaco';
import { editor as MonacoEditor } from './../../this/monaco';
import type { UniqueId } from './../../this/common/types';
export interface IEditorController extends Partial<Controller> {
    open?<T = any>(tab: IEditorTab<T>, groupId?: UniqueId): void;
    onClickContextMenu?: (e: React.MouseEvent, item: IMenuItemProps, tabItem?: IEditorTab) => void;
    onCloseAll?: (group: UniqueId) => void;
    onCloseTab?: (tabId: UniqueId, group: UniqueId) => void;
    onCloseToLeft?: (tab: IEditorTab, group: UniqueId) => void;
    onCloseToRight?: (tab: IEditorTab, group: UniqueId) => void;
    onCloseOther?: (tab: IEditorTab, group: UniqueId) => void;
    onCloseSaved?: (group: UniqueId) => void;
    onChangeEditorProps?: (preProps: IMonacoEditorProps, nextProps: IMonacoEditorProps) => void;
    onMoveTab?: <T = any>(updateTabs: IEditorTab<T>[], group: UniqueId) => void;
    onSelectTab?: (tabId: UniqueId, group: UniqueId) => void;
    onClickActions: (action: IEditorActionsProps) => void;
    onUpdateEditorIns?: (editorInstance: any, groupId: UniqueId) => void;
    onPaneSizeChange?: (newSize: number[]) => void;
    initEditorEvents?: (editorInstance: MonacoEditor.IStandaloneCodeEditor, groupId: UniqueId) => void;
    getViewState?: (id: UniqueId) => MonacoEditor.ICodeEditorViewState;
}
export declare class EditorController extends Controller implements IEditorController {
    private editorStates;
    private readonly editorService;
    private readonly statusBarService;
    private readonly builtinService;
    private readonly layoutService;
    constructor();
    initView(): void;
    open<T>(tab: IEditorTab<any>, groupId?: UniqueId): void;
    onClickContextMenu: (e: React.MouseEvent, item: IMenuItemProps, tabItem?: IEditorTab<any> | undefined) => void;
    onCloseAll: (groupId: UniqueId) => void;
    onCloseTab: (tabId?: UniqueId | undefined, groupId?: UniqueId | undefined) => void;
    onCloseToRight: (tabItem: IEditorTab, groupId: UniqueId) => void;
    onCloseToLeft: (tabItem: IEditorTab, groupId: UniqueId) => void;
    onCloseOther: (tabItem: IEditorTab, groupId: UniqueId) => void;
    onMoveTab: (updateTabs: IEditorTab<any>[], groupId: UniqueId) => void;
    onSelectTab: (tabId: UniqueId, groupId: UniqueId) => void;
    /**
     * Called when open a new group
     */
    onUpdateEditorIns: (editorInstance: MonacoEditor.IStandaloneCodeEditor, groupId: UniqueId) => void;
    onClickActions: (action: IEditorActionsProps) => void;
    onPaneSizeChange: (newSize: number[]) => void;
    initEditorEvents(editorInstance: MonacoEditor.IStandaloneCodeEditor, groupId: UniqueId): void;
    getViewState: (id: UniqueId) => any;
    /**
     * Called when Editor props changed
     */
    onChangeEditorProps: (prevProps: IMonacoEditorProps, props: IMonacoEditorProps) => void;
    /**
     * Open a tab via instance.
     * Actually, one tab to one Model, so that
     * - the action to open a exist tab equals to switch the model in instance
     * - the action to open a new tab equals to create a new model in instance
     */
    private openTab;
    private updateStatusBar;
    updateEditorLineColumnInfo(editorInstance: MonacoEditor.IStandaloneCodeEditor): void;
    onEditorInstanceMount(editorInstance: MonacoEditor.IStandaloneCodeEditor): void;
}
