import React from 'react';
import 'reflect-metadata';
import type { ITreeNodeItemProps } from './../../../../this/components/tree';
import type { IMenuItemProps } from './../../../../this/components/menu';
import type { UniqueId } from './../../../../this/common/types';
export declare enum FileTypes {
    File = "File",
    Folder = "Folder",
    RootFolder = "RootFolder"
}
export declare type FileType = keyof typeof FileTypes;
export declare enum FolderTreeEvent {
    onSelectFile = "folderTree.onSelectFile",
    onDelete = "folderTree.onDelete",
    onRename = "folderTree.onRename",
    onUpdateFileName = "folderTree.onUpdateFileName",
    onRightClick = "folderTree.onRightClick",
    onContextMenuClick = "folderTree.onContextMenuClick",
    onCreate = "folderTree.onCreate",
    onLoadData = "folderTree.onLoadData",
    onDrop = "folderTree.onDrop",
    onExpandKeys = "folderTree.onExpandKeys"
}
export interface IFolderInputEvent {
    onFocus: () => void;
    setValue: (value: string) => void;
}
export interface IFolderTreeSubItem {
    data?: IFolderTreeNodeProps[];
    contextMenu?: IMenuItemProps[];
    folderPanelContextMenu?: IMenuItemProps[];
    current?: IFolderTreeNodeProps | null;
    expandKeys?: UniqueId[];
    loadedKeys?: string[];
}
export interface IFolderTree {
    folderTree?: IFolderTreeSubItem;
    entry?: React.ReactNode;
    autoSort?: Boolean;
}
export interface IFolderTreeNodeProps extends ITreeNodeItemProps<any> {
    location?: string;
    content?: string;
    fileType?: FileType;
    children?: IFolderTreeNodeProps[];
}
export declare class TreeNodeModel implements IFolderTreeNodeProps {
    id: UniqueId;
    name?: string;
    location?: string;
    isLeaf?: boolean;
    fileType: FileType;
    children?: IFolderTreeNodeProps[];
    icon?: string | JSX.Element;
    isEditable?: boolean;
    content?: string;
    data?: any;
    constructor(props: IFolderTreeNodeProps);
}
export declare class IFolderTreeModel implements IFolderTree {
    folderTree: IFolderTreeSubItem;
    entry: React.ReactNode;
    autoSort: Boolean;
    constructor(folderTree?: IFolderTreeSubItem, autoSort?: Boolean, entry?: React.ReactNode);
}
