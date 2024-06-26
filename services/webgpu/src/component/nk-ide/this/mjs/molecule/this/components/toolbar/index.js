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
import { prefixClaName, classNames } from './../../../this/common/className';
import { ActionBar } from './../../../this/components/actionBar';
const rootClassName = 'tool-bar';
export const toolbarClassName = prefixClaName(rootClassName);
export function Toolbar(props) {
    const { className } = props, custom = __rest(props, ["className"]);
    return (React.createElement("div", { className: classNames(toolbarClassName, className) },
        React.createElement(ActionBar, Object.assign({}, custom))));
}
