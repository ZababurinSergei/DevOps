import React, { memo, useEffect, useRef } from 'react';
import { Icon } from './../../../../this/components/icon';
import { NotificationPane } from '../notificationPane';
import { classNames, getBEMModifier, prefixClaName } from './../../../../this/common/className';
import { select } from './../../../../this/common/dom';
import { render } from './../../../../this/react/render';
const defaultBellClassName = prefixClaName('bell');
const activeBellClassName = getBEMModifier(defaultBellClassName, 'active');
export function NotificationStatusBarView(props) {
    const { data = [], onClick, showNotifications, id, actionBar, onActionBarClick, onCloseNotification, } = props;
    const wrapper = useRef();
    const hasNotifications = data.length > 0;
    const renderIcon = hasNotifications ? 'bell-dot' : 'bell';
    useEffect(() => {
        const container = select(`.${prefixClaName('workbench')}`);
        if (container) {
            wrapper.current = wrapper.current || document.createElement('div');
            container.appendChild(wrapper.current);
            render(React.createElement(NotificationPane, { id: id, data: data, actionBar: actionBar, showNotifications: showNotifications, onActionBarClick: onActionBarClick, onCloseNotification: onCloseNotification }), wrapper.current);
        }
    }, [
        id,
        data,
        actionBar,
        showNotifications,
        onActionBarClick,
        onCloseNotification,
    ]);
    return (React.createElement(Icon, { className: classNames(defaultBellClassName, showNotifications && activeBellClassName), onClick: onClick, type: renderIcon }));
}
export default memo(NotificationStatusBarView);
