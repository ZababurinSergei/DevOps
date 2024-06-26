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
import { Component } from './../../../this/react';
import cloneDeep from 'lodash/cloneDeep';
import { singleton, container } from 'tsyringe';
import { SidebarModel, } from './../../../this/model/workbench/sidebar';
import { searchById } from './../../../this/common/utils';
import logger from './../../../this/common/logger';
let SidebarService = class SidebarService extends Component {
    constructor() {
        super();
        this.state = container.resolve(SidebarModel);
    }
    getPane(id) {
        const { panes } = this.state;
        const target = panes.find(searchById(id));
        return target;
    }
    get(id) {
        const pane = this.getPane(id);
        return pane ? cloneDeep(pane) : undefined;
    }
    add(data, isActive = false) {
        const pane = this.getPane(data.id);
        if (pane) {
            logger.error(`There already has a pane which id is ${data.id}, if you want to modify it, please use the update method`);
            return;
        }
        const oldPanes = this.state.panes.concat();
        oldPanes.push(cloneDeep(data));
        if (isActive) {
            this.setState({
                current: data.id,
            });
        }
        this.setState({
            panes: oldPanes,
        });
    }
    update(pane) {
        const { panes } = this.state;
        const targetPane = this.getPane(pane.id);
        if (!targetPane) {
            logger.error(`There is no pane found via the ${pane.id} id`);
            return;
        }
        Object.assign(targetPane, pane);
        this.setState({
            panes: cloneDeep(panes),
        });
    }
    remove(id) {
        var _a, _b;
        const { panes, current } = this.state;
        const index = panes.findIndex(searchById(id));
        if (index === -1) {
            logger.error(`There is no pane found via the ${id} id`);
            return;
        }
        // If the pane is the current pane, the active next or prev pane
        if (id === current) {
            const nextCurrent = ((_a = panes[index + 1]) === null || _a === void 0 ? void 0 : _a.id) || ((_b = panes[index - 1]) === null || _b === void 0 ? void 0 : _b.id) || '';
            this.setActive(nextCurrent);
        }
        panes.splice(index, 1);
        this.setState({
            panes: panes.concat(),
        });
    }
    setActive(id) {
        if (!id) {
            this.setState({
                current: '',
            });
        }
        else {
            const pane = this.getPane(id);
            if (!pane) {
                logger.error(`There is no pane found via the ${id} id`);
                return;
            }
            this.setState({
                current: id,
            });
        }
    }
    reset() {
        this.setState({
            panes: [],
            current: '',
        });
    }
};
SidebarService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], SidebarService);
export { SidebarService };
