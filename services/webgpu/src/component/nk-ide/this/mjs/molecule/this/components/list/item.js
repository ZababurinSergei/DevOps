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
import { classNames, getBEMElement, getBEMModifier } from './../../../this/common/className';
import { defaultListClassName } from './list';
const itemClassName = getBEMElement(defaultListClassName, 'item');
const labelClassName = getBEMElement(defaultListClassName, 'label');
const itemActiveClassName = getBEMModifier(itemClassName, 'active');
const itemDisabledClassName = getBEMModifier(itemClassName, 'disabled');
export function Item(props) {
    const { id, onClick, disabled, active, disable, className, children } = props, restProps = __rest(props, ["id", "onClick", "disabled", "active", "disable", "className", "children"]);
    const click = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e, props);
    };
    let disabledClassName = '';
    if (disabled !== undefined || disabled === true) {
        disabledClassName = itemDisabledClassName;
    }
    // If the value of disable eqs with the id, attach the disabled class name
    if (disable === id) {
        disabledClassName = itemDisabledClassName;
    }
    const claNames = classNames(itemClassName, className, disabledClassName, active === id ? itemActiveClassName : '');
    return (React.createElement("li", Object.assign({ id: id.toString(), className: claNames }, restProps, { onClick: click }),
        React.createElement("span", { className: labelClassName }, children)));
}
