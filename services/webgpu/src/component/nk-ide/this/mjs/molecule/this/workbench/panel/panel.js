import React from 'react';
import { getBEMElement, prefixClaName } from './../../../this/common/className';
import { Tabs } from './../../../this/components/tabs';
import { ActionBar } from './../../../this/components/actionBar';
const defaultClassName = prefixClaName('panel');
const panelHeaderClassName = getBEMElement(defaultClassName, 'header');
const panelToolbarClassName = getBEMElement(defaultClassName, 'toolbar');
const panelContainerClassName = getBEMElement(defaultClassName, 'container');
export function Panel(props) {
    var _a;
    const { data, current, toolbox, onTabChange, onToolbarClick, onClose } = props;
    let toolboxData = toolbox || [];
    if (current && current.toolbox) {
        toolboxData = current.toolbox.concat(toolboxData);
    }
    const content = typeof (current === null || current === void 0 ? void 0 : current.renderPane) === 'function'
        ? (_a = current === null || current === void 0 ? void 0 : current.renderPane) === null || _a === void 0 ? void 0 : _a.call(current, current)
        : current === null || current === void 0 ? void 0 : current.renderPane;
    const sortedPanels = data === null || data === void 0 ? void 0 : data.sort((a, b) => {
        if (a.sortIndex && b.sortIndex) {
            return a.sortIndex - b.sortIndex;
        }
        return 0;
    });
    return (React.createElement("div", { className: defaultClassName },
        React.createElement("div", { className: panelHeaderClassName },
            React.createElement(Tabs, { activeTab: current === null || current === void 0 ? void 0 : current.id, data: sortedPanels, onSelectTab: onTabChange, onCloseTab: onClose }),
            React.createElement(ActionBar, { className: panelToolbarClassName, data: toolboxData, onClick: onToolbarClick })),
        React.createElement("div", { className: panelContainerClassName, tabIndex: 0 }, content)));
}
export default Panel;
