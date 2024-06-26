import React from 'react';
import { memo } from 'react';
import SplitPane from './../../../this/components/split';
import Pane from './../../../this/components/split/pane';
import EditorGroup from './group';
import Welcome from './welcome';
import { defaultEditorClassName } from './base';
export function Editor(props) {
    const { onClickContextMenu, onCloseTab, onMoveTab, onSelectTab, onChangeEditorProps, onClickActions, onUpdateEditorIns, onPaneSizeChange, editor, layout, } = props;
    const { groups = [], current, entry = React.createElement(Welcome, null), editorOptions, } = editor || {};
    const { groupSplitPos, editorGroupDirection } = layout || {};
    const getEvents = (groupId) => {
        return {
            onMoveTab: (tabs) => onMoveTab === null || onMoveTab === void 0 ? void 0 : onMoveTab(tabs, groupId),
            onCloseTab: (tabKey) => onCloseTab === null || onCloseTab === void 0 ? void 0 : onCloseTab(tabKey, groupId),
            onSelectTab: (tabKey) => onSelectTab === null || onSelectTab === void 0 ? void 0 : onSelectTab(tabKey, groupId),
            onClickActions,
            onUpdateEditorIns,
            onChangeEditorProps,
            onClickContextMenu,
        };
    };
    const renderGroups = () => {
        if (groups.length === 1) {
            return (React.createElement(EditorGroup, Object.assign({ editorOptions: editorOptions, currentGroup: current, group: groups[0] }, groups[0], getEvents(groups[0].id))));
        }
        else if (groups.length > 1) {
            return (React.createElement(SplitPane, { sizes: groupSplitPos, split: editorGroupDirection, onChange: onPaneSizeChange }, groups.map((g, index) => (React.createElement(Pane, { key: `group-${index}${g.id}`, minSize: "220px" },
                React.createElement(EditorGroup, Object.assign({ editorOptions: editorOptions, currentGroup: current, group: g }, g, getEvents(g.id))))))));
        }
        return null;
    };
    return (React.createElement("div", { className: defaultEditorClassName }, current ? renderGroups() : entry));
}
export default memo(Editor);
