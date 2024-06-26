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
import React, { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { classNames } from './../../../this/common/className';
import { getDataAttributionsFromProps } from './../../../this/common/dom';
import { collapseActiveClassName, collapseContentClassName, collapseExtraClassName, collapseHeaderClassName, collapseItemClassName, collapsePaneClassName, collapseTitleClassName, collapsingClassName, defaultCollapseClassName, } from './base';
import { Icon } from '../icon';
import { Toolbar } from '../toolbar';
import SplitPane, { Pane } from '../split';
/**
 * It's the max height for the item which set the grow to 0
 */
export const MAX_GROW_HEIGHT = 220;
// default collapse height, only contains header
export const HEADER_HEIGTH = 26;
export function Collapse(_a) {
    var { data = [], activePanelKeys: controlActivePanelKeys, className, title, style, role, onCollapseChange, onToolbarClick, onResize } = _a, restProps = __rest(_a, ["data", "activePanelKeys", "className", "title", "style", "role", "onCollapseChange", "onToolbarClick", "onResize"]);
    const [activePanelKeys, setActivePanelKeys] = useState(new Array(data.length));
    const [collapsing, setCollapsing] = useState(false);
    const wrapper = useRef(null);
    const [sizes, setSizes] = useState(data.map((pane) => (pane.hidden ? 0 : HEADER_HEIGTH)));
    // cache the adjusted size for restoring the adjusted size in next uncollapsing
    const adjustedSize = useRef([]);
    const first = useRef(true);
    const isUndefined = (key) => {
        return key === undefined;
    };
    // compare two sizes to find the change one
    const compareTheSizes = (sizes, otherSizes) => {
        for (let index = 0; index < sizes.length; index++) {
            if (sizes[index] !== otherSizes[index]) {
                return index + 1;
            }
        }
        return -1;
    };
    const handleSplitChange = (nextSizes) => {
        const index = compareTheSizes(sizes, nextSizes);
        if (index === -1) {
            return;
        }
        adjustedSize.current[index] = nextSizes[index];
        onResize === null || onResize === void 0 ? void 0 : onResize(nextSizes);
        setSizes(nextSizes);
    };
    const handleToolbarClick = (e, item, panel) => {
        e.stopPropagation();
        onToolbarClick === null || onToolbarClick === void 0 ? void 0 : onToolbarClick(item, panel);
    };
    const renderPanels = (data, render) => {
        if (render) {
            return render(data);
        }
        return null;
    };
    const handleChangeCallback = (key, index) => {
        const currentKeys = [...activePanelKeys];
        if (!isUndefined(currentKeys[index])) {
            delete currentKeys[index];
        }
        else {
            currentKeys[index] = key;
        }
        onCollapseChange === null || onCollapseChange === void 0 ? void 0 : onCollapseChange(currentKeys);
        setActivePanelKeys(currentKeys.concat());
    };
    // perform smoothly the task to recalculate sizes
    const performSmoothSizes = () => {
        setCollapsing(true);
        performSizes();
        setTimeout(() => {
            setCollapsing(false);
        }, 300);
    };
    // perform the tasks to recalculate sizes
    const performSizes = () => {
        const activeLength = activePanelKeys.filter((v) => !isUndefined(v)).length;
        if (activeLength) {
            const { height } = wrapper.current.getBoundingClientRect();
            let restHeight = height;
            let count = 0;
            // don't care of what the previous sizes are, the next sizes only contains:
            // 1. directly assignment for the next size is collapsing
            // 2. recalculate for the next size is uncollapsing
            const wipSizes = data.map((pane, index) => {
                var _a, _b, _c, _d;
                const isHidden = pane.hidden;
                if (isHidden) {
                    return 0;
                }
                const willCollapsing = activePanelKeys.includes(pane.id);
                if (!willCollapsing) {
                    restHeight = restHeight - HEADER_HEIGTH;
                    return HEADER_HEIGTH;
                }
                // to get the height of content while grow is 0
                if (((_a = pane.config) === null || _a === void 0 ? void 0 : _a.grow) === 0) {
                    const correspondDOM = (_c = (_b = wrapper.current) === null || _b === void 0 ? void 0 : _b.querySelector(`.${collapseContentClassName}[data-collapse-index='${index}']`)) === null || _c === void 0 ? void 0 : _c.querySelector(`[data-content='${pane.id}']`);
                    if (!correspondDOM) {
                        restHeight = restHeight - HEADER_HEIGTH;
                        return HEADER_HEIGTH;
                    }
                    const { height: contentHeight } = correspondDOM.getBoundingClientRect();
                    // for preventing the loss of DOM height, don't set the display to be none for DOM
                    const height = contentHeight + HEADER_HEIGTH;
                    if (height > MAX_GROW_HEIGHT) {
                        restHeight = restHeight - MAX_GROW_HEIGHT;
                        return MAX_GROW_HEIGHT;
                    }
                    restHeight = restHeight - height;
                    return height;
                }
                // there is a cached size
                if (typeof adjustedSize.current[index] !== 'undefined') {
                    restHeight = restHeight - adjustedSize.current[index];
                    return adjustedSize.current[index];
                }
                // count the sum of grow that isn't 0, for how many parts the remaing part should be divided into
                count = count + (((_d = pane.config) === null || _d === void 0 ? void 0 : _d.grow) || 1);
                // auto is a placeholder for calculation in next process
                return 'auto';
            });
            // count the average size for each auto
            const averageHeight = restHeight / count;
            const nextSizes = wipSizes.map((size, index) => {
                var _a;
                return size === 'auto'
                    ? averageHeight * (((_a = data[index].config) === null || _a === void 0 ? void 0 : _a.grow) || 1)
                    : size;
            });
            onResize === null || onResize === void 0 ? void 0 : onResize(nextSizes);
            setSizes(nextSizes);
        }
        else {
            const nextSizes = data.map((pane) => pane.hidden ? 0 : HEADER_HEIGTH);
            onResize === null || onResize === void 0 ? void 0 : onResize(nextSizes);
            setSizes(nextSizes);
        }
    };
    const { nextSashes, allowResize } = useMemo(function () {
        var _a, _b;
        const nextSashes = [];
        for (let i = 1; i < activePanelKeys.length; i++) {
            const prevPaneActive = !isUndefined(activePanelKeys[i - 1]);
            const prePaneAutoHeight = ((_b = (_a = data[i - 1]) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.grow) !== 0;
            const curPaneActive = !isUndefined(activePanelKeys[i]);
            const showSash = prevPaneActive && prePaneAutoHeight && curPaneActive;
            nextSashes.push(showSash);
        }
        return {
            nextSashes,
            allowResize: data.map((pane, index) => {
                var _a;
                if (((_a = pane === null || pane === void 0 ? void 0 : pane.config) === null || _a === void 0 ? void 0 : _a.grow) === 0) {
                    return false;
                }
                return !isUndefined(activePanelKeys[index]);
            }),
        };
    }, [activePanelKeys, data]);
    useLayoutEffect(() => {
        if (!first.current) {
            performSmoothSizes();
        }
        first.current = false;
    }, [activePanelKeys, data]);
    useLayoutEffect(() => {
        Array.isArray(controlActivePanelKeys) &&
            setActivePanelKeys(controlActivePanelKeys);
    }, [controlActivePanelKeys]);
    const dataAttrProps = getDataAttributionsFromProps(restProps);
    return (React.createElement("div", Object.assign({ ref: wrapper, className: classNames(defaultCollapseClassName, className), title: title, style: style, role: role }, dataAttrProps),
        React.createElement(SplitPane, { sizes: sizes, onChange: handleSplitChange, split: "horizontal", allowResize: allowResize, showSashes: nextSashes, paneClassName: classNames(collapsePaneClassName, collapsing && collapsingClassName) }, data.map((panel, index) => {
            const isActive = activePanelKeys.includes(panel.id);
            return (React.createElement(Pane, { key: panel.id, minSize: HEADER_HEIGTH },
                React.createElement("div", { className: classNames(panel.className, collapseItemClassName, isActive && collapseActiveClassName), "data-collapse-id": panel.id },
                    React.createElement("div", { className: collapseHeaderClassName, tabIndex: 0, onClick: () => handleChangeCallback(panel.id, index) },
                        React.createElement(Icon, { type: isActive
                                ? 'chevron-down'
                                : 'chevron-right' }),
                        React.createElement("span", { className: collapseTitleClassName }, panel.name),
                        React.createElement("div", { className: collapseExtraClassName }, isActive && (React.createElement(Toolbar, { key: panel.id, data: panel.toolbar || [], onClick: (e, item) => handleToolbarClick(e, item, panel) })))),
                    React.createElement("div", { className: collapseContentClassName, tabIndex: 0, "data-collapse-index": index }, renderPanels(panel, panel.renderPanel)))));
        }))));
}
