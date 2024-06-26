import React from 'react';
import { memo } from 'react';
import { getBEMElement, prefixClaName } from './../../../this/common/className';
const defaultClassName = prefixClaName('sidebar');
const paneClassName = getBEMElement(defaultClassName, 'pane');
const headerClassName = getBEMElement(defaultClassName, 'header');
const titleClassName = getBEMElement(defaultClassName, 'title');
const contentClassName = getBEMElement(defaultClassName, 'content');
const toolbarClassName = getBEMElement(defaultClassName, 'toolbar');
export const Header = memo(function Header(props) {
    return (React.createElement("header", { className: headerClassName },
        React.createElement("div", { className: titleClassName },
            React.createElement("h2", null, props.title)),
        React.createElement("div", { className: toolbarClassName }, props.toolbar || null)));
});
export function Content(props) {
    return React.createElement("div", { className: contentClassName }, props.children);
}
export function Sidebar(props) {
    const { panes = [], current } = props;
    const sidebarPane = panes === null || panes === void 0 ? void 0 : panes.map((pane) => {
        return (React.createElement("div", { key: pane.id, "data-id": pane.id, style: {
                visibility: pane.id === current ? 'visible' : 'hidden',
                zIndex: pane.id === current ? 1 : -1,
            }, className: paneClassName }, pane.render ? pane.render() : null));
    });
    return React.createElement("div", { className: defaultClassName }, sidebarPane);
}
