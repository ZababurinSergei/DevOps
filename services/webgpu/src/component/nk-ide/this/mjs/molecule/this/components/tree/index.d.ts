import React from 'react';
import type { UniqueId } from './../../../this/common/types';
export interface ITreeNodeItemProps<T = any> {
    /**
     * The unique id in tree node
     * @aware Please be aware of that id should be global unique
     */
    id: UniqueId;
    /**
     * The name of this tree node
     */
    name?: string;
    /**
     * The icon of this tree node, which is rendered in front of the name
     */
    icon?: string | JSX.Element;
    /**
     * The status of disabled
     */
    disabled?: boolean;
    /**
     * The type of this tree node.
     */
    isLeaf?: boolean;
    /**
     * The status of editable, mark whether the node is being edited
     */
    isEditable?: boolean;
    /**
     * The children of this tree node
     */
    children?: ITreeNodeItemProps[];
    /**
     * Store the custom data
     */
    data?: T;
    [key: string]: any;
}
export interface ITreeProps {
    data?: ITreeNodeItemProps[];
    className?: string;
    draggable?: boolean;
    expandKeys?: UniqueId[];
    loadedKeys?: string[];
    activeKey?: UniqueId;
    onExpand?: (expandedKeys: UniqueId[], node: ITreeNodeItemProps) => void;
    onSelect?: (node: ITreeNodeItemProps, isUpdate?: any) => void;
    onTreeClick?: () => void;
    renderTitle?: (node: ITreeNodeItemProps, index: number, isLeaf: boolean) => JSX.Element | string;
    onDropTree?(source: ITreeNodeItemProps, target: ITreeNodeItemProps): void;
    onLoadData?: (node: ITreeNodeItemProps) => Promise<void>;
    onRightClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: ITreeNodeItemProps) => void;
}
declare const TreeView: ({ className, data, draggable, loadedKeys, expandKeys: controlExpandKeys, activeKey: controlActiveKey, onExpand, onDropTree, onRightClick, renderTitle, onSelect, onLoadData, onTreeClick, }: ITreeProps) => React.JSX.Element;
export default TreeView;
