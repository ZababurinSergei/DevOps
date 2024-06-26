import React from 'react';
import { IEditorGroup } from './../../../this/model';
import type { UniqueId } from './../../../this/common/types';
export interface ITabEvent {
    onDrag?: (source: ITabProps, target: ITabProps, dragInfos: Record<string, any>) => void;
    onCloseTab?: (key: UniqueId) => void;
    onSelectTab?: (key: UniqueId) => void;
    onContextMenu?: <T = any>(event: React.MouseEvent, tab: ITabProps<T>) => void;
}
declare type ITabStatus = 'edited';
/**
 * The type definition for the Tab data construct
 */
export interface ITabProps<T = any, P = any> {
    /**
     * @deprecated Tab doesn't need this property, but the type extends from tab need
     */
    active?: boolean;
    /**
     * Mark the tab status to be closable,
     * Default is true
     */
    closable?: boolean;
    /**
     * Mark the tab status to be editing
     */
    editable?: boolean;
    status?: ITabStatus | ((tab: ITabProps) => JSX.Element);
    icon?: string | JSX.Element;
    id: UniqueId;
    name?: string;
    renderPane?: ((item: P, tab?: ITabProps, group?: IEditorGroup) => React.ReactNode) | React.ReactNode;
    data?: T;
}
export declare const tabClassName: string;
export declare const tabItemClassName: string;
export declare const tabItemActiveClassName: string;
export declare const tabItemLabelClassName: string;
export declare const tabItemExtraClassName: string;
/**
 * The type definition for The Tab Component
 */
export declare type ITabComponent = {
    tab: ITabProps;
    active?: boolean;
} & ITabEvent;
export declare function Tab({ tab, active, ...restEvents }: ITabComponent): React.JSX.Element;
export {};
