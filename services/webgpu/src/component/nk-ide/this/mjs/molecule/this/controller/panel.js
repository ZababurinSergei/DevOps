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
import React from 'react';
import { Controller } from './../../this/react/controller';
import { PanelEvent } from './../../this/model/workbench/panel';
import { BuiltinService, PanelService, } from './../../this/services';
import { MonacoService } from './../../this/monaco/monacoService';
import { QuickTogglePanelAction } from './../../this/monaco/quickTogglePanelAction';
import Output from './../../this/workbench/panel/output';
let PanelController = class PanelController extends Controller {
    constructor() {
        super();
        this.onTabChange = (key) => {
            if (key) {
                this.panelService.setActive(key);
            }
            this.emit(PanelEvent.onTabChange, key);
        };
        this.onClose = (key) => {
            if (key) {
                this.emit(PanelEvent.onTabClose, key);
            }
        };
        this.onToolbarClick = (e, item) => {
            const { PANEL_TOOLBOX_CLOSE, PANEL_TOOLBOX_RESIZE } = this.builtinService.getConstants();
            if (item.id === PANEL_TOOLBOX_CLOSE) {
                this.monacoService.commandService.executeCommand(QuickTogglePanelAction.ID);
            }
            else if (item.id === PANEL_TOOLBOX_RESIZE) {
                this.panelService.toggleMaximize();
            }
            this.emit(PanelEvent.onToolbarClick, e, item);
        };
        this.panelService = container.resolve(PanelService);
        this.monacoService = container.resolve(MonacoService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { builtInOutputPanel, builtInPanelToolbox, builtInPanelToolboxResize, } = this.builtinService.getModules();
        if (builtInOutputPanel) {
            const output = builtInOutputPanel;
            output.renderPane = (item) => (React.createElement(Output, Object.assign({ onUpdateEditorIns: (instance) => {
                    // Please notice the problem about memory out
                    // 'Cause we didn't dispose the older instance
                    item.outputEditorInstance = instance;
                } }, item)));
            this.panelService.add(output);
            this.panelService.setActive(output.id);
        }
        const toolbox = [builtInPanelToolboxResize, builtInPanelToolbox].filter(Boolean);
        this.panelService.setState({
            toolbox,
        });
    }
};
PanelController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], PanelController);
export { PanelController };
