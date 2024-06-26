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
import { checkClassName, disabledClassName, defaultMenuItemClassName, keybindingClassName, labelClassName, menuContentClassName, } from './base';
import { Icon } from '../icon';
export function MenuItem(props) {
    const { icon, disabled = false, className, onClick, keybinding, render, children, name, title, id, sortIndex } = props, restProps = __rest(props, ["icon", "disabled", "className", "onClick", "keybinding", "render", "children", "name", "title", "id", "sortIndex"]);
    const events = {
        onClick: function (e) {
            onClick === null || onClick === void 0 ? void 0 : onClick(e, props);
        },
    };
    return (React.createElement("li", Object.assign({ className: classNames(defaultMenuItemClassName, className, disabled ? disabledClassName : null), id: id === null || id === void 0 ? void 0 : id.toString(), "data-sort": sortIndex }, (typeof title === 'string' ? { title } : {}), events, restProps),
        React.createElement("div", { className: menuContentClassName },
            React.createElement(Icon, { type: icon, className: checkClassName }),
            React.createElement("span", { className: labelClassName, title: typeof name === 'string' ? name : '' }, render ? render(props) : children),
            keybinding ? (React.createElement("span", { className: keybindingClassName }, keybinding)) : null)));
}
