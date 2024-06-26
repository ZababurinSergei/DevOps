import React, { useLayoutEffect, useRef } from 'react';
import { Icon, Menu, Toolbar, useContextView, Scrollbar, } from './../../../../this/components';
import { editorTreeActiveItemClassName, editorTreeClassName, editorTreeCloseIconClassName, editorTreeFileIconClassName, editorTreeFileNameClassName, editorTreeFilePathClassName, editorTreeGroupClassName, editorTreeItemClassName, } from './base';
import { classNames } from './../../../../this/common/className';
import { getEventPosition } from './../../../../this/common/dom';
import { localize } from './../../../../this/i18n/localize';
import { HEADER_HEIGTH, MAX_GROW_HEIGHT, } from './../../../../this/components/collapse';
import { constants } from './../../../../this/services/builtinService/const';
const EditorTree = (props) => {
    var _a;
    const { current, groups, groupToolbar, contextMenu = [], headerContextMenu, panel, onSelect, onSaveGroup, onContextMenu, onCloseGroup, onClose, onToolbarClick, } = props;
    const wrapper = useRef(null);
    const scrollable = useRef(null);
    // scroll into view
    useLayoutEffect(() => {
        var _a, _b, _c;
        const scrollHeight = ((_a = scrollable.current) === null || _a === void 0 ? void 0 : _a.scrollHeight) || 0;
        if (scrollHeight > MAX_GROW_HEIGHT - HEADER_HEIGTH) {
            const activeItem = (_b = wrapper.current) === null || _b === void 0 ? void 0 : _b.querySelector(`.${editorTreeActiveItemClassName}`);
            if (activeItem) {
                const top = activeItem.offsetTop;
                (_c = scrollable.current) === null || _c === void 0 ? void 0 : _c.scrollTo(top);
            }
        }
    }, [(current === null || current === void 0 ? void 0 : current.id) && ((_a = current.tab) === null || _a === void 0 ? void 0 : _a.id)]);
    if (!groups || !groups.length)
        return null;
    const contextView = useContextView();
    const handleCloseClick = (group, file) => {
        onClose === null || onClose === void 0 ? void 0 : onClose(file.id, group.id);
    };
    const handleItemClick = (group, file) => {
        var _a;
        if (group.id !== (current === null || current === void 0 ? void 0 : current.id) || file.id !== ((_a = current === null || current === void 0 ? void 0 : current.tab) === null || _a === void 0 ? void 0 : _a.id)) {
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(file.id, group.id);
        }
    };
    const handleOnMenuClick = (menu, group, file) => {
        contextView.hide();
        onContextMenu === null || onContextMenu === void 0 ? void 0 : onContextMenu(menu, group.id, file);
    };
    const handleRightClick = (e, group, file) => {
        e.preventDefault();
        contextView.show(getEventPosition(e), () => (React.createElement(Menu, { role: "menu", onClick: (_, item) => handleOnMenuClick(item, group, file), data: contextMenu })));
    };
    const handleHeaderRightClick = (e, group) => {
        e.preventDefault();
        const groupHeaderContext = headerContextMenu || contextMenu;
        contextView.show(getEventPosition(e), () => (React.createElement(Menu, { role: "menu", onClick: (_, item) => handleOnMenuClick(item, group), data: groupHeaderContext })));
    };
    // click group title will open the first file in this group
    const handleGroupClick = (e, group) => {
        var _a;
        const { target } = e;
        const firstFile = (_a = group.data) === null || _a === void 0 ? void 0 : _a[0];
        if (target.nextElementSibling && firstFile) {
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(firstFile.id, group.id);
            target.nextElementSibling.focus();
        }
    };
    const handleToolBarClick = (e, item, group) => {
        e.stopPropagation();
        switch (item.id) {
            case constants.EXPLORER_TOGGLE_CLOSE_GROUP_EDITORS:
                onCloseGroup === null || onCloseGroup === void 0 ? void 0 : onCloseGroup(group.id);
                break;
            case constants.EXPLORER_TOGGLE_SAVE_GROUP:
                onSaveGroup === null || onSaveGroup === void 0 ? void 0 : onSaveGroup(group.id);
                break;
            default:
                // default behavior
                onToolbarClick === null || onToolbarClick === void 0 ? void 0 : onToolbarClick(item, group.id);
                break;
        }
    };
    return (React.createElement(Scrollbar, { ref: scrollable, isShowShadow: true },
        React.createElement("div", { className: editorTreeClassName, ref: wrapper, "data-content": panel.id }, groups.map((group, index) => {
            var _a;
            return (React.createElement(React.Fragment, { key: index },
                groups.length !== 1 && (React.createElement("div", { className: editorTreeGroupClassName, onClick: (e) => handleGroupClick(e, group), onContextMenu: (e) => handleHeaderRightClick(e, group), key: index },
                    localize('sidebar.explore.openEditor.group', 'Group', (index + 1).toString()),
                    groupToolbar && (React.createElement(Toolbar, { data: groupToolbar, onClick: (e, item) => handleToolBarClick(e, item, group) })))), (_a = group.data) === null || _a === void 0 ? void 0 :
                _a.map((file) => {
                    var _a, _b, _c, _d, _e;
                    const isActive = group.id === (current === null || current === void 0 ? void 0 : current.id) &&
                        file.id === ((_a = current === null || current === void 0 ? void 0 : current.tab) === null || _a === void 0 ? void 0 : _a.id);
                    return (React.createElement("div", { title: ((_b = file.data) === null || _b === void 0 ? void 0 : _b.path) &&
                            `${(_c = file.data) === null || _c === void 0 ? void 0 : _c.path}/${file.name}`, className: classNames(editorTreeItemClassName, isActive &&
                            editorTreeActiveItemClassName), tabIndex: 0, key: `${index}_${file.id}`, onClick: () => handleItemClick(group, file), onContextMenu: (e) => handleRightClick(e, group, file) },
                        React.createElement(Icon, { className: editorTreeCloseIconClassName, onClick: () => handleCloseClick(group, file), type: "close" }),
                        React.createElement(Icon, { className: editorTreeFileIconClassName, type: ((_d = file.data) === null || _d === void 0 ? void 0 : _d.icon) || file.icon }),
                        React.createElement("span", { className: editorTreeFileNameClassName }, file.name),
                        React.createElement("span", { className: editorTreeFilePathClassName }, (_e = file.data) === null || _e === void 0 ? void 0 : _e.path)));
                })));
        }))));
};
export { EditorTree };
