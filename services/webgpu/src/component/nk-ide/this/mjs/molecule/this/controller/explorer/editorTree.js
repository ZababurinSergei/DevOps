var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import 'reflect-metadata';
import React from 'react';
import { Controller } from './../../../this/react/controller';
import { container, singleton } from 'tsyringe';
import { EditorTreeEvent } from './../../../this/model/workbench/explorer/editorTree';
import { BuiltinService, EditorService, ExplorerService, } from './../../../this/services';
import { EditorTree, } from './../../../this/workbench/sidebar/explore/editorTree';
import { connect } from './../../../this/react';
let EditorTreeController = class EditorTreeController extends Controller {
    constructor() {
        super();
        this.onContextMenu = (menu, groupId, file) => {
            const { EDITOR_MENU_CLOSE, EDITOR_MENU_CLOSE_OTHERS, EDITOR_MENU_CLOSE_SAVED, EDITOR_MENU_CLOSE_ALL, } = this.builtinService.getConstants();
            switch (menu.id) {
                case EDITOR_MENU_CLOSE:
                    this.onClose(file === null || file === void 0 ? void 0 : file.id, groupId);
                    break;
                case EDITOR_MENU_CLOSE_OTHERS:
                    this.emit(EditorTreeEvent.onCloseOthers, file, groupId);
                    break;
                case EDITOR_MENU_CLOSE_SAVED:
                    this.emit(EditorTreeEvent.onCloseSaved, groupId);
                    break;
                case EDITOR_MENU_CLOSE_ALL:
                    this.emit(EditorTreeEvent.onCloseAll, groupId);
                    break;
                default:
                    this.emit(EditorTreeEvent.onContextMenu, menu, file, groupId);
                    break;
            }
        };
        this.onClose = (tabId, groupId) => {
            this.emit(EditorTreeEvent.onClose, tabId, groupId);
        };
        this.onSelect = (tabId, groupId) => {
            this.emit(EditorTreeEvent.onSelect, tabId, groupId);
        };
        this.onCloseGroup = (groupId) => {
            this.emit(EditorTreeEvent.onCloseAll, groupId);
        };
        this.onSaveGroup = (groupId) => {
            this.emit(EditorTreeEvent.onSaveAll, groupId);
        };
        this.onToolbarClick = (toolbar, groupId) => {
            this.emit(EditorTreeEvent.onToolbarClick, toolbar, groupId);
        };
        this.editService = container.resolve(EditorService);
        this.explorerService = container.resolve(ExplorerService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const EditorTreeView = connect(this.editService, EditorTree);
        const { builtInExplorerEditorPanel, builtInEditorTreeContextMenu, builtInEditorTreeHeaderContextMenu, } = this.builtinService.getModules();
        if (builtInExplorerEditorPanel) {
            const { groupToolbar } = builtInExplorerEditorPanel, restEditor = __rest(builtInExplorerEditorPanel, ["groupToolbar"]);
            const contextMenu = builtInEditorTreeContextMenu || [];
            const headerContextMenu = builtInEditorTreeHeaderContextMenu || [];
            this.explorerService.addPanel(Object.assign(Object.assign({}, restEditor), { renderPanel: (panel) => (React.createElement(EditorTreeView, { panel: panel, contextMenu: contextMenu, headerContextMenu: headerContextMenu, groupToolbar: groupToolbar, onClose: this.onClose, onSelect: this.onSelect, onCloseGroup: this.onCloseGroup, onSaveGroup: this.onSaveGroup, onContextMenu: this.onContextMenu, onToolbarClick: this.onToolbarClick })) }));
        }
    }
};
EditorTreeController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], EditorTreeController);
export { EditorTreeController };
