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
import { connect } from './../../this/react';
import { Float } from './../../this/model';
import { Controller } from './../../this/react/controller';
import { NotificationStatusBarView } from './../../this/workbench/notification';
import { StatusBarService, NotificationService, BuiltinService, } from './../../this/services';
let NotificationController = class NotificationController extends Controller {
    constructor() {
        super();
        this.onCloseNotification = (item) => {
            this.notificationService.remove(item.id);
        };
        this.onClick = (e, item) => {
            this.toggleNotifications();
        };
        this.onActionBarClick = (event, item) => {
            const action = item.id;
            const { NOTIFICATION_CLEAR_ALL_ID, NOTIFICATION_HIDE_ID } = this.builtinService.getConstants();
            if (action === NOTIFICATION_CLEAR_ALL_ID) {
                this.notificationService.clear();
            }
            else if (action === NOTIFICATION_HIDE_ID) {
                this.toggleNotifications();
            }
        };
        this.notificationService = container.resolve(NotificationService);
        this.statusBarService = container.resolve(StatusBarService);
        this.builtinService = container.resolve(BuiltinService);
    }
    toggleNotifications() {
        this.notificationService.toggleNotification();
    }
    initView() {
        const { builtInNotification, NOTIFICATION_CLEAR_ALL, NOTIFICATION_HIDE, } = this.builtinService.getModules();
        if (builtInNotification) {
            const NotificationView = connect(this.notificationService, NotificationStatusBarView);
            /* istanbul ignore next */
            const defaultNotification = Object.assign(Object.assign({}, builtInNotification), { actionBar: [NOTIFICATION_CLEAR_ALL, NOTIFICATION_HIDE].filter(Boolean), render: () => (React.createElement(NotificationView, { onClick: this.onClick, onActionBarClick: this.onActionBarClick, onCloseNotification: this.onCloseNotification })) });
            this.notificationService.setState(Object.assign({}, defaultNotification));
            this.statusBarService.add(defaultNotification, Float.right);
        }
    }
};
NotificationController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], NotificationController);
export { NotificationController };
