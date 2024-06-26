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
import { classNames, prefixClaName } from './../../../this/common/className';
import '@vscode/codicons/dist/codicon.css';
export function Icon(props) {
    const { className, type, children } = props, restProps = __rest(props, ["className", "type", "children"]);
    if (type) {
        return typeof type === 'string' ? (React.createElement("span", Object.assign({ className: classNames(className, 'codicon', type.includes('~spin') && 'codicon-spin', prefixClaName(type.split('~spin')[0], 'codicon')) }, restProps))) : (type);
    }
    return children ? (React.createElement("span", Object.assign({ className: className }, restProps), children)) : null;
}
