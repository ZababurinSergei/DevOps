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
import { classNames } from './../../../this/common/className';
import { Icon } from './../../../this/components/icon';
import { Menu } from './menu';
import { checkClassName, disabledClassName, defaultMenuItemClassName, defaultSubMenuClassName, indicatorClassName, labelClassName, menuContentClassName, } from './base';
export var MenuMode;
(function (MenuMode) {
    MenuMode["Vertical"] = "vertical";
    MenuMode["Horizontal"] = "horizontal";
})(MenuMode || (MenuMode = {}));
export function isHorizontal(mode) {
    return mode === MenuMode.Horizontal;
}
export function isVertical(mode) {
    return mode === MenuMode.Horizontal;
}
export function SubMenu(props) {
    const { className, name, render, data = [], mode = MenuMode.Vertical, icon, disabled = false, children, onClick, title, sortIndex } = props, restProps = __rest(props, ["className", "name", "render", "data", "mode", "icon", "disabled", "children", "onClick", "title", "sortIndex"]);
    const cNames = classNames(defaultSubMenuClassName, className);
    const isAlignHorizontal = isHorizontal(mode);
    const chevronType = isAlignHorizontal ? 'down' : 'right';
    const subMenuContent = data.length > 0 ? (React.createElement(Menu, Object.assign({ className: cNames, style: { opacity: '0', pointerEvents: 'none' }, data: data, onClick: onClick }, restProps))) : (React.createElement(Menu, { className: cNames, style: { opacity: '0', pointerEvents: 'none' }, onClick: onClick }, children));
    return (React.createElement("li", Object.assign({ className: classNames(defaultMenuItemClassName, disabled ? disabledClassName : null), "data-submenu": true, "data-mode": mode, "data-sort": sortIndex }, (typeof title === 'string' ? { title } : {}), restProps),
        React.createElement("div", { className: menuContentClassName },
            typeof icon === 'string' ? (React.createElement(Icon, { className: checkClassName, type: icon || '' })) : (icon),
            React.createElement("span", { className: labelClassName }, render ? render(props) : name),
            React.createElement(Icon, { className: indicatorClassName, type: `chevron-${chevronType}` })),
        subMenuContent));
}
