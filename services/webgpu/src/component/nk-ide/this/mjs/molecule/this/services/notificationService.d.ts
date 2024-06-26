import 'reflect-metadata';
import { INotification, INotificationItem } from './../../this/model/notification';
import { Component } from './../../this/react';
import type { UniqueId } from './../../this/common/types';
export interface INotificationService extends Component<INotification> {
    /**
     * Add new notification items
     * @param items
     */
    add<T>(items: INotificationItem<T>[]): null | INotificationItem<T>[];
    /**
     * Remove the specific notification item by id
     * @param id
     */
    remove(id: UniqueId): void;
    /**
     * Update the specific notification item
     * @param item notification item, the id field is required
     */
    update<T>(item: INotificationItem<T>): null | INotificationItem<T>;
    /**
     * Toggle the Notification view between display or hidden
     */
    toggleNotification(): void;
    /**
     * Clear the notifications
     */
    clear(): void;
    /**
     * Reset notifications, this will clear the pending notifications
     */
    reset(): void;
}
export declare class NotificationService extends Component<INotification> implements INotificationService {
    protected state: INotification;
    constructor();
    toggleNotification(): void;
    update<T>(item: INotificationItem<T>): INotificationItem<T> | null;
    remove(id: UniqueId): void;
    add<T>(items: INotificationItem<T>[]): null | INotificationItem<T>[];
    clear(): void;
    reset(): void;
}
