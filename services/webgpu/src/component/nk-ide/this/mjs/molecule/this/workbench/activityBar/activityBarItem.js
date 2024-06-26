import React from 'react';
import { classNames } from './../../../this/common/className';
import { Menu } from './../../../this/components/menu';
import { indicatorClassName, labelClassName, itemClassName, itemCheckedClassName, itemDisabledClassName, } from './base';
import { Icon, useContextViewEle } from './../../../this/components';
import { KeybindingHelper } from './../../../this/services/keybinding';
export function ActivityBarItem(props) {
    const { checked = false, disabled = false, title = '', data = {}, render, icon, id, onClick, contextMenu = [], className, onContextMenuClick, } = props;
    const renderContextMenu = () => (React.createElement(Menu, { onClick: onClickMenuItem, role: "menu", data: contextMenu.map((menu) => {
            if (menu.id) {
                const keybindingObj = KeybindingHelper.queryGlobalKeybinding(menu.id.toString());
                if (keybindingObj) {
                    menu.keybinding =
                        KeybindingHelper.convertSimpleKeybindingToString(keybindingObj);
                }
            }
            return menu;
        }) }));
    const contextView = useContextViewEle({ render: renderContextMenu });
    const onClickMenuItem = (e, item) => {
        onContextMenuClick === null || onContextMenuClick === void 0 ? void 0 : onContextMenuClick(e, item);
        contextView === null || contextView === void 0 ? void 0 : contextView.hide();
    };
    const onClickItem = function (event) {
        if (onClick) {
            onClick(props.id, props);
        }
        if (contextMenu.length > 0) {
            contextView === null || contextView === void 0 ? void 0 : contextView.show({ x: event.pageX, y: event.pageY });
        }
    };
    const content = (React.createElement(Icon, { type: icon, className: labelClassName, title: title }, (render === null || render === void 0 ? void 0 : render()) || null));
    return (React.createElement("li", { id: id.toString(), onClick: onClickItem, className: classNames(className, itemClassName, checked ? itemCheckedClassName : '', disabled ? itemDisabledClassName : ''), "data-id": data.id },
        content,
        checked ? React.createElement("div", { className: indicatorClassName }) : null));
}
