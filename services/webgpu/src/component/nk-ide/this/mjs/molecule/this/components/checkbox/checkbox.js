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
import { prefixClaName, classNames, getBEMElement } from './../../../this/common/className';
import { getDataAttributionsFromProps } from './../../../this/common/dom';
export const checkboxClassName = prefixClaName('checkbox');
const checkboxLabelClassName = getBEMElement(checkboxClassName, 'label');
const checkboxInputClassName = getBEMElement(checkboxClassName, 'input');
export function Checkbox(props) {
    const { className, id, children, value, onChange, title, role, style } = props, custom = __rest(props, ["className", "id", "children", "value", "onChange", "title", "role", "style"]);
    const claNames = classNames(checkboxClassName, className);
    const handleCheckboxChange = (e) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(e, { id, value: e.target.value });
    };
    const dataAttrs = getDataAttributionsFromProps(custom);
    return (React.createElement("div", Object.assign({ className: claNames, role: role, style: style, title: title }, dataAttrs),
        React.createElement("input", { id: id.toString(), type: "checkbox", className: checkboxInputClassName, value: value, onChange: handleCheckboxChange }),
        React.createElement("label", { htmlFor: id.toString(), className: classNames(checkboxLabelClassName, 'codicon') }, children)));
}
