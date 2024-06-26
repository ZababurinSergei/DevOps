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
import React, { forwardRef } from 'react';
import { classNames, getBEMModifier, prefixClaName } from './../../../this/common/className';
export const defaultButtonClassName = prefixClaName('btn');
export const normalButtonClassName = getBEMModifier(defaultButtonClassName, 'normal');
export const largeButtonClassName = getBEMModifier(defaultButtonClassName, 'large');
export const disableButtonClassName = getBEMModifier(defaultButtonClassName, 'disabled');
export const Button = forwardRef(function (props, ref) {
    const { className, children, size = 'normal' } = props, custom = __rest(props, ["className", "children", "size"]);
    const disabled = props.disabled ? disableButtonClassName : null;
    const sizeClassName = size === 'large' ? largeButtonClassName : normalButtonClassName;
    const claNames = classNames(className, defaultButtonClassName, sizeClassName, disabled);
    return (React.createElement("button", Object.assign({ ref: ref, className: claNames }, custom), children));
});
