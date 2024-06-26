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
import { Float, ProblemsEvent, } from './../../this/model';
import { Controller } from './../../this/react/controller';
import { PanelService, StatusBarService, LayoutService, ProblemsService, BuiltinService, } from './../../this/services';
import { singleton, container } from 'tsyringe';
import { MonacoService } from './../../this/monaco/monacoService';
import { QuickTogglePanelAction } from './../../this/monaco/quickTogglePanelAction';
import { ProblemsPaneView, ProblemsStatusBarView } from './../../this/workbench/problems';
import { connect } from './../../this/react';
let ProblemsController = class ProblemsController extends Controller {
    constructor() {
        super();
        this.onClick = (e, item) => {
            this.showHideProblems();
        };
        this.onSelect = (node) => {
            this.emit(ProblemsEvent.onSelect, node);
        };
        this.panelService = container.resolve(PanelService);
        this.statusBarService = container.resolve(StatusBarService);
        this.monacoService = container.resolve(MonacoService);
        this.layoutService = container.resolve(LayoutService);
        this.problemsService = container.resolve(ProblemsService);
        this.builtinService = container.resolve(BuiltinService);
    }
    showHideProblems() {
        const { panel } = this.layoutService.getState();
        const { current } = this.panelService.getState();
        const { builtInPanelProblems } = this.builtinService.getModules();
        if (builtInPanelProblems) {
            if (panel.hidden || (current === null || current === void 0 ? void 0 : current.id) === builtInPanelProblems.id) {
                this.monacoService.commandService.executeCommand(QuickTogglePanelAction.ID);
            }
            this.panelService.open(builtInPanelProblems);
        }
    }
    initView() {
        const { builtInStatusProblems: statusProblems, builtInPanelProblems } = this.builtinService.getModules();
        if (statusProblems) {
            statusProblems.render = (item) => (React.createElement(ProblemsStatusBarView, Object.assign({}, item)));
            statusProblems.onClick = this.onClick;
            this.statusBarService.add(statusProblems, Float.left);
        }
        if (builtInPanelProblems) {
            // keep ProblemsPaneView updated to problems' state
            const ProblemsView = connect(this.problemsService, ProblemsPaneView);
            const problemsPanel = builtInPanelProblems;
            problemsPanel.renderPane = () => (React.createElement(ProblemsView, { onSelect: this.onSelect }));
            this.panelService.add(problemsPanel);
            this.panelService.setActive(problemsPanel.id);
        }
        const { PROBLEM_MODEL_ID, PROBLEM_MODEL_NAME } = this.builtinService.getConstants();
        this.problemsService.setState({
            id: PROBLEM_MODEL_ID,
            name: PROBLEM_MODEL_NAME,
        });
    }
};
ProblemsController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ProblemsController);
export { ProblemsController };
