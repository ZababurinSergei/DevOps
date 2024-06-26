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
import { NotificationModel, NotificationStatus, } from './../../this/model/notification';
import { Component } from './../../this/react';
import { singleton, container } from 'tsyringe';
import { randomId, searchById } from './../../this/common/utils';
import logger from './../../this/common/logger';
import { cloneDeep } from 'lodash';
let NotificationService = class NotificationService extends Component {
    constructor() {
        super();
        this.state = container.resolve(NotificationModel);
    }
    toggleNotification() {
        const next = cloneDeep(this.state);
        next.showNotifications = !this.state.showNotifications;
        this.setState(next);
    }
    update(item) {
        const { data = [] } = this.state;
        if (data.length) {
            const index = data.findIndex(searchById(item.id));
            if (index > -1) {
                const original = data[index];
                data[index] = Object.assign(original, item);
                this.setState(Object.assign(Object.assign({}, this.state), { data: [...data] }));
                return data[index];
            }
            else {
                logger.error('There is no notification be found, please check the id');
            }
        }
        return null;
    }
    remove(id) {
        const { data = [] } = this.state;
        if (data.length) {
            const index = data.findIndex(searchById(id));
            if (index > -1) {
                data.splice(index, 1);
                this.setState(Object.assign(Object.assign({}, this.state), { data: [...data] }));
            }
            else {
                logger.error('There is no notification be found, please check the id');
            }
        }
        else {
            logger.error("You can't remove notification because there is no notifications in data.");
        }
    }
    add(items) {
        const { data = [] } = this.state;
        if (items && items.length) {
            items.forEach((item) => {
                if (item.id === undefined)
                    item.id = randomId();
                item.status = NotificationStatus.WaitRead;
            });
            const arr = [...data, ...items];
            this.setState({
                data: arr,
            });
            return items;
        }
        return null;
    }
    clear() {
        this.setState({
            data: [],
        });
    }
    reset() {
        this.setState({
            id: '',
            name: '',
            data: [],
            sortIndex: 1,
            showNotifications: false,
            actionBar: [],
            render: undefined,
        });
    }
};
NotificationService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], NotificationService);
export { NotificationService };
