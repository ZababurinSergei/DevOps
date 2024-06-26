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
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { classNames, getBEMElement, getBEMModifier, prefixClaName, } from './../../../this/common/className';
import TabExtra from './tabExtra';
import { Icon } from '../icon';
export const tabClassName = prefixClaName('tab');
export const tabItemClassName = getBEMElement(tabClassName, 'item');
export const tabItemActiveClassName = getBEMModifier(tabItemClassName, 'active');
export const tabItemLabelClassName = getBEMElement(tabItemClassName, 'label');
export const tabItemExtraClassName = getBEMElement(tabItemClassName, 'extra');
export function Tab(_a) {
    var { tab, active } = _a, restEvents = __rest(_a, ["tab", "active"]);
    const { name, closable, id, icon, status } = tab;
    const { onCloseTab, onSelectTab, onContextMenu, onDrag } = restEvents;
    const ref = useRef(null);
    const handleOnContextMenu = (event) => {
        event.preventDefault();
        onContextMenu === null || onContextMenu === void 0 ? void 0 : onContextMenu(event, tab);
    };
    const [, drag] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        type: 'DND_NODE',
        item: tab,
    });
    const [, drop] = useDrop({
        accept: 'DND_NODE',
        hover(item, monitor) {
            if (!ref.current)
                return;
            const component = ref.current;
            const hoverBoundingRect = component === null || component === void 0 ? void 0 : component.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset.x -
                hoverBoundingRect.left;
            const dragInfo = {
                hoverMiddleX,
                hoverClientX,
            };
            onDrag === null || onDrag === void 0 ? void 0 : onDrag(item, tab, dragInfo);
        },
    });
    drag(drop(ref));
    const renderIcon = (icon) => {
        return typeof icon === 'string' ? React.createElement(Icon, { type: icon }) : icon;
    };
    const renderStatus = (status, isHover) => {
        if (status && !isHover) {
            if (typeof status === 'function') {
                return status(tab);
            }
            switch (status) {
                case 'edited':
                    return React.createElement(Icon, { type: "primitive-dot" });
                default:
                    return React.createElement(Icon, { type: "close" });
            }
        }
        return React.createElement(Icon, { type: "close" });
    };
    return (React.createElement("div", { ref: ref, className: classNames(tabItemClassName, {
            [tabItemActiveClassName]: active,
        }), onClick: (event) => onSelectTab === null || onSelectTab === void 0 ? void 0 : onSelectTab(id), onContextMenu: handleOnContextMenu },
        icon && (React.createElement("span", { className: tabItemLabelClassName }, renderIcon(icon))),
        name,
        (typeof closable === 'undefined' || closable) && (React.createElement(TabExtra, { classNames: tabItemExtraClassName, onClick: (e) => {
                e.stopPropagation();
                onCloseTab === null || onCloseTab === void 0 ? void 0 : onCloseTab(id);
            }, renderStatus: (isHover) => renderStatus(status, isHover) }))));
}
