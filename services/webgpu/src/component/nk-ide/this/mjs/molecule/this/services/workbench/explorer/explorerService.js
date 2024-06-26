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
import { singleton, container } from 'tsyringe';
import { Component } from './../../../../this/react/component';
import { IExplorerModel, ExplorerEvent, } from './../../../../this/model/workbench/explorer/explorer';
import cloneDeep from 'lodash/cloneDeep';
import { searchById } from './../../../../this/common/utils';
import logger from './../../../../this/common/logger';
let ExplorerService = class ExplorerService extends Component {
    constructor() {
        super();
        this.state = container.resolve(IExplorerModel);
    }
    setExpandedPanels(activePanelKeys) {
        this.setState({
            activePanelKeys,
        });
    }
    toggleIcon(icon) {
        return icon === 'check' ? '' : 'check';
    }
    getAction(id) {
        var _a;
        const { headerToolBar } = this.state;
        const action = (_a = headerToolBar === null || headerToolBar === void 0 ? void 0 : headerToolBar.contextMenu) === null || _a === void 0 ? void 0 : _a.find(searchById(id));
        return action ? cloneDeep(action) : action;
    }
    updatePanel(data) {
        if (!data.id) {
            logger.error('Must provide id property in update data');
            return;
        }
        const next = this.state.data.concat();
        const target = next.find(searchById(data.id));
        if (!target) {
            logger.error(`There is no panel found in state whose id is ${data.id}`);
            return;
        }
        Object.assign(target, data);
        this.setState({
            data: next,
        });
        this.updateAction({
            id: data.id.toString(),
            name: data.name,
            title: data.title,
            sortIndex: data.sortIndex,
        });
    }
    updateAction(action) {
        var _a;
        if (!action.id) {
            logger.error('Must provide id property in action data');
            return;
        }
        const { headerToolBar } = this.state;
        if (!headerToolBar) {
            logger.error("Molecule can' update the action, because there is no headerToolBar in Explorer");
            return;
        }
        const nextActions = ((_a = headerToolBar.contextMenu) === null || _a === void 0 ? void 0 : _a.concat()) || [];
        const target = nextActions.find(searchById(action.id));
        if (!target) {
            logger.error(`There is no action found in actions whose id is ${action.id}`);
            return;
        }
        Object.assign(target, action);
        this.setState({
            headerToolBar: Object.assign(Object.assign({}, headerToolBar), { contextMenu: nextActions }),
        });
    }
    addPanel(data) {
        const workInProgressData = Array.isArray(data) ? data : [data];
        const next = [...this.state.data];
        const nextActions = [];
        workInProgressData.forEach((item) => {
            const index = next.findIndex(searchById(item.id));
            if (index !== -1) {
                logger.error(`There is already a panel whose id is ${item.id}`);
            }
            else {
                next.push(cloneDeep(item));
                nextActions.push({
                    id: item.id.toString(),
                    name: item.name,
                    title: item.name,
                    icon: 'check',
                    sortIndex: item.sortIndex,
                });
            }
        });
        // sort by sortIndex
        next.sort(({ sortIndex: preIndex = 0 }, { sortIndex: nextIndex = 0 }) => nextIndex - preIndex);
        this.setState({
            data: next,
        });
        // async add header actions
        this.addAction(nextActions);
    }
    addAction(action) {
        var _a;
        const workInProgressActions = Array.isArray(action) ? action : [action];
        const { headerToolBar } = this.state;
        if (!headerToolBar) {
            logger.error("Molecule can't add the action, because there is no headerToolBar in Explorer");
            return;
        }
        const newActions = ((_a = headerToolBar.contextMenu) === null || _a === void 0 ? void 0 : _a.concat()) || [];
        workInProgressActions.forEach((action) => {
            const index = newActions.findIndex(searchById(action.id));
            if (index !== -1) {
                logger.error(`There is already an action whose id is ${action.id}`);
            }
            else {
                newActions.push(action);
            }
        });
        // sort by sortIndex
        newActions.sort(({ sortIndex: preIndex = 0 }, { sortIndex: nextIndex = 0 }) => nextIndex - preIndex);
        const next = Object.assign(Object.assign({}, headerToolBar), { contextMenu: newActions });
        this.setState({
            headerToolBar: next,
        });
    }
    removePanel(id) {
        const { data } = this.state;
        const next = [...data];
        const index = next.findIndex(searchById(id));
        if (index > -1) {
            next.splice(index, 1);
        }
        this.setState({
            data: next,
        });
        // async remove action
        this.removeAction(id);
    }
    removeAction(id) {
        const { headerToolBar } = this.state;
        if (!headerToolBar) {
            logger.error("Molecule can' remove the action, because there is no headerToolBar in Explorer");
            return;
        }
        const newActions = headerToolBar.contextMenu || [];
        const index = newActions === null || newActions === void 0 ? void 0 : newActions.findIndex(searchById(id));
        if (index > -1) {
            newActions.splice(index, 1);
        }
        const next = Object.assign(Object.assign({}, headerToolBar), { contextMenu: newActions });
        this.setState({
            headerToolBar: next,
        });
    }
    // update panel hidden
    togglePanel(id) {
        const { data } = this.state;
        const next = data.concat();
        // find current panel
        const currentPanel = next.find(searchById(id));
        if (currentPanel) {
            currentPanel.hidden = !currentPanel.hidden;
            this.setState({
                data: next,
            });
            // async update toolbar status
            this.toggleHeaderBar(id);
        }
    }
    // update header toolbar status
    toggleHeaderBar(id) {
        var _a;
        const { headerToolBar } = this.state;
        if (!headerToolBar) {
            logger.error("Molecule can' toggle the header bar, because there is no headerToolBar in Explorer");
            return;
        }
        const nextMenu = ((_a = headerToolBar.contextMenu) === null || _a === void 0 ? void 0 : _a.concat()) || [];
        const currentMenu = nextMenu.find(searchById(id));
        if (currentMenu) {
            currentMenu.icon = this.toggleIcon(currentMenu.icon);
            const next = Object.assign(Object.assign({}, headerToolBar), { contextMenu: nextMenu });
            this.setState({
                headerToolBar: next,
            });
        }
    }
    reset() {
        this.setState({
            data: [],
            headerToolBar: undefined,
        });
    }
    onClick(callback) {
        this.subscribe(ExplorerEvent.onClick, callback);
    }
    onRemovePanel(callback) {
        this.subscribe(ExplorerEvent.onRemovePanel, callback);
    }
    onCollapseAllFolders(callback) {
        this.subscribe(ExplorerEvent.onCollapseAllFolders, callback);
    }
    onPanelToolbarClick(callback) {
        this.subscribe(ExplorerEvent.onPanelToolbarClick, callback);
    }
};
ExplorerService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ExplorerService);
export { ExplorerService };
