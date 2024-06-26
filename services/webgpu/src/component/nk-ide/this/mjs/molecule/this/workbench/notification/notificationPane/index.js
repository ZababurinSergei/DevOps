import React, { memo } from 'react';
import { classNames, getBEMElement, getBEMModifier, prefixClaName, } from './../../../../this/common/className';
import { ActionBar } from './../../../../this/components/actionBar';
import { shadowClassName } from './../../../../this/components/contextView/base';
import { Icon } from './../../../../this/components/icon';
import { localize } from './../../../../this/i18n/localize';
export const defaultNotificationClassName = prefixClaName('notification');
const notificationHeaderClassName = getBEMElement(defaultNotificationClassName, 'header');
const notificationBodyClassName = getBEMElement(defaultNotificationClassName, 'body');
const notificationItemClassName = getBEMElement(defaultNotificationClassName, 'item');
const notificationCloseClassName = getBEMModifier(defaultNotificationClassName, 'close');
export function NotificationPane(props) {
    const { data = [], actionBar = [], showNotifications, onActionBarClick, onCloseNotification, } = props;
    const hasNotifications = data.length > 0;
    const title = hasNotifications
        ? localize('notification.title', 'notifications')
        : localize('notification.title.no', 'no new notifications');
    const display = showNotifications ? 'block' : 'none';
    return (React.createElement("div", { className: classNames(defaultNotificationClassName, shadowClassName), style: { display } },
        React.createElement("header", { className: notificationHeaderClassName },
            React.createElement("span", null, title),
            React.createElement(ActionBar, { data: actionBar, onClick: onActionBarClick })),
        React.createElement("div", { className: notificationBodyClassName }, data.map((item) => (React.createElement("div", { className: notificationItemClassName, key: item.id },
            React.createElement(Icon, { title: "Clear Notification", onClick: () => onCloseNotification === null || onCloseNotification === void 0 ? void 0 : onCloseNotification(item), className: notificationCloseClassName, type: "close" }),
            typeof item.render === 'function'
                ? item.render(item)
                : item.value))))));
}
export default memo(NotificationPane);
