import 'reflect-metadata';
import React from 'react';
import { IStatusBarItem } from './../../this/model';
import { Controller } from './../../this/react/controller';
import { IActionBarItemProps } from './../../this/components/actionBar';
import { INotificationItem } from './../../this/model/notification';
export interface INotificationController extends Partial<Controller> {
    onCloseNotification(item: INotificationItem): void;
    onClick?: (e: React.MouseEvent, item: IStatusBarItem) => void;
    onActionBarClick?(event: React.MouseEvent<Element, MouseEvent>, item: IActionBarItemProps<any>): void;
    /**
     * Toggle the Notifications visibility
     */
    toggleNotifications(): void;
}
export declare class NotificationController extends Controller implements INotificationController {
    private readonly notificationService;
    private readonly statusBarService;
    private readonly builtinService;
    constructor();
    onCloseNotification: (item: INotificationItem<any>) => void;
    toggleNotifications(): void;
    onClick: (e: React.MouseEvent, item: IStatusBarItem) => void;
    onActionBarClick: (event: React.MouseEvent<Element, MouseEvent>, item: IActionBarItemProps<any>) => void;
    initView(): void;
}
