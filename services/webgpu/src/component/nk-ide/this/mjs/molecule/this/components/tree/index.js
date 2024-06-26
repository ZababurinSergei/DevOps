import React, { useState, useRef, useCallback, useLayoutEffect, useEffect, } from 'react';
import { Icon } from './../../../this/components/icon';
import { debounce } from 'lodash';
import { classNames } from './../../../this/common/className';
import TreeNode from './treeNode';
import { activeTreeNodeClassName, defaultTreeClassName, defaultTreeNodeClassName, expandTreeNodeClassName, unexpandTreeNodeClassName, } from './base';
import { TreeViewUtil } from './../../../this/common/treeUtil';
const TreeView = ({ className, data = [], draggable = false, loadedKeys, expandKeys: controlExpandKeys, activeKey: controlActiveKey, onExpand, onDropTree, onRightClick, renderTitle, // custom title
onSelect, onLoadData, onTreeClick, }) => {
    const [expandKeys, setExpandKeys] = useState([]);
    const [activeKey, setActiveKey] = useState(null);
    const [loadingKeys, setLoadingKeys] = useState([]);
    const dragOverNode = useRef();
    const dragInfo = useRef({ x: 0, y: 0, dragNode: null, flattenTree: null });
    const wrapper = useRef(null);
    const canLoadData = (key) => {
        if (!onLoadData)
            return false;
        if (loadedKeys === null || loadedKeys === void 0 ? void 0 : loadedKeys.includes(key))
            return false;
        return true;
    };
    const validatorLoadingData = (node) => {
        const uuid = node.id.toString();
        if (canLoadData(uuid)) {
            setLoadingKeys((keys) => {
                const nextKeys = keys.concat();
                nextKeys.push(uuid);
                return nextKeys;
            });
            onLoadData(node).finally(() => {
                setLoadingKeys((keys) => {
                    const nextKeys = keys.concat();
                    const index = nextKeys.indexOf(uuid);
                    nextKeys.splice(index, 1);
                    return nextKeys;
                });
            });
        }
    };
    const handleExpandKey = (key, node) => {
        const nextExpandKeys = (controlExpandKeys || expandKeys).concat();
        const index = nextExpandKeys.findIndex((e) => e === key);
        if (index > -1) {
            nextExpandKeys.splice(index, 1);
        }
        else {
            nextExpandKeys.push(key);
        }
        onExpand
            ? onExpand(nextExpandKeys.concat(), node)
            : setExpandKeys(nextExpandKeys.concat());
    };
    const handleNodeClick = (node, e) => {
        e.stopPropagation();
        const uuid = node.id.toString();
        setActiveKey(uuid);
        if (!node.isLeaf) {
            // load data
            validatorLoadingData(node);
            // expand node
            handleExpandKey(uuid, node);
        }
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(node);
    };
    const renderIcon = (icon, isLeaf, isExpand, isLoading) => {
        if (isLeaf) {
            return icon || null;
        }
        if (isLoading) {
            return React.createElement(Icon, { type: "loading~spin" });
        }
        return React.createElement(Icon, { type: isExpand ? 'chevron-down' : 'chevron-right' });
    };
    const handleRightClick = (e, info) => {
        e.stopPropagation();
        onRightClick === null || onRightClick === void 0 ? void 0 : onRightClick(e, info);
    };
    const onWindowDragEnd = useCallback((event) => {
        handleDragEnd(event, null, true);
        window.removeEventListener('dragend', onWindowDragEnd);
    }, []);
    const handleDragStart = (e, node) => {
        dragInfo.current = {
            x: e.clientX,
            y: e.clientY,
            dragNode: node,
            flattenTree: new TreeViewUtil({
                id: Number.MAX_SAFE_INTEGER,
                children: data,
            }),
        };
        // unfolder current node
        const uuid = node.id.toString();
        const idx = (controlExpandKeys || expandKeys).indexOf(uuid);
        if (idx > -1) {
            const next = expandKeys.concat();
            next.splice(idx, 1);
            onExpand ? onExpand(next, node) : setExpandKeys(next);
        }
        window.addEventListener('dragend', onWindowDragEnd);
    };
    const handleDragEnter = debounce((e, node) => {
        // expand the non-leaf node
        const uuid = node.id.toString();
        const isExpand = (controlExpandKeys || expandKeys).includes(uuid);
        const dragNode = dragInfo.current.dragNode;
        const dragNodeUuid = dragNode.id.toString();
        const isSelfNode = uuid === dragNodeUuid;
        if (!node.isLeaf &&
            !isSelfNode &&
            !isExpand &&
            !canLoadData(uuid)) {
            handleExpandKey(uuid, node);
        }
    }, 300);
    const addOverClassViaNode = (node) => {
        const uuid = node.id.toString();
        const parentDom = document.querySelector(`div[data-key="${uuid}"]`);
        let dom = parentDom;
        while (dom) {
            if (!dom.classList.contains('drag-over')) {
                dom.classList.add('drag-over');
            }
            const nextSibling = dom.nextElementSibling;
            if ((nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.dataset.indent) === parentDom.dataset.indent) {
                dom = null;
            }
            else {
                dom = nextSibling;
            }
        }
    };
    const clearOverClass = () => {
        var _a;
        (_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.drag-over').forEach((dom) => {
            dom.classList.remove('drag-over');
        });
    };
    const getParentNodeViaNode = (node) => {
        var _a, _b;
        const treeUtils = dragInfo.current.flattenTree;
        const parentId = (_a = treeUtils.getHashMap(node.id)) === null || _a === void 0 ? void 0 : _a.parent;
        const parent = (_b = treeUtils.getHashMap(parentId)) === null || _b === void 0 ? void 0 : _b.node;
        return parent;
    };
    const handleDragOver = (e, node) => {
        const parent = node.isLeaf ? getParentNodeViaNode(node) : node;
        if (parent !== dragOverNode.current) {
            clearOverClass();
            dragOverNode.current = parent;
            addOverClassViaNode(parent);
        }
    };
    const handleDragEnd = (event, node, outsideTree = false) => {
        if (!outsideTree) {
            // drop inside the tree
        }
        clearOverClass();
        dragOverNode.current = undefined;
        // reset dragging status
        dragInfo.current = { x: 0, y: 0, dragNode: null, flattenTree: null };
    };
    const handleDrop = (e, node) => {
        if (node.isLeaf) {
            // Can't drag into a file, so the target would to be the parent of this target
            const parentNode = getParentNodeViaNode(node);
            const dragParent = getParentNodeViaNode(dragInfo.current.dragNode);
            const parentUuid = (parentNode.key || parentNode.id).toString();
            const dragParentUuid = (dragParent.key || dragParent.id).toString();
            // prevent to drop node into same level
            if (parentUuid === dragParentUuid) {
                dragInfo.current = {
                    x: 0,
                    y: 0,
                    dragNode: null,
                    flattenTree: null,
                };
                return;
            }
            onDropTree === null || onDropTree === void 0 ? void 0 : onDropTree(dragInfo.current.dragNode, parentNode);
        }
        else {
            const dragParent = getParentNodeViaNode(dragInfo.current.dragNode);
            const parentUuid = (dragParent.key || dragParent.id).toString();
            const nodeUuid = node.id.toString();
            const dragNode = dragInfo.current.dragNode;
            const dragUuid = dragNode.id.toString();
            // prevent the situations like
            // 1. drag a node into parentNode
            // 2. drag a folder node into self
            if (parentUuid === nodeUuid || dragUuid === nodeUuid) {
                dragInfo.current = {
                    x: 0,
                    y: 0,
                    dragNode: null,
                    flattenTree: null,
                };
                return;
            }
            onDropTree === null || onDropTree === void 0 ? void 0 : onDropTree(dragInfo.current.dragNode, node);
        }
        dragInfo.current = { x: 0, y: 0, dragNode: null, flattenTree: null };
    };
    const renderTreeNode = (data, indent) => {
        return data.map((item, index) => {
            const uuid = item.id.toString();
            const isExpand = (controlExpandKeys || expandKeys).includes(uuid);
            const isLoading = loadingKeys.includes(uuid);
            const isActive = activeKey === uuid;
            const title = (renderTitle === null || renderTitle === void 0 ? void 0 : renderTitle(item, index, !!item.isLeaf)) || item.name;
            const IconComponent = typeof item.icon === 'string' ? (React.createElement(Icon, { type: item.icon })) : (item.icon);
            const currentNode = (React.createElement(TreeNode, { key: `${uuid}-${indent}`, draggable: draggable, data: item, name: typeof title === 'string' ? title : undefined, indent: indent, className: classNames(defaultTreeNodeClassName, isActive && activeTreeNodeClassName, isExpand
                    ? expandTreeNodeClassName
                    : unexpandTreeNodeClassName), renderIcon: () => renderIcon(IconComponent, !!item.isLeaf, isExpand, isLoading), renderTitle: () => title, onContextMenu: (e) => handleRightClick(e, item), onClick: (e) => handleNodeClick(item, e), onNodeDragStart: draggable ? handleDragStart : undefined, onNodeDragEnter: draggable ? handleDragEnter : undefined, onNodeDragOver: draggable ? handleDragOver : undefined, onNodeDragEnd: draggable ? handleDragEnd : undefined, onNodeDrop: draggable ? handleDrop : undefined }));
            const childrenNode = isExpand &&
                !isLoading &&
                renderTreeNode(item.children || [], indent + 1);
            return [currentNode, childrenNode];
        });
    };
    const handleTreeClick = () => {
        setActiveKey(null);
        onTreeClick === null || onTreeClick === void 0 ? void 0 : onTreeClick();
    };
    useLayoutEffect(() => {
        var _a, _b;
        const cache = [];
        data.forEach((item) => {
            cache.push({ paths: [item], data: item });
        });
        while (cache.length) {
            const { paths, data } = cache.pop();
            const editableChild = (_a = data.children) === null || _a === void 0 ? void 0 : _a.find((child) => child.isEditable);
            if (editableChild) {
                const keys = paths.map((node) => {
                    validatorLoadingData(node);
                    return node.id.toString();
                });
                const nextExpandKeys = Array.from(new Set([...keys, ...(controlExpandKeys || expandKeys)]));
                onExpand
                    ? onExpand(nextExpandKeys, data)
                    : setExpandKeys(nextExpandKeys);
                break;
            }
            else {
                const children = ((_b = data.children) === null || _b === void 0 ? void 0 : _b.map((child) => ({
                    paths: [...paths, child],
                    data: child,
                }))) || [];
                cache.push(...children);
            }
        }
    }, [data]);
    useEffect(() => {
        controlActiveKey && setActiveKey(controlActiveKey.toString());
    }, [controlActiveKey]);
    return (React.createElement("div", { role: "tree", ref: wrapper, draggable: draggable, onClick: handleTreeClick, className: classNames(defaultTreeClassName, className) }, renderTreeNode(data, 0)));
};
export default TreeView;
