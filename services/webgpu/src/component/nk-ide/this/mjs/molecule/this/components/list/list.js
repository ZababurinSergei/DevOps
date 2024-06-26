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
import { prefixClaName, classNames, getBEMModifier } from './../../../this/common/className';
import { useEffect, useState } from 'react';
import { cloneReactChildren } from './../../../this/react';
export const defaultListClassName = prefixClaName('list');
export const verticalClassName = getBEMModifier(defaultListClassName, 'vertical');
export const horizontalClassName = getBEMModifier(defaultListClassName, 'horizontal');
export function List(props) {
    const { children, current, disable, onClick, onSelect, className, mode } = props, restProps = __rest(props, ["children", "current", "disable", "onClick", "onSelect", "className", "mode"]);
    const [active, setActive] = useState(current);
    const [isDisable, setIsDisable] = useState(disable);
    useEffect(() => {
        if (active !== current) {
            setActive(current);
        }
        if (disable !== isDisable) {
            setIsDisable(disable);
        }
    }, [current, disable]);
    const handleClick = (event, item) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(event, item);
        if (item) {
            if (item.id !== active) {
                setActive(item.id);
            }
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(event, item);
        }
    };
    const modeClassName = mode === 'horizontal' ? horizontalClassName : verticalClassName;
    const claNames = classNames(defaultListClassName, className, modeClassName);
    return (React.createElement("ul", Object.assign({}, restProps, { className: claNames }), cloneReactChildren(children, {
        active: active,
        disable: isDisable,
        onClick: handleClick,
    })));
}
