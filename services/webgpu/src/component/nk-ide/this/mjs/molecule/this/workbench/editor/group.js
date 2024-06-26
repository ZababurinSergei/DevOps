import { MonacoEditor } from './../../../this/components/monaco';
import { Tabs } from './../../../this/components/tabs';
import React, { memo, useEffect } from 'react';
import { groupClassName, groupContainerClassName, groupHeaderClassName, groupTabsClassName, } from './base';
import EditorAction from './action';
import EditorBreadcrumb from './breadcrumb';
import { Menu } from './../../../this/components/menu';
import { useContextView } from './../../../this/components/contextView';
import { getEventPosition } from './../../../this/common/dom';
export function EditorGroup(props) {
    var _a, _b;
    const { id, data, tab, currentGroup, group, actions = [], menu = [], onMoveTab, onCloseTab, onClickContextMenu, onChangeEditorProps, onSelectTab, onClickActions, editorOptions, onUpdateEditorIns, } = props;
    const isActiveGroup = id === (currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.id);
    const contextView = useContextView();
    const handleTabContextMenu = (e, tabItem) => {
        const handleOnMenuClick = (e, item) => {
            onClickContextMenu === null || onClickContextMenu === void 0 ? void 0 : onClickContextMenu(e, item, tabItem);
            contextView.hide();
        };
        contextView === null || contextView === void 0 ? void 0 : contextView.show(getEventPosition(e), () => (React.createElement(Menu, { data: menu, onClick: handleOnMenuClick })));
    };
    useEffect(() => {
        return function cleanup() {
            contextView === null || contextView === void 0 ? void 0 : contextView.dispose();
        };
    });
    return (React.createElement("div", { className: groupClassName },
        React.createElement("div", { className: groupHeaderClassName },
            React.createElement("div", { className: groupTabsClassName },
                React.createElement(Tabs, { editable: true, type: "card", data: data, onMoveTab: onMoveTab, onSelectTab: onSelectTab, onContextMenu: handleTabContextMenu, activeTab: isActiveGroup ? tab === null || tab === void 0 ? void 0 : tab.id : '', onCloseTab: onCloseTab })),
            React.createElement(EditorAction, { isActiveGroup: isActiveGroup, actions: actions, menu: menu, onClickActions: onClickActions })),
        React.createElement(EditorBreadcrumb, { breadcrumbs: (tab === null || tab === void 0 ? void 0 : tab.breadcrumb) || [] }),
        React.createElement("div", { className: groupContainerClassName }, 
        // Default we use monaco editor, but also you can customize by renderPanel() function or a react element
        (tab === null || tab === void 0 ? void 0 : tab.renderPane) ? (typeof tab.renderPane === 'function' ? (tab.renderPane(Object.assign({}, tab.data), tab, group)) : (tab.renderPane)) : (React.createElement(MonacoEditor, { options: Object.assign(Object.assign({}, editorOptions), { value: (_a = tab === null || tab === void 0 ? void 0 : tab.data) === null || _a === void 0 ? void 0 : _a.value, language: (_b = tab === null || tab === void 0 ? void 0 : tab.data) === null || _b === void 0 ? void 0 : _b.language, automaticLayout: true }), path: tab === null || tab === void 0 ? void 0 : tab.id.toString(), editorInstanceRef: (editorInstance) => {
                // This assignment will trigger moleculeCtx update, and subNodes update
                onUpdateEditorIns === null || onUpdateEditorIns === void 0 ? void 0 : onUpdateEditorIns(editorInstance, id);
            }, onChangeEditorProps: (preProps, props) => {
                // Listener event for Editor property update
                onChangeEditorProps === null || onChangeEditorProps === void 0 ? void 0 : onChangeEditorProps(preProps, props);
            } })))));
}
export default memo(EditorGroup);
