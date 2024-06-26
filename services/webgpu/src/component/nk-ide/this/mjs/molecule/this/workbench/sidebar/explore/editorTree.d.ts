import React from 'react';
import { IEditorTreeController } from './../../../../this/controller';
import { IEditor, IEditorGroup } from './../../../../this/model';
import { IActionBarItemProps, IMenuItemProps, ITabProps } from './../../../../this/components';
import { ICollapseItem } from './../../../../this/components/collapse';
import type { UniqueId } from './../../../../this/common/types';
declare type UnionEditor = Omit<IEditor & IEditorTreeController, 'onContextMenu' | 'initView'>;
export interface IOpenEditProps extends UnionEditor {
    /**
     * Group Header toolbar
     */
    groupToolbar?: IActionBarItemProps<IEditorGroup>[];
    /**
     * Item context menus
     */
    contextMenu?: IMenuItemProps[];
    /**
     * Group Header context menus
     * It'll use the value of contextMenu if specify contextMenu but not specify headerContextMenu
     */
    headerContextMenu?: IMenuItemProps[];
    onContextMenu?: (menu: IMenuItemProps, groupId: UniqueId, file?: ITabProps) => void;
    panel: ICollapseItem;
}
declare const EditorTree: (props: IOpenEditProps) => React.JSX.Element | null;
export { EditorTree };
