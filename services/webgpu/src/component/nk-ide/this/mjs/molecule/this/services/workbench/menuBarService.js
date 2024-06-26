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
import { cloneDeep } from 'lodash';
import { MenuBarModel, } from './../../../this/model/workbench/menuBar';
import { MenuBarEvent } from './../../../this/model/workbench/menuBar';
import { Component } from './../../../this/react';
import { singleton, container } from 'tsyringe';
import logger from './../../../this/common/logger';
let MenuBarService = class MenuBarService extends Component {
    constructor() {
        super();
        this.sperator = '-';
        this.setMenus = (menuData) => {
            this.setState({
                data: cloneDeep(menuData),
            });
        };
        this.onSelect = (callback) => {
            this.subscribe(MenuBarEvent.onSelect, callback);
        };
        this.state = container.resolve(MenuBarModel);
    }
    /**
     * Get the specific menu reference type via menuId
     * @param menuId
     * @returns source is the target menu and path is the collections of indexs that contain the specific menu position
     */
    getReferenceMenu(menuId) {
        const { data } = this.state;
        const stack = data.map((i, index) => ({ source: i, path: `${index}` }));
        let res;
        while (stack.length) {
            const { source, path } = stack.shift();
            if (source.id === menuId) {
                res = { source, path };
            }
            else {
                stack.push(...(source.data || []).map((s, index) => ({
                    source: s,
                    path: `${path}${this.sperator}${index}`,
                })));
            }
        }
        return res;
    }
    getMenuById(menuId) {
        const res = this.getReferenceMenu(menuId);
        return res ? cloneDeep(res.source) : res;
    }
    append(menuItem, parentId) {
        const { data } = this.state;
        const menuInfo = this.getReferenceMenu(parentId);
        if (!menuInfo) {
            logger.error(`There is no menu found by ${parentId}`);
            return;
        }
        const { source: parentMenu } = menuInfo;
        if (Array.isArray(parentMenu.data)) {
            parentMenu.data.push(menuItem);
        }
        else {
            parentMenu.data = [menuItem];
        }
        const deepData = cloneDeep(data);
        this.setState({ data: deepData });
    }
    remove(menuId) {
        const { data } = this.state;
        const menuInfo = this.getReferenceMenu(menuId);
        if (!menuInfo) {
            logger.error(`There is no menu found by ${menuId}`);
            return;
        }
        const { path: paths } = menuInfo;
        const path = paths.split(this.sperator);
        // Remove the last one which is the position of the menu going to be removed
        path.length = path.length - 1;
        const parentMenu = path.reduce((pre, cur) => {
            const { data } = pre;
            return data[cur];
        }, { data });
        const idx = parentMenu.data.findIndex((menu) => menu.id === menuId);
        parentMenu.data.splice(idx, 1);
        this.setState({
            data: cloneDeep(data),
        });
    }
    update(menuId, menuItem = {}) {
        const { data } = this.state;
        const menuInfo = this.getReferenceMenu(menuId);
        if (!menuInfo) {
            logger.error(`There is no menu found by ${menuId}`);
            return;
        }
        const currentMenuItem = menuInfo.source;
        Object.assign(currentMenuItem, menuItem);
        const deepData = cloneDeep(data);
        this.setState({ data: deepData });
    }
    reset() {
        this.setState({
            data: [],
        });
    }
};
MenuBarService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], MenuBarService);
export { MenuBarService };
