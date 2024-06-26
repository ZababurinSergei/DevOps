import React from 'react';
import { useCallback } from 'react';
import { Menu } from './../../../this/components/menu';
import { ID_ACTIVITY_BAR } from './../../../this/common/id';
import { ActivityBarItem } from './activityBarItem';
import { Scrollbar } from './../../../this/components';
import { containerClassName, defaultClassName, globalItemsClassName, itemClassName, normalItemsClassName, } from './base';
import { useContextViewEle } from './../../../this/components';
export function ActivityBar(props) {
    const { data = [], contextMenu = [], selected, onClick, onChange, onContextMenuClick, } = props;
    const onClickBar = (key, item) => {
        if (onClick)
            onClick(key, item);
        if (onChange) {
            // only normal item trigger onChange event
            if (item.type !== 'global') {
                onChange(selected, key);
            }
        }
    };
    const normalBarItems = data.filter((item) => item.type !== 'global' && !item.hidden);
    const globalBarItems = data.filter((item) => item.type === 'global' && !item.hidden);
    const renderItems = (item, index) => {
        return (React.createElement(ActivityBarItem, Object.assign({ key: item.id }, item, { onContextMenuClick: onContextMenuClick, onClick: onClickBar, "data-index": index, checked: selected === item.id })));
    };
    const renderContextMenu = () => (React.createElement(Menu, { role: "menu", onClick: onClickMenuItem, data: contextMenu }));
    const contextView = useContextViewEle({ render: renderContextMenu });
    const onClickMenuItem = useCallback((e, item) => {
        onContextMenuClick === null || onContextMenuClick === void 0 ? void 0 : onContextMenuClick(e, item);
        contextView === null || contextView === void 0 ? void 0 : contextView.hide();
    }, [contextMenu]);
    const handleRightClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!contextView)
            return;
        const doms = document.elementsFromPoint(e.pageX, e.pageY);
        const itemDom = doms.find((dom) => dom.classList.contains(itemClassName));
        if (itemDom) {
            const rect = itemDom.getBoundingClientRect();
            const extraContextMenu = contextMenu.concat();
            const targetContextMenu = contextMenu.find((menu) => menu.id === (itemDom === null || itemDom === void 0 ? void 0 : itemDom.id));
            targetContextMenu &&
                extraContextMenu.unshift(...[
                    {
                        id: itemDom.id,
                        icon: 'check',
                        name: targetContextMenu.name,
                    },
                    {
                        type: 'divider',
                    },
                ]);
            contextView.show({
                x: rect.x + rect.width / 2,
                y: rect.y + rect.height,
            }, () => (React.createElement(Menu, { role: "menu", onClick: onClickMenuItem, data: extraContextMenu })));
        }
        else {
            contextView.show({ x: e.pageX, y: e.pageY });
        }
    };
    return (React.createElement("div", { className: defaultClassName, onContextMenu: handleRightClick, id: ID_ACTIVITY_BAR },
        React.createElement("div", { className: containerClassName },
            React.createElement(Scrollbar, { className: normalItemsClassName },
                React.createElement("ul", null, normalBarItems.map(renderItems))),
            React.createElement("ul", { className: globalItemsClassName }, globalBarItems.map(renderItems)))));
}
export default ActivityBar;
