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
import { itemClassName } from './base';
import { getDataAttributionsFromProps } from './../../../this/common/dom';
export function StatusItem(props) {
    const { className, onClick, id, name, data, render, style, role, title } = props, restProps = __rest(props, ["className", "onClick", "id", "name", "data", "render", "style", "role", "title"]);
    const clsName = classNames(itemClassName, className);
    const events = {
        onClick: function (e) {
            onClick === null || onClick === void 0 ? void 0 : onClick(e, props);
        },
    };
    const attrProps = getDataAttributionsFromProps(restProps);
    return (React.createElement("div", Object.assign({ className: clsName, style: style, role: role, title: title, id: id.toString() }, attrProps),
        React.createElement("a", Object.assign({ tabIndex: -1, title: name }, events), render ? render(props) : name)));
}
