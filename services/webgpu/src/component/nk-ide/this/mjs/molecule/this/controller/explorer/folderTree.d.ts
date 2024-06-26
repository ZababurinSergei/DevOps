import 'reflect-metadata';
import { Controller } from './../../../this/react/controller';
import { IMenuItemProps } from './../../../this/components/menu';
import { FileType, IFolderTreeNodeProps } from './../../../this/model';
import type { UniqueId } from './../../../this/common/types';
export interface IFolderTreeController extends Partial<Controller> {
    readonly createTreeNode?: (type: FileType, id?: UniqueId) => void;
    readonly onClickContextMenu?: (contextMenu: IMenuItemProps, treeNode?: IFolderTreeNodeProps) => void;
    readonly onUpdateFileName?: (file: IFolderTreeNodeProps) => void;
    readonly onSelectFile?: (file?: IFolderTreeNodeProps) => void;
    readonly onDropTree?: (source: IFolderTreeNodeProps, target: IFolderTreeNodeProps) => void;
    readonly onLoadData?: (treeNode: IFolderTreeNodeProps) => Promise<void>;
    readonly onExpandKeys?: (expandKeys: UniqueId[]) => void;
    readonly onRightClick?: (treeNode: IFolderTreeNodeProps) => IMenuItemProps[];
}
export declare class FolderTreeController extends Controller implements IFolderTreeController {
    private readonly folderTreeService;
    private readonly builtinService;
    constructor();
    private getContextMenu;
    initView(): void;
    createTreeNode: (type: FileType, id?: UniqueId | undefined) => void;
    readonly onClickContextMenu: (contextMenu: IMenuItemProps, treeNode?: IFolderTreeNodeProps | undefined) => void;
    onRightClick: (treeNode: IFolderTreeNodeProps) => IMenuItemProps[];
    readonly onDropTree: (source: IFolderTreeNodeProps, target: IFolderTreeNodeProps) => void;
    onUpdateFileName: (file: IFolderTreeNodeProps) => void;
    readonly onSelectFile: (file?: IFolderTreeNodeProps | undefined) => void;
    private onContextMenuClick;
    private onRename;
    private onDelete;
    onLoadData: (treeNode: IFolderTreeNodeProps) => Promise<void>;
    onExpandKeys: (expandedKeys: UniqueId[]) => void;
}
