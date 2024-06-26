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
import React from 'react';
import { Controller } from './../../../this/react/controller';
import { container, singleton } from 'tsyringe';
import { connect } from './../../../this/react';
import { Explorer, FolderTreeView } from './../../../this/workbench/sidebar/explore';
import { ExplorerEvent, } from './../../../this/model/workbench/explorer/explorer';
import { FileTypes, EditorTreeEvent } from './../../../this/model';
import { ActivityBarService, SidebarService, ExplorerService, BuiltinService, } from './../../../this/services';
import { FolderTreeController } from './folderTree';
let ExplorerController = class ExplorerController extends Controller {
    constructor() {
        super();
        this.onClick = (event, item) => {
            this.emit(ExplorerEvent.onClick, event, item);
        };
        this.onActionsContextMenuClick = (e, item) => {
            const panelId = item === null || item === void 0 ? void 0 : item.id;
            if (panelId) {
                this.explorerService.togglePanel(panelId);
            }
        };
        this.onCollapseChange = (keys) => {
            this.emit(ExplorerEvent.onCollapseChange, keys);
        };
        this.onToolbarClick = (item, parentPanel) => {
            var _a, _b, _c, _d;
            const toolbarId = item.id;
            const { NEW_FILE_COMMAND_ID, NEW_FOLDER_COMMAND_ID, REMOVE_COMMAND_ID, COLLAPSE_COMMAND_ID, EXPLORER_TOGGLE_CLOSE_ALL_EDITORS, EXPLORER_TOGGLE_SAVE_ALL, EXPLORER_TOGGLE_VERTICAL, } = this.builtinService.getConstants();
            switch (toolbarId) {
                case NEW_FILE_COMMAND_ID: {
                    (_b = (_a = this.folderTreeController).createTreeNode) === null || _b === void 0 ? void 0 : _b.call(_a, FileTypes.File);
                    break;
                }
                case NEW_FOLDER_COMMAND_ID: {
                    (_d = (_c = this.folderTreeController).createTreeNode) === null || _d === void 0 ? void 0 : _d.call(_c, FileTypes.Folder);
                    break;
                }
                case REMOVE_COMMAND_ID: {
                    this.emit(ExplorerEvent.onRemovePanel, parentPanel);
                    break;
                }
                case COLLAPSE_COMMAND_ID: {
                    this.emit(ExplorerEvent.onCollapseAllFolders);
                    break;
                }
                case EXPLORER_TOGGLE_CLOSE_ALL_EDITORS: {
                    this.emit(EditorTreeEvent.onCloseAll);
                    break;
                }
                case EXPLORER_TOGGLE_SAVE_ALL: {
                    this.emit(EditorTreeEvent.onSaveAll);
                    break;
                }
                case EXPLORER_TOGGLE_VERTICAL: {
                    this.emit(EditorTreeEvent.onSplitEditorLayout);
                    break;
                }
                default:
                    this.emit(ExplorerEvent.onPanelToolbarClick, parentPanel, toolbarId);
            }
        };
        this.renderFolderTree = (panel) => {
            return React.createElement(FolderTreeView, { panel: panel });
        };
        this.activityBarService = container.resolve(ActivityBarService);
        this.sidebarService = container.resolve(SidebarService);
        this.explorerService = container.resolve(ExplorerService);
        this.folderTreeController = container.resolve(FolderTreeController);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const explorerEvent = {
            onClick: this.onClick,
            onCollapseChange: this.onCollapseChange,
            onActionsContextMenuClick: this.onActionsContextMenuClick,
            onToolbarClick: this.onToolbarClick,
        };
        const ExplorerView = connect(this.explorerService, Explorer);
        const id = this.builtinService.getConstants().EXPLORER_ACTIVITY_ITEM;
        if (!id)
            return;
        const explorePane = {
            id,
            title: 'EXPLORER',
            render() {
                return React.createElement(ExplorerView, Object.assign({}, explorerEvent));
            },
        };
        const { builtInExplorerActivityItem, builtInExplorerFolderPanel, builtInExplorerHeaderToolbar, } = this.builtinService.getModules();
        if (builtInExplorerHeaderToolbar) {
            this.explorerService.setState({
                headerToolBar: builtInExplorerHeaderToolbar,
            });
        }
        if (builtInExplorerActivityItem && builtInExplorerFolderPanel) {
            this.activityBarService.add(builtInExplorerActivityItem, true);
            this.sidebarService.add(explorePane, true);
            // add folder panel
            this.explorerService.addPanel(Object.assign(Object.assign({}, builtInExplorerFolderPanel), { renderPanel: this.renderFolderTree }));
        }
    }
};
ExplorerController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ExplorerController);
export { ExplorerController };
