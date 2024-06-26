import { UniqueId } from './../../this/common/types';
import { IActionBarItemProps } from './../../this/components/actionBar';
import React from 'react';
import type { IStatusBarItem } from './workbench/statusBar';
export declare enum NotificationStatus {
    Read = 1,
    WaitRead = 2
}
export interface INotificationItem<T = any> {
    id: UniqueId;
    value: T;
    render?(item: INotificationItem): React.ReactNode;
    status?: NotificationStatus;
}
export interface INotification<T = any> extends IStatusBarItem<INotificationItem<T>[]> {
    showNotifications?: boolean;
    actionBar?: IActionBarItemProps[];
}
export declare class NotificationModel<T> implements INotification<T> {
    id: UniqueId;
    name: string;
    data: INotificationItem<T>[];
    sortIndex: number;
    render: () => React.ReactNode;
    showNotifications: boolean;
    actionBar: IActionBarItemProps[];
    constructor(id: UniqueId | undefined, name: string | undefined, data: INotificationItem<T>[] | undefined, sortIndex: number | undefined, showNotifications: boolean | undefined, actionBar: IActionBarItemProps<any>[] | undefined, render: () => React.ReactNode);
}
