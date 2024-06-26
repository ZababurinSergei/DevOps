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
import React, { forwardRef, useImperativeHandle } from 'react';
import { classNames, getBEMModifier, prefixClaName } from './../../../this/common/className';
import { useContextViewEle } from '../contextView';
import { triggerEvent, getPositionByPlacement, } from './../../../this/common/dom';
export const defaultDropDownClassName = prefixClaName('drop-down');
export const DropDown = forwardRef((props, ref) => {
    const { className, overlay, children, placement = 'right', trigger = 'click' } = props, restProps = __rest(props, ["className", "overlay", "children", "placement", "trigger"]);
    const contextView = useContextViewEle({
        render: () => overlay,
    });
    useImperativeHandle(ref, () => ({
        contextView,
        dispose: () => {
            contextView.hide();
        },
    }));
    const claNames = classNames(defaultDropDownClassName, getBEMModifier(defaultDropDownClassName, placement), className);
    const events = {
        [triggerEvent(trigger)]: function (e) {
            if (!contextView)
                return;
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            let position = getPositionByPlacement(placement, rect);
            contextView.show(position);
            // If placement is left or top,
            // need re calculate the position by menu size
            if (placement === 'left' || placement === 'top') {
                const overlay = contextView.view.getBoundingClientRect();
                overlay.x = rect.x;
                overlay.y = rect.y;
                position = getPositionByPlacement(placement, overlay);
                contextView.show(position);
            }
        },
    };
    return (React.createElement("div", Object.assign({ className: claNames }, events, restProps), children));
});
