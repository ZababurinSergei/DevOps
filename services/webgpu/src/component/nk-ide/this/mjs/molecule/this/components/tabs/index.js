import React, { useEffect, useRef } from 'react';
import { useCallback } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { prefixClaName, getBEMElement, getBEMModifier, classNames, } from './../../../this/common/className';
import { Tab, tabItemActiveClassName } from './tab';
import { ScrollBar, DirectionKind } from '../scrollBar';
export const tabsClassName = prefixClaName('tabs');
export const tabsHeader = getBEMElement(tabsClassName, 'header');
export function Tabs(props) {
    var _a;
    const { role, activeTab, className, data = [], type = 'line', style, onMoveTab, onCloseTab, onSelectTab, onContextMenu, } = props;
    const tabContainer = useRef(null);
    const scroll = useRef(null);
    const onChangeTab = useCallback((dragIndex, hoverIndex) => {
        const dragTab = data[dragIndex];
        onMoveTab === null || onMoveTab === void 0 ? void 0 : onMoveTab(update(data, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragTab],
            ],
        }));
    }, [data]);
    const handleDrag = (source, target, infos) => {
        const dragIndex = data.indexOf(source);
        const hoverIndex = data.indexOf(target);
        const { hoverClientX, hoverMiddleX } = infos;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // drag down
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return;
        }
        // drag up
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return;
        }
        onChangeTab === null || onChangeTab === void 0 ? void 0 : onChangeTab(dragIndex, hoverIndex);
    };
    useEffect(() => {
        var _a, _b;
        const activeItem = (_a = tabContainer.current) === null || _a === void 0 ? void 0 : _a.querySelector(`.${tabItemActiveClassName}`);
        if (activeItem) {
            const width = ((_b = tabContainer.current) === null || _b === void 0 ? void 0 : _b.clientWidth) || 0;
            const left = activeItem.offsetLeft;
            if (left > width) {
                // Because of useEffect is executed before scroll's ResizeObserver
                setTimeout(() => {
                    var _a;
                    (_a = scroll.current) === null || _a === void 0 ? void 0 : _a.scrollTo(left + activeItem.clientWidth);
                }, 0);
            }
        }
    }, [(_a = tabContainer.current) === null || _a === void 0 ? void 0 : _a.querySelector(`.${tabItemActiveClassName}`)]);
    return (React.createElement(DndProvider, { backend: HTML5Backend, context: window },
        React.createElement("div", { style: style, className: classNames(tabsClassName, getBEMModifier(tabsClassName, type), className), role: role, ref: tabContainer },
            React.createElement(ScrollBar, { className: tabsHeader, direction: DirectionKind.horizontal, ref: scroll, trackStyle: { height: 3 } }, data.map((tab, index) => {
                return (React.createElement(Tab, { key: tab.id, active: activeTab === tab.id, tab: tab, onDrag: handleDrag, onCloseTab: onCloseTab, onContextMenu: onContextMenu, onSelectTab: onSelectTab }));
            })))));
}
