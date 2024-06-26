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
import 'reflect-metadata';
import React, { memo, useRef, useEffect, useLayoutEffect } from 'react';
import { select, getEventPosition } from './../../../../this/common/dom';
import Tree from './../../../../this/components/tree';
import { Menu } from './../../../../this/components/menu';
import { Button } from './../../../../this/components/button';
import { useContextMenu } from './../../../../this/components/contextMenu';
import { folderTreeClassName, folderTreeEditClassName, folderTreeInputClassName, } from './base';
import { classNames } from './../../../../this/common/className';
import { Scrollbar, useContextViewEle } from './../../../../this/components';
const detectHasEditableStatus = (data) => {
    const stack = [...data];
    let res = false;
    while (stack.length) {
        const headElm = stack.pop();
        if (headElm === null || headElm === void 0 ? void 0 : headElm.isEditable) {
            res = true;
            break;
        }
        else {
            stack.push(...((headElm === null || headElm === void 0 ? void 0 : headElm.children) || []));
        }
    }
    return res;
};
/**
 * A simple wrapper Input, achieve autoFucus & auto select file name
 */
const Input = React.forwardRef((
// same as raw input
props, ref) => {
    const inputRef = useRef(null);
    useLayoutEffect(() => {
        if (inputRef.current) {
            const ext = (props.defaultValue || '').lastIndexOf('.');
            inputRef.current.selectionStart = 0;
            inputRef.current.selectionEnd =
                // if period at position of 0, then this period means hidden file
                ext > 0
                    ? ext
                    : (props.defaultValue || '').length;
        }
    }, []);
    return React.createElement("input", Object.assign({}, props, { ref: inputRef }));
});
const FolderTree = (props) => {
    var _a;
    const { folderTree = {}, entry, panel, onUpdateFileName, onSelectFile, onDropTree, onClickContextMenu, onRightClick, onLoadData, createTreeNode, onExpandKeys } = props, restProps = __rest(props, ["folderTree", "entry", "panel", "onUpdateFileName", "onSelectFile", "onDropTree", "onClickContextMenu", "onRightClick", "onLoadData", "createTreeNode", "onExpandKeys"]);
    const { data = [], folderPanelContextMenu = [], expandKeys, loadedKeys, current, } = folderTree;
    const inputRef = useRef(null);
    // tree context view
    const contextMenu = useRef();
    // panel context view
    const contextView = useContextViewEle();
    // to detect current tree whether is editable
    const hasEditable = detectHasEditableStatus(data);
    const onClickMenuItem = (e, item) => {
        var _a;
        onClickContextMenu === null || onClickContextMenu === void 0 ? void 0 : onClickContextMenu(item);
        (_a = contextMenu.current) === null || _a === void 0 ? void 0 : _a.hide();
    };
    // init context menu
    const initContextMenu = () => {
        return useContextMenu({
            anchor: select(`.${folderTreeClassName}`),
            render: () => (React.createElement(Menu, { role: "menu", onClick: onClickMenuItem, data: folderPanelContextMenu })),
        });
    };
    const handleMenuClick = (item, data) => {
        onClickContextMenu === null || onClickContextMenu === void 0 ? void 0 : onClickContextMenu(item, data);
        contextView === null || contextView === void 0 ? void 0 : contextView.hide();
    };
    const handleRightClick = (event, data) => {
        if (event.target.nodeName !== 'INPUT') {
            event.preventDefault();
            const menuItems = (onRightClick === null || onRightClick === void 0 ? void 0 : onRightClick(data)) || [];
            menuItems.length &&
                (contextView === null || contextView === void 0 ? void 0 : contextView.show(getEventPosition(event), () => (React.createElement(Menu, { role: "menu", onClick: (_, item) => handleMenuClick(item, data), data: menuItems }))));
        }
    };
    const handleUpdateFile = (e, node) => {
        const newName = e.value;
        onUpdateFileName === null || onUpdateFileName === void 0 ? void 0 : onUpdateFileName(Object.assign(Object.assign({}, node), { name: newName }));
    };
    /**
     * update file info when input blur
     */
    const handleInputBlur = (e, node) => {
        handleUpdateFile(e.target, node);
    };
    /**
     * update file info when press `Enter` or `esc`
     */
    const handleInputKeyDown = (e, node) => {
        if (e.keyCode === 13 || e.keyCode === 27) {
            handleUpdateFile(e.target, node);
        }
    };
    const renderTitle = (node) => {
        const { isEditable, name } = node;
        return isEditable ? (React.createElement(Input, { role: "input", className: folderTreeInputClassName, type: "text", defaultValue: name, ref: inputRef, onKeyDown: (e) => handleInputKeyDown(e, node), autoComplete: "off", autoFocus: true, onBlur: (e) => handleInputBlur(e, node), onClick: (e) => e.stopPropagation() })) : (name);
    };
    const handleTreeClick = () => {
        onSelectFile === null || onSelectFile === void 0 ? void 0 : onSelectFile();
    };
    const handleDropTree = (source, target) => {
        onDropTree === null || onDropTree === void 0 ? void 0 : onDropTree(source, target);
    };
    const handleAddRootFolder = () => {
        createTreeNode === null || createTreeNode === void 0 ? void 0 : createTreeNode('RootFolder');
    };
    useEffect(() => {
        if (folderPanelContextMenu.length > 0) {
            contextMenu.current = initContextMenu();
        }
        return () => {
            var _a;
            (_a = contextMenu.current) === null || _a === void 0 ? void 0 : _a.dispose();
        };
    }, [data.length]);
    const welcomePage = (React.createElement("div", { "data-content": panel.id }, entry ? (React.createElement(React.Fragment, null, entry)) : (React.createElement("div", { style: { padding: '10px 5px' } },
        "you have not yet opened a folder",
        React.createElement(Button, { onClick: handleAddRootFolder }, "Add Folder")))));
    if (!data.length)
        return welcomePage;
    return (React.createElement(Scrollbar, { isShowShadow: true },
        React.createElement("div", { "data-content": panel.id, style: { height: '100%' } },
            React.createElement(Tree
            // root folder do not render
            , Object.assign({ 
                // root folder do not render
                activeKey: current === null || current === void 0 ? void 0 : current.id, expandKeys: expandKeys, loadedKeys: loadedKeys, data: ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.children) || [], className: classNames(folderTreeClassName, hasEditable && folderTreeEditClassName), draggable: !hasEditable, onDropTree: handleDropTree, onSelect: onSelectFile, onTreeClick: handleTreeClick, onRightClick: handleRightClick, renderTitle: renderTitle, onLoadData: onLoadData, onExpand: onExpandKeys }, restProps)))));
};
export default memo(FolderTree);
