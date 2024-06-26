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
import { Component } from './../../../this/react/component';
import { ActivityBarModel, ActivityBarEvent, } from './../../../this/model/workbench/activityBar';
import { searchById } from './../../../this/common/utils';
import logger from './../../../this/common/logger';
import { SidebarService } from './sidebarService';
let ActivityBarService = class ActivityBarService extends Component {
    constructor() {
        super();
        this.state = container.resolve(ActivityBarModel);
        this.sidebarService = container.resolve(SidebarService);
    }
    setActive(id) {
        this.setState({
            selected: id,
        });
    }
    reset() {
        this.setState({
            data: [],
            selected: '',
            contextMenu: [],
        });
    }
    add(data, isActive = false) {
        let next = [...this.state.data];
        if (Array.isArray(data)) {
            next = next === null || next === void 0 ? void 0 : next.concat(data);
        }
        else {
            next === null || next === void 0 ? void 0 : next.push(data);
            if (isActive) {
                this.setActive(data.id);
            }
        }
        // The smaller the sort number is, the more front the order is
        next.sort((pre, next) => {
            const preIndex = pre.sortIndex || Number.MAX_SAFE_INTEGER;
            const nextIndex = next.sortIndex || Number.MAX_SAFE_INTEGER;
            return preIndex - nextIndex;
        });
        this.setState({
            data: next,
        });
    }
    getRemoveList(id, data) {
        return data.reduce((total, item, key) => {
            const strItem = item.id.toString();
            if ((Array.isArray(id) && id.includes(strItem)) || id === strItem) {
                return total.concat(key);
            }
            return total;
        }, []);
    }
    remove(id) {
        const { data } = this.state;
        let next = [...data];
        const indexs = this.getRemoveList(id, next);
        if (!indexs.length) {
            logger.error("Remove the bar data failed, because there is no data found in barData via this 'id'");
        }
        else {
            next = next.filter((_, key) => {
                return !indexs.includes(key);
            });
            this.setState({
                data: next,
            });
        }
    }
    toggleBar(id) {
        const { data = [], selected } = this.state;
        const next = data.concat();
        const index = next.findIndex(searchById(id));
        const target = next[index];
        if (target) {
            target.hidden = !target.hidden;
            if (id === selected) {
                const nextIndex = (index + 1) % next.length;
                this.setActive(next[nextIndex].id);
                this.sidebarService.setActive(next[nextIndex].id);
            }
            this.setState({
                data: next,
            });
        }
        else {
            logger.error('Toggle activity bar failed, please check your id');
        }
    }
    toggleContextMenuChecked(id) {
        const { contextMenu = [] } = this.state;
        const newActions = contextMenu.concat();
        const target = newActions.find(searchById(id));
        if (target) {
            target.icon = target.icon === 'check' ? '' : 'check';
            this.setState({
                contextMenu: newActions,
            });
        }
        else {
            logger.error(`Toggle the contextmenu failed, can not found any menu by id ${id}`);
        }
    }
    addContextMenu(contextMenu) {
        let next = [...this.state.contextMenu];
        if (Array.isArray(contextMenu)) {
            next = next === null || next === void 0 ? void 0 : next.concat(contextMenu);
        }
        else {
            next === null || next === void 0 ? void 0 : next.push(contextMenu);
        }
        this.setState({
            contextMenu: next,
        });
    }
    removeContextMenu(id) {
        const { contextMenu } = this.state;
        let next = [...contextMenu];
        const indexs = this.getRemoveList(id, next);
        if (!indexs.length) {
            logger.error("Remove the bar data failed, because there is no data found in barData via this 'id'");
        }
        else {
            next = next.filter((_, key) => {
                return !indexs.includes(key);
            });
            this.setState({
                contextMenu: next,
            });
        }
    }
    // ====== The belows for subscribe activity bar events ======
    onClick(callback) {
        this.subscribe(ActivityBarEvent.OnClick, callback);
    }
    onChange(callback) {
        this.subscribe(ActivityBarEvent.OnChange, callback);
    }
};
ActivityBarService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ActivityBarService);
export { ActivityBarService };
