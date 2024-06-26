import 'reflect-metadata';
import { Controller } from './../../../this/react/controller';
import { IActionBarItemProps, IMenuItemProps, ITabProps } from './../../../this/components';
import type { UniqueId } from './../../../this/common/types';
export interface IEditorTreeController extends Partial<Controller> {
    readonly onClose?: (tabId: UniqueId, groupId: UniqueId) => void;
    readonly onSelect?: (tabId: UniqueId, groupId: UniqueId) => void;
    readonly onCloseGroup?: (groupId: UniqueId) => void;
    readonly onSaveGroup?: (groupId: UniqueId) => void;
    readonly onToolbarClick?: (toolbar: IActionBarItemProps, groupId: UniqueId) => void;
    /**
     * Trigger by context menu click event
     * When click the context menu from group header, it doesn't have file info
     */
    readonly onContextMenu?: (menu: IMenuItemProps, groupId: UniqueId, file?: ITabProps) => void;
}
export declare class EditorTreeController extends Controller implements IEditorTreeController {
    private readonly explorerService;
    private readonly editService;
    private readonly builtinService;
    constructor();
    initView(): void;
    onContextMenu: (menu: IMenuItemProps, groupId: UniqueId, file?: ITabProps<any, any> | undefined) => void;
    onClose: (tabId: UniqueId, groupId: UniqueId) => void;
    onSelect: (tabId: UniqueId, groupId: UniqueId) => void;
    onCloseGroup: (groupId: UniqueId) => void;
    onSaveGroup: (groupId: UniqueId) => void;
    onToolbarClick: (toolbar: IActionBarItemProps, groupId: UniqueId) => void;
}
