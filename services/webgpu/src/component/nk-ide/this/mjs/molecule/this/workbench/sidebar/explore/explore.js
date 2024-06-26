import React from 'react';
import { Collapse } from './../../../../this/components/collapse';
import { Header, Content } from './../../../../this/workbench/sidebar';
import { Toolbar } from './../../../../this/components/toolbar';
import { defaultExplorerClassName } from './base';
import { localize } from './../../../../this/i18n/localize';
export const Explorer = (props) => {
    const { activePanelKeys, data = [], headerToolBar, onClick, onActionsContextMenuClick, onCollapseChange, onToolbarClick, } = props;
    return (React.createElement("div", { className: defaultExplorerClassName },
        React.createElement(Header, { title: localize('sidebar.explore.title', 'Explorer'), toolbar: React.createElement(Toolbar, { data: [headerToolBar], onClick: onClick, onContextMenuClick: onActionsContextMenuClick }) }),
        React.createElement(Content, null,
            React.createElement(Collapse, { data: data, activePanelKeys: activePanelKeys, onCollapseChange: onCollapseChange, onToolbarClick: onToolbarClick }))));
};
