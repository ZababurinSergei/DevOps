import React, { useRef } from 'react';
import { indentClassName, indentGuideClassName, treeNodeTitleClassName, } from './base';
const INDENT = 8;
export default ({ data, indent, className, name, renderIcon, renderTitle, draggable, onContextMenu, onClick, onNodeDragStart, onNodeDragEnter, onNodeDragOver, onNodeDrop, onNodeDragEnd, }) => {
    const uuid = data.id;
    const ref = useRef(null);
    const handleDragStart = (e) => {
        e.stopPropagation();
        onNodeDragStart === null || onNodeDragStart === void 0 ? void 0 : onNodeDragStart(e, data);
        try {
            // ie throw error
            // firefox-need-it
            e.dataTransfer.setData('text/plain', '');
        }
        catch (error) {
            // empty
        }
    };
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onNodeDragEnter === null || onNodeDragEnter === void 0 ? void 0 : onNodeDragEnter(e, data);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onNodeDragOver === null || onNodeDragOver === void 0 ? void 0 : onNodeDragOver(e, data);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onNodeDrop === null || onNodeDrop === void 0 ? void 0 : onNodeDrop(e, data);
    };
    const handleDragEnd = (e) => {
        e.stopPropagation();
        onNodeDragEnd === null || onNodeDragEnd === void 0 ? void 0 : onNodeDragEnd(e, data);
    };
    // calculate key automatically via parent path and self id
    const nodeKey = `${indent ? indent + '_' : ''}${data.id}`;
    return (React.createElement("div", { ref: ref, key: `${uuid}-${indent}`, tabIndex: 0, "data-indent": indent, "data-key": uuid, "data-id": `mo_treeNode_${nodeKey}`, className: className, title: name, draggable: draggable, onContextMenu: onContextMenu, onClick: onClick, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnter: handleDragEnter, onDragEnd: handleDragEnd, onDrop: handleDrop },
        React.createElement("div", { className: indentClassName, style: { width: INDENT * indent } }, new Array(indent).fill('').map((_, index) => (React.createElement("div", { key: index, className: indentGuideClassName })))),
        renderIcon(),
        React.createElement("span", { className: treeNodeTitleClassName }, renderTitle())));
};
