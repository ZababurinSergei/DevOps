/// <reference types="react" />
import { ITabProps } from './../../../this/components/tabs/tab';
import { ITabsProps } from './../../../this/components/tabs';
import { IMenuItemProps } from './../../../this/components/menu';
import { IBreadcrumbItemProps } from './../../../this/components/breadcrumb';
import { editor as MonacoEditor } from 'monaco-editor';
import type { UniqueId } from './../../../this/common/types';
export declare enum EditorEvent {
    OnCloseTab = "editor.closeTab",
    OnCloseAll = "editor.closeAll",
    OnCloseOther = "editor.closeOther",
    OnCloseToLeft = "editor.closeToLeft",
    OnCloseToRight = "editor.closeToRight",
    OnMoveTab = "editor.moveTab",
    OpenTab = "editor.openTab",
    OnSelectTab = "editor.selectTab",
    OnUpdateTab = "editor.updateTab",
    onActionsClick = "editor.actionsClick",
    OnSplitEditorRight = "editor.splitEditorRight",
    onEditorInstanceMount = "editor.onEditorInstanceMount"
}
export interface BuiltInEditorTabDataType {
    language?: string | undefined;
    path?: string;
    value?: string;
    modified?: boolean;
    [key: string]: any;
}
export declare type IEditorOptions = MonacoEditor.IEditorOptions & MonacoEditor.IGlobalEditorOptions;
export interface IEditorActionsProps extends IMenuItemProps {
    id: UniqueId;
    /**
     * Mark the action placed in More menus or outer
     */
    place?: 'outer' | 'inner';
}
export interface IEditorTab<T = BuiltInEditorTabDataType> extends ITabProps<T> {
    breadcrumb?: IBreadcrumbItemProps[];
}
export interface IEditorAction {
    actions?: IEditorActionsProps[];
    menu?: IMenuItemProps[];
}
export interface IEditorGroup<E = any, T = any> extends ITabsProps {
    id: UniqueId;
    /**
     * Current editor group tab
     */
    tab?: IEditorTab<T>;
    actions?: IEditorActionsProps[];
    menu?: IMenuItemProps[];
    editorInstance?: E;
}
export interface IEditor {
    /**
     * Current editor group
     */
    current?: IEditorGroup | null;
    /**
     * Editor Groups
     */
    groups?: IEditorGroup[];
    /**
     * The welcome page of editor bench
     */
    entry?: React.ReactNode;
    /**
     * Built-in editor options, there is main apply it to monaco-editor
     */
    editorOptions?: IEditorOptions;
}
export declare class EditorGroupModel<E = any, T = any> implements IEditorGroup<E, T> {
    id: UniqueId;
    tab: IEditorTab<T>;
    data: IEditorTab<T>[];
    actions: IEditorActionsProps[];
    menu: IMenuItemProps[];
    editorInstance: E | undefined;
    activeTab: UniqueId | undefined;
    constructor(id: UniqueId, tab: IEditorTab<T>, activeTab: UniqueId | undefined, data: IEditorTab<T>[], actions?: IEditorActionsProps[], menu?: IMenuItemProps[], editorInstance?: E);
}
export declare class EditorModel implements IEditor {
    current: IEditorGroup | null;
    groups: IEditorGroup[];
    entry: React.ReactNode;
    editorOptions: IEditorOptions;
    constructor(current: IEditorGroup<any, any> | null | undefined, groups: IEditorGroup<any, any>[] | undefined, entry: React.ReactNode, editorOptions?: IEditorOptions);
}
