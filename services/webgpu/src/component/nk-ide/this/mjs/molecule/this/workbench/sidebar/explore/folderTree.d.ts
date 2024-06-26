import 'reflect-metadata';
import React from 'react';
import { IFolderTree } from './../../../../this/model';
import type { IFolderTreeController } from './../../../../this/controller/explorer/folderTree';
import { ICollapseItem } from './../../../../this/components/collapse';
export interface IFolderTreeProps extends IFolderTreeController, IFolderTree {
    panel: ICollapseItem;
}
declare const _default: React.NamedExoticComponent<IFolderTreeProps>;
export default _default;
