var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { prefixClaName, classNames, getBEMElement, getBEMModifier, } from './../../../this/common/className';
import { useContextMenu } from './../../../this/components/contextMenu';
import { Menu } from './../../../this/components/menu';
import { mergeFunctions } from './../../../this/common/utils';
import Tooltip from '../tooltip';
import { Icon } from '../icon';
import { getDataAttributionsFromProps } from './../../../this/common/dom';
const defaultActionBarClassName = prefixClaName('action-bar');
const containerClassName = getBEMElement(defaultActionBarClassName, 'container');
const itemClassName = getBEMElement(defaultActionBarClassName, 'item');
const itemDisabledClassName = getBEMModifier(itemClassName, 'disabled');
const itemCheckedClassName = getBEMModifier(itemClassName, 'checked');
export function ActionBarItem(props) {
    const { title, name, contextMenu = [], onClick, icon, onContextMenuClick } = props, restProps = __rest(props, ["title", "name", "contextMenu", "onClick", "icon", "onContextMenuClick"]);
    const disabled = props.disabled ? itemDisabledClassName : null;
    const checked = props.checked ? itemCheckedClassName : null;
    const refItem = useRef(null);
    const contextViewMenu = useRef();
    const onClickMenuItem = useCallback((e, item) => {
        var _a;
        onContextMenuClick === null || onContextMenuClick === void 0 ? void 0 : onContextMenuClick(e, item);
        (_a = contextViewMenu.current) === null || _a === void 0 ? void 0 : _a.hide();
    }, [contextMenu]);
    const renderContextMenu = () => (React.createElement(Menu, { onClick: onClickMenuItem, data: contextMenu }));
    useEffect(() => {
        if (contextMenu.length > 0) {
            contextViewMenu.current = useContextMenu({
                anchor: refItem.current,
                render: renderContextMenu,
            });
        }
        return function cleanup() {
            var _a;
            (_a = contextViewMenu.current) === null || _a === void 0 ? void 0 : _a.dispose();
        };
    });
    const onClickItem = function (event) {
        if (props.disabled) {
            event.preventDefault();
            return;
        }
        if (onClick) {
            onClick(event, props);
        }
        if (contextMenu.length > -1 && contextViewMenu.current) {
            contextViewMenu.current.show({
                x: event.clientX,
                y: event.clientY,
            });
        }
    };
    const dataProps = getDataAttributionsFromProps(restProps);
    return (React.createElement("li", Object.assign({ ref: refItem, className: classNames(itemClassName, disabled, checked), onClick: onClickItem }, dataProps),
        React.createElement(Tooltip, { overlay: React.createElement("span", null, title) },
            React.createElement(Icon, { type: icon }, name))));
}
export function ActionBar(props) {
    const { data = [], onClick, onContextMenuClick, className, style, title } = props, restProps = __rest(props, ["data", "onClick", "onContextMenuClick", "className", "style", "title"]);
    const claNames = classNames(defaultActionBarClassName, className);
    const items = data.map((item, index) => (React.createElement(ActionBarItem, Object.assign({ key: item.id }, item, { onContextMenuClick: onContextMenuClick, "data-index": index, onClick: mergeFunctions(onClick, item.onClick) }))));
    const dataProps = getDataAttributionsFromProps(restProps);
    return (React.createElement("div", Object.assign({ className: claNames, style: style, title: title }, dataProps),
        React.createElement("ul", { className: containerClassName }, items)));
}
