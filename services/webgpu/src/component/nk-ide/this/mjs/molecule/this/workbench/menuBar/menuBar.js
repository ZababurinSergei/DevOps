import React, { useCallback, useEffect, useRef } from 'react';
import { getBEMElement, prefixClaName } from './../../../this/common/className';
import { DropDown } from './../../../this/components/dropdown';
import { Menu } from './../../../this/components/menu';
import { Icon } from './../../../this/components/icon';
import { KeybindingHelper } from './../../../this/services/keybinding';
import { MenuBarMode } from './../../../this/model/workbench/layout';
import { HorizontalView } from './horizontalView';
export const defaultClassName = prefixClaName('menuBar');
export const actionClassName = getBEMElement(defaultClassName, 'action');
export function MenuBar(props) {
    const { data, mode = MenuBarMode.vertical, onClick, updateFocusinEle, logo, } = props;
    const childRef = useRef(null);
    const addKeybindingForData = (rawData = []) => {
        const resData = rawData.concat();
        const stack = [...resData];
        while (stack.length) {
            const head = stack.pop();
            if (head) {
                if (head === null || head === void 0 ? void 0 : head.data) {
                    stack.push(...head.data);
                }
                else {
                    const simplyKeybinding = KeybindingHelper.queryGlobalKeybinding(head.id) || [];
                    if (simplyKeybinding.length) {
                        head.keybinding =
                            KeybindingHelper.convertSimpleKeybindingToString(simplyKeybinding);
                    }
                }
            }
        }
        return resData;
    };
    const handleClick = (e, item) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e, item);
        childRef.current.dispose();
    };
    const overlay = (React.createElement(Menu, { role: "menu", onClick: handleClick, style: { width: 200 }, data: addKeybindingForData(data) }));
    const handleSaveFocusinEle = useCallback((e) => {
        updateFocusinEle === null || updateFocusinEle === void 0 ? void 0 : updateFocusinEle(e.target);
    }, []);
    useEffect(() => {
        document.body.addEventListener('focusin', handleSaveFocusinEle);
        return () => {
            document.body.removeEventListener('focusin', handleSaveFocusinEle);
        };
    }, []);
    if (mode === MenuBarMode.horizontal) {
        return (React.createElement(HorizontalView, { data: addKeybindingForData(data), onClick: onClick, logo: logo }));
    }
    return (React.createElement("div", { className: defaultClassName },
        React.createElement(DropDown, { ref: childRef, trigger: "click", className: actionClassName, placement: "right", overlay: overlay },
            React.createElement(Icon, { type: "menu" }))));
}
export default MenuBar;
