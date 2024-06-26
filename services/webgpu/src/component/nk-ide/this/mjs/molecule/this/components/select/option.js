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
import { selectClassName } from './select';
const selectOptionClassName = getBEMElement(selectClassName, 'option');
const selectOptionDisabledClassName = getBEMModifier(selectOptionClassName, 'disabled');
export function Option(props) {
    const { className, value, title, name, description, disabled, children, onClick } = props, restProps = __rest(props, ["className", "value", "title", "name", "description", "disabled", "children", "onClick"]);
    const claNames = classNames(selectOptionClassName, className, disabled ? selectOptionDisabledClassName : '');
    const handleClick = (e) => {
        if (!disabled) {
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }
    };
    return (React.createElement("div", Object.assign({ className: claNames, title: title, "data-name": name || children, "data-value": value, "data-desc": description, onClick: handleClick }, restProps), children));
}
