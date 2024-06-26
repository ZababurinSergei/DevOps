var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { container, singleton } from 'tsyringe';
import { Component } from './../../../this/react';
import { ID_APP } from './../../../this/common/id';
import { Position, LayoutModel, MenuBarMode, LayoutEvents, } from './../../../this/model/workbench/layout';
import { MenuBarEvent } from './../../../this/model/workbench/menuBar';
let LayoutService = class LayoutService extends Component {
    constructor() {
        super();
        this.state = container.resolve(LayoutModel);
    }
    onWorkbenchDidMount(callback) {
        this.subscribe(LayoutEvents.OnWorkbenchDidMount, callback);
    }
    get container() {
        // Make sure to get the latest dom element.
        this._container = document.getElementById(ID_APP) || document.body;
        return this._container;
    }
    toggleMenuBarVisibility() {
        const { menuBar } = this.state;
        const wasHidden = menuBar.hidden;
        this.setState({ menuBar: Object.assign(Object.assign({}, menuBar), { hidden: !wasHidden }) });
        return !wasHidden;
    }
    togglePanelVisibility() {
        const { panel } = this.state;
        const wasHidden = panel.hidden;
        this.setState({ panel: Object.assign(Object.assign({}, panel), { hidden: !wasHidden }) });
        return !wasHidden;
    }
    toggleSidebarVisibility() {
        const { sidebar } = this.state;
        const wasHidden = sidebar.hidden;
        this.setState({ sidebar: Object.assign(Object.assign({}, sidebar), { hidden: !wasHidden }) });
        return !wasHidden;
    }
    toggleActivityBarVisibility() {
        const { activityBar } = this.state;
        const wasHidden = activityBar.hidden;
        this.setState({ activityBar: Object.assign(Object.assign({}, activityBar), { hidden: !wasHidden }) });
        return !wasHidden;
    }
    toggleStatusBarVisibility() {
        const { statusBar } = this.state;
        const wasHidden = statusBar.hidden;
        this.setState({ statusBar: Object.assign(Object.assign({}, statusBar), { hidden: !wasHidden }) });
        return !wasHidden;
    }
    setSideBarPosition(position) {
        const { sidebar } = this.state;
        const { position: prePos } = sidebar;
        if (prePos !== position) {
            this.setState({
                sidebar: { position: position, hidden: false },
            });
        }
    }
    togglePanelMaximized() {
        const panelViewState = this.state.panel;
        this.setState({
            panel: Object.assign(Object.assign({}, panelViewState), { panelMaximized: !panelViewState.panelMaximized }),
        });
        return !panelViewState.panelMaximized;
    }
    setPaneSize(splitPanePos) {
        this.setState({ splitPanePos });
    }
    setHorizontalPaneSize(horizontalSplitPanePos) {
        this.setState({ horizontalSplitPanePos });
    }
    setGroupSplitSize(groupSplitPos) {
        this.setState({
            groupSplitPos,
        });
    }
    setMenuBarMode(mode) {
        const { menuBar } = this.state;
        const { mode: preMode } = menuBar;
        if (preMode !== mode) {
            this.setState({ menuBar: Object.assign(Object.assign({}, menuBar), { mode, hidden: false }) });
            this.emit(MenuBarEvent.onChangeMode, mode);
        }
    }
    getMenuBarMode() {
        const { menuBar } = this.state;
        return menuBar.mode;
    }
    setEditorGroupDirection(direction) {
        if (typeof direction === 'function') {
            this.setState({
                editorGroupDirection: direction(this.state.editorGroupDirection),
            });
        }
        else {
            this.setState({
                editorGroupDirection: direction,
            });
        }
    }
    setAuxiliaryBar(hidden) {
        if (typeof hidden === 'boolean') {
            this.setState({
                auxiliaryBar: { hidden },
            });
            return hidden;
        }
        const nextHidden = hidden(this.state.auxiliaryBar.hidden);
        this.setState({
            auxiliaryBar: { hidden: nextHidden },
        });
        return nextHidden;
    }
    reset() {
        this.setState({
            splitPanePos: ['300px', 'auto'],
            horizontalSplitPanePos: ['70%', 'auto'],
            activityBar: { hidden: false },
            panel: { hidden: false, panelMaximized: false },
            statusBar: { hidden: false },
            sidebar: { hidden: false, position: Position.left },
            menuBar: { hidden: false, mode: MenuBarMode.vertical },
        });
    }
};
LayoutService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], LayoutService);
export { LayoutService };
