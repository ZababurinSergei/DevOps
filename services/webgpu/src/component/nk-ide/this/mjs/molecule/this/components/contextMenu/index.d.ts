import React from 'react';
import { HTMLElementType } from './../../../this/common/dom';
import { IContextView } from './../../../this/components/contextView';
export interface IContextMenuProps {
    anchor: HTMLElementType;
    render: () => React.ReactNode;
}
export interface IContextMenu extends IContextView {
}
export declare function useContextMenu(props: IContextMenuProps): IContextMenu | undefined;
