import React from 'react';
import { useEffect, useCallback } from 'react';
import { StatusItem } from './item';
import { mergeFunctions } from './../../../this/common/utils';
import { leftItemsClassName, rightItemsClassName, sortByIndex, statusBarClassName, } from './base';
import { useContextMenu } from './../../../this/components/contextMenu';
import { Menu } from './../../../this/components/menu';
import { ID_STATUS_BAR } from './../../../this/common/id';
import { select } from './../../../this/common/dom';
export function StatusBar(props) {
    const { leftItems = [], contextMenu = [], onContextMenuClick, onClick, rightItems = [], } = props;
    let contextViewMenu;
    const onClickMenuItem = useCallback((e, item) => {
        onContextMenuClick === null || onContextMenuClick === void 0 ? void 0 : onContextMenuClick(e, item);
        contextViewMenu === null || contextViewMenu === void 0 ? void 0 : contextViewMenu.dispose();
    }, [contextMenu]);
    const renderContextMenu = () => (React.createElement(Menu, { role: "menu", onClick: onClickMenuItem, data: contextMenu }));
    useEffect(() => {
        if (contextMenu.length > 0) {
            contextViewMenu = useContextMenu({
                anchor: select(`#${ID_STATUS_BAR}`),
                render: renderContextMenu,
            });
        }
        return function cleanup() {
            contextViewMenu === null || contextViewMenu === void 0 ? void 0 : contextViewMenu.dispose();
        };
    });
    const renderItems = (data) => {
        return data
            .sort(sortByIndex)
            .map((item) => (React.createElement(StatusItem, Object.assign({ key: item.id }, item, { onClick: mergeFunctions(item.onClick, onClick) }))));
    };
    return (React.createElement("div", { className: statusBarClassName, id: ID_STATUS_BAR },
        React.createElement("div", { className: leftItemsClassName }, renderItems(leftItems)),
        React.createElement("div", { className: rightItemsClassName }, renderItems(rightItems))));
}
