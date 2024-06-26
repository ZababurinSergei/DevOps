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
import { StatusBarEvent } from './../../this/model';
import { Controller } from './../../this/react/controller';
import { MenuBarController } from './../../this/controller';
import { container, singleton } from 'tsyringe';
import { BuiltinService, StatusBarService, } from './../../this/services';
import { EditorStatusBarView } from './../../this/workbench/editor';
import { cloneDeep } from 'lodash';
let StatusBarController = class StatusBarController extends Controller {
    constructor() {
        super();
        this.onClick = (e, item) => {
            this.emit(StatusBarEvent.onClick, e, item);
        };
        this.onContextMenuClick = (e, item) => {
            const menuId = item === null || item === void 0 ? void 0 : item.id;
            const { STATUS_BAR_HIDE_ID } = this.builtinService.getConstants();
            switch (menuId) {
                case STATUS_BAR_HIDE_ID:
                    this.menuBarController.updateStatusBar();
                    break;
            }
        };
        this.menuBarController = container.resolve(MenuBarController);
        this.statusBarService = container.resolve(StatusBarService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { STATUS_EDITOR_INFO, CONTEXT_MENU_HIDE_STATUS_BAR } = this.builtinService.getModules();
        const nextRightItems = cloneDeep(this.statusBarService.getState().rightItems);
        const nextContextMenu = cloneDeep(this.statusBarService.getState().contextMenu || []);
        if (STATUS_EDITOR_INFO) {
            nextRightItems.push(Object.assign(Object.assign({}, STATUS_EDITOR_INFO), { render: (item) => (React.createElement(EditorStatusBarView, Object.assign({}, item))) }));
        }
        if (CONTEXT_MENU_HIDE_STATUS_BAR) {
            nextContextMenu.push(CONTEXT_MENU_HIDE_STATUS_BAR);
        }
        this.statusBarService.setState({
            rightItems: nextRightItems,
            contextMenu: nextContextMenu,
        });
    }
};
StatusBarController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], StatusBarController);
export { StatusBarController };
