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
import { Float, StatusBarEvent, StatusBarModel, } from './../../../this/model/workbench/statusBar';
import cloneDeep from 'lodash/cloneDeep';
import { Component } from './../../../this/react';
import { container, singleton } from 'tsyringe';
import { searchById } from './../../../this/common/utils';
import logger from './../../../this/common/logger';
let StatusBarService = class StatusBarService extends Component {
    constructor() {
        super();
        this.state = container.resolve(StatusBarModel);
    }
    /**
     * Get the item informations in right position or left position
     * @param item
     * @returns
     */
    getItem(item, float) {
        const { rightItems, leftItems } = this.state;
        if (!float) {
            // find left first
            let index = leftItems.findIndex(searchById(item.id));
            if (index > -1) {
                return {
                    index,
                    item: leftItems[index],
                    source: 'leftItems',
                };
            }
            // then find the item from right
            index = rightItems.findIndex(searchById(item.id));
            if (index > -1) {
                return {
                    index,
                    item: rightItems[index],
                    source: 'rightItems',
                };
            }
            // nothing found both in right and left
            return {
                index: -1,
                item: null,
                source: null,
            };
        }
        // specific the position
        const sourceArr = float === Float.left ? leftItems : rightItems;
        const index = sourceArr.findIndex(searchById(item.id));
        return {
            index,
            item: sourceArr[index] || null,
            source: float === Float.left ? 'leftItems' : 'rightItems',
        };
    }
    add(item, float) {
        const target = this.getItem(item, float);
        if (target.item) {
            logger.error(`There is already a status whose id is ${item.id}, if you want to update it, please use the update method`);
            return;
        }
        const sourceArr = float === Float.left ? 'leftItems' : 'rightItems';
        const nextArr = this.state[sourceArr].concat();
        nextArr.push(item);
        this.setState({
            [sourceArr]: nextArr,
        });
    }
    update(item, float) {
        const workInProgressItem = this.getItem(item, float);
        if (!workInProgressItem.source) {
            logger.error(`There is no status found whose id is ${item.id}`);
            return;
        }
        const { index, item: target, source } = workInProgressItem;
        const next = this.state[source].concat();
        next[index] = Object.assign({}, target, item);
        this.setState({
            [source]: next,
        });
    }
    getStatusBarItem(id, float) {
        const itemInfo = this.getItem({ id }, float);
        return itemInfo.source ? cloneDeep(itemInfo.item) : itemInfo.item;
    }
    remove(id, float) {
        const itemInfo = this.getItem({ id }, float);
        if (!itemInfo.source) {
            logger.error(`There is no status item found whose id is ${id}`);
            return;
        }
        const { index, source } = itemInfo;
        const next = this.state[source].concat();
        next.splice(index, 1);
        this.setState({
            [source]: next,
        });
    }
    reset() {
        this.setState({
            rightItems: [],
            leftItems: [],
            contextMenu: [],
        });
    }
    onClick(callback) {
        this.subscribe(StatusBarEvent.onClick, callback);
    }
};
StatusBarService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], StatusBarService);
export { StatusBarService };
