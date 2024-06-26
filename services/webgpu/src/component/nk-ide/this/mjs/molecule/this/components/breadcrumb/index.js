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
import { Icon } from './../../../this/components';
import { defaultBreadcrumbClassName, breadcrumbItemClassName, breadcrumbLabelClassName, } from './base';
import { getDataAttributionsFromProps } from './../../../this/common/dom';
export function Breadcrumb(props) {
    const { onClick, className, separator, routes = [], style, title, role } = props, extra = __rest(props, ["onClick", "className", "separator", "routes", "style", "title", "role"]);
    const claNames = classNames(defaultBreadcrumbClassName, className);
    const len = routes.length;
    const sep = separator || React.createElement(Icon, { type: "chevron-right" });
    const dataAttrs = getDataAttributionsFromProps(extra);
    return (React.createElement("div", Object.assign({ className: claNames, role: role, style: style, title: title }, dataAttrs), routes.map((route, index) => {
        const { id, className, title, style, href, icon, render, name } = route, rest = __rest(route, ["id", "className", "title", "style", "href", "icon", "render", "name"]);
        return (React.createElement("a", Object.assign({ key: id, className: classNames(breadcrumbItemClassName, className), title: title, style: style, href: href, tabIndex: 0, onContextMenu: (e) => e.preventDefault(), onClick: (e) => onClick === null || onClick === void 0 ? void 0 : onClick(e, route) }, getDataAttributionsFromProps(rest)),
            React.createElement(Icon, { type: icon }),
            React.createElement("span", { className: breadcrumbLabelClassName }, render ? render(route) : name),
            len - index > 1 ? sep : null));
    })));
}
