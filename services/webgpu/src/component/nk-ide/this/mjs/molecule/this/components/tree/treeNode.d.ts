import React from 'react';
import { ITreeNodeItemProps } from '.';
interface ITreeNodeProps {
    data: ITreeNodeItemProps;
    indent: number;
    name?: string;
    className?: string;
    draggable?: boolean;
    renderIcon: () => JSX.Element | null;
    renderTitle: () => React.ReactNode;
    onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onNodeDragStart?: (e: React.DragEvent<HTMLDivElement>, node: ITreeNodeItemProps) => void;
    onNodeDragEnter?: (e: React.DragEvent<HTMLDivElement>, node: ITreeNodeItemProps) => void;
    onNodeDragOver?: (e: React.DragEvent<HTMLDivElement>, node: ITreeNodeItemProps) => void;
    onNodeDragEnd?: (e: React.DragEvent<HTMLDivElement>, node: ITreeNodeItemProps) => void;
    onNodeDrop?: (e: React.DragEvent<HTMLDivElement>, node: ITreeNodeItemProps) => void;
}
declare const _default: ({ data, indent, className, name, renderIcon, renderTitle, draggable, onContextMenu, onClick, onNodeDragStart, onNodeDragEnter, onNodeDragOver, onNodeDrop, onNodeDragEnd, }: ITreeNodeProps) => React.JSX.Element;
export default _default;
