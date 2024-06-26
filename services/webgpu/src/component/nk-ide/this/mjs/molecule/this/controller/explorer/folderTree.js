var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import cloneDeep from 'lodash/cloneDeep';
import { Controller } from './../../../this/react/controller';
import { FolderTreeEvent, FileTypes, } from './../../../this/model';
import { BuiltinService, FolderTreeService, } from './../../../this/services';
let FolderTreeController = class FolderTreeController extends Controller {
    constructor() {
        super();
        this.getContextMenu = (treeNode) => {
            var _a;
            const menus = cloneDeep(((_a = this.folderTreeService.getState().folderTree) === null || _a === void 0 ? void 0 : _a.contextMenu) || []);
            const fileContextMenu = this.folderTreeService.getFileContextMenu();
            const folderContextMenu = this.folderTreeService.getFolderContextMenu();
            const { ROOT_FOLDER_CONTEXT_MENU } = this.builtinService.getModules();
            switch (treeNode.fileType) {
                case FileTypes.File: {
                    menus.unshift(...fileContextMenu);
                    break;
                }
                case FileTypes.Folder: {
                    menus.unshift(...folderContextMenu);
                    break;
                }
                case FileTypes.RootFolder: {
                    // In general, root folder have no contextMenu, because it can't be clicked
                    return folderContextMenu.concat(ROOT_FOLDER_CONTEXT_MENU || []);
                }
                default:
                    break;
            }
            return menus;
        };
        this.createTreeNode = (type, id) => {
            var _a;
            if (typeof id === 'undefined') {
                const folderTreeState = this.folderTreeService.getState();
                const { data, current } = (folderTreeState === null || folderTreeState === void 0 ? void 0 : folderTreeState.folderTree) || {};
                // The current selected node id or the first root node
                const nodeId = typeof (current === null || current === void 0 ? void 0 : current.id) === 'undefined'
                    ? (_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a.id
                    : current === null || current === void 0 ? void 0 : current.id;
                this.emit(FolderTreeEvent.onCreate, type, nodeId);
            }
            else {
                this.emit(FolderTreeEvent.onCreate, type, id);
            }
        };
        this.onClickContextMenu = (contextMenu, treeNode) => {
            const menuId = contextMenu.id;
            const { RENAME_COMMAND_ID, DELETE_COMMAND_ID, NEW_FILE_COMMAND_ID, NEW_FOLDER_COMMAND_ID, OPEN_TO_SIDE_COMMAND_ID, } = this.builtinService.getConstants();
            switch (menuId) {
                case RENAME_COMMAND_ID: {
                    const { id: nodeId } = treeNode;
                    this.onRename(nodeId);
                    break;
                }
                case DELETE_COMMAND_ID: {
                    const { id: nodeId } = treeNode;
                    this.onDelete(nodeId);
                    break;
                }
                case NEW_FILE_COMMAND_ID: {
                    const { id } = treeNode;
                    this.createTreeNode(FileTypes.File, id);
                    break;
                }
                case NEW_FOLDER_COMMAND_ID: {
                    const { id } = treeNode;
                    this.createTreeNode(FileTypes.Folder, id);
                    break;
                }
                case OPEN_TO_SIDE_COMMAND_ID: {
                    this.onSelectFile(treeNode);
                    break;
                }
                default: {
                    this.onContextMenuClick(contextMenu, treeNode);
                }
            }
        };
        this.onRightClick = (treeNode) => {
            const menus = this.getContextMenu(treeNode);
            this.emit(FolderTreeEvent.onRightClick, treeNode, menus);
            return menus;
        };
        this.onDropTree = (source, target) => {
            this.emit(FolderTreeEvent.onDrop, source, target);
        };
        this.onUpdateFileName = (file) => {
            this.emit(FolderTreeEvent.onUpdateFileName, file);
        };
        this.onSelectFile = (file) => {
            this.folderTreeService.setActive(file === null || file === void 0 ? void 0 : file.id);
            // editing file won't emit onSelectFile
            if (file && !file.isEditable && file.fileType === FileTypes.File) {
                this.emit(FolderTreeEvent.onSelectFile, file);
            }
        };
        this.onContextMenuClick = (contextMenu, treeNode) => {
            this.emit(FolderTreeEvent.onContextMenuClick, contextMenu, treeNode);
        };
        this.onRename = (id) => {
            this.emit(FolderTreeEvent.onRename, id);
        };
        this.onDelete = (id) => {
            this.emit(FolderTreeEvent.onDelete, id);
        };
        this.onLoadData = (treeNode) => {
            const count = this.count(FolderTreeEvent.onLoadData);
            if (count) {
                // define current treeNode to be loaded
                this.folderTreeService.setLoadedKeys([
                    ...this.folderTreeService.getLoadedKeys(),
                    treeNode.id.toString(),
                ]);
                return new Promise((resolve, reject) => {
                    const callback = (node) => {
                        this.folderTreeService.update(node);
                        resolve();
                    };
                    this.emit(FolderTreeEvent.onLoadData, treeNode, callback);
                });
            }
            else {
                return Promise.resolve();
            }
        };
        this.onExpandKeys = (expandedKeys) => {
            this.emit(FolderTreeEvent.onExpandKeys, expandedKeys);
        };
        this.folderTreeService = container.resolve(FolderTreeService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { FILE_CONTEXT_MENU, BASE_CONTEXT_MENU, COMMON_CONTEXT_MENU, FOLDER_PANEL_CONTEXT_MENU, } = this.builtinService.getModules();
        if (FILE_CONTEXT_MENU) {
            this.folderTreeService.setFileContextMenu(FILE_CONTEXT_MENU);
        }
        if (BASE_CONTEXT_MENU) {
            this.folderTreeService.setFolderContextMenu(BASE_CONTEXT_MENU);
        }
        this.folderTreeService.setState({
            folderTree: {
                contextMenu: COMMON_CONTEXT_MENU || [],
                current: null,
                folderPanelContextMenu: FOLDER_PANEL_CONTEXT_MENU || [],
                data: [],
                expandKeys: [],
            },
        });
    }
};
FolderTreeController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], FolderTreeController);
export { FolderTreeController };
