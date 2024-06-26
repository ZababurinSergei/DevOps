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
import React, { useRef, useEffect, useState } from 'react';
import { classNames } from './../../../this/common/className';
import { sashHoverClassName, sashItemClassName } from './base';
export default function Sash(_a) {
    var { className, onDragStart, onDragging, onDragEnd } = _a, restProps = __rest(_a, ["className", "onDragStart", "onDragging", "onDragEnd"]);
    const timeout = useRef();
    const [active, setActive] = useState(false);
    const [draging, setDrag] = useState(false);
    useEffect(function () {
        return function () {
            clearTimeout(timeout.current);
        };
    }, []);
    return (React.createElement("div", Object.assign({ role: "Resizer", className: classNames(sashItemClassName, (draging || active) && sashHoverClassName, className), onMouseEnter: () => {
            timeout.current = setTimeout(() => {
                setActive(true);
            }, 150);
        }, onMouseLeave: () => {
            if (timeout.current) {
                setActive(false);
                clearTimeout(timeout.current);
            }
        }, onMouseDown: (e) => {
            setDrag(true);
            onDragStart(e);
            const handleMouseMove = function (e) {
                onDragging(e);
            };
            const handleMouseUp = function (e) {
                setDrag(false);
                onDragEnd(e);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } }, restProps)));
}
