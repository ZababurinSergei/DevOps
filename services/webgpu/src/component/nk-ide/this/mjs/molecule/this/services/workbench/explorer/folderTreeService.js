var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { singleton, container } from 'tsyringe';
import cloneDeep from 'lodash/cloneDeep';
import { Component } from './../../../../this/react/component';
import { FileTypes, FolderTreeEvent, IFolderTreeModel, } from './../../../../this/model/workbench/explorer/folderTree';
import { TreeViewUtil } from '../../../common/treeUtil';
import { ExplorerService } from './explorerService';
import logger from './../../../../this/common/logger';
import { BuiltinService } from './../../../../this/services';
let FolderTreeService = class FolderTreeService extends Component {
    constructor() {
        super();
        this.fileContextMenu = [];
        this.folderContextMenu = [];
        this.onDropTree = (callback) => {
            this.subscribe(FolderTreeEvent.onDrop, callback);
        };
        this.onRightClick = (callback) => {
            this.subscribe(FolderTreeEvent.onRightClick, callback);
        };
        this.onCreate = (callback) => {
            this.subscribe(FolderTreeEvent.onCreate, callback);
        };
        this.onContextMenu = (callback) => {
            this.subscribe(FolderTreeEvent.onContextMenuClick, callback);
        };
        this.onLoadData = (callback) => {
            this.subscribe(FolderTreeEvent.onLoadData, callback);
        };
        this.onExpandKeys = (callback) => {
            this.subscribe(FolderTreeEvent.onExpandKeys, callback);
        };
        this.state = container.resolve(IFolderTreeModel);
        this.explorerService = container.resolve(ExplorerService);
        this.builtinService = container.resolve(BuiltinService);
    }
    isHiddenFile(file) {
        var _a;
        return !!((_a = file.name) === null || _a === void 0 ? void 0 : _a.startsWith('.'));
    }
    sortTree(tree) {
        tree.sort((pre, cur) => {
            // folder before file
            if (pre.isLeaf !== cur.isLeaf) {
                return pre.isLeaf > cur.isLeaf ? 1 : -1;
            }
            // in general, both have name
            if (pre.name && cur.name) {
                const isHiddenFilePre = Number(this.isHiddenFile(pre));
                const isHiddenFileCur = Number(this.isHiddenFile(cur));
                // one is hidden file and another is not
                if (isHiddenFilePre ^ isHiddenFileCur) {
                    return isHiddenFilePre ? -1 : 1;
                }
                // both are hidden files
                if (isHiddenFilePre & isHiddenFilePre) {
                    // hidden file
                    return pre.name
                        .substring(1)
                        .localeCompare(cur.name.substring(1));
                }
                return pre.name.localeCompare(cur.name);
            }
            // the node which is creating would without name
            return pre.isEditable ? -1 : 1;
        });
        tree.forEach((treeNode) => this.sortTree(treeNode.children || []));
    }
    reset() {
        this.setState({
            folderTree: {
                contextMenu: [],
                current: null,
                folderPanelContextMenu: [],
                data: [],
            },
            entry: undefined,
        });
    }
    getFileContextMenu() {
        return this.fileContextMenu;
    }
    getParentNode(id) {
        var _a, _b;
        const root = (_b = (_a = this.state.folderTree) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b[0];
        if (!root)
            return null;
        const treeHelper = new TreeViewUtil(root);
        const node = treeHelper.getHashMap(id);
        if (!node)
            return null;
        return node.parent ? treeHelper.getNode(node.parent) : null;
    }
    setFileContextMenu(menus) {
        this.fileContextMenu = menus;
    }
    getFolderContextMenu() {
        return this.folderContextMenu;
    }
    setFolderContextMenu(menus) {
        this.folderContextMenu = menus;
    }
    getExpandKeys() {
        var _a;
        return ((_a = this.state.folderTree) === null || _a === void 0 ? void 0 : _a.expandKeys) || [];
    }
    setExpandKeys(expandKeys) {
        const { folderTree } = this.state;
        this.setState({
            folderTree: Object.assign(Object.assign({}, folderTree), { expandKeys }),
        });
    }
    getLoadedKeys() {
        var _a;
        return ((_a = this.state.folderTree) === null || _a === void 0 ? void 0 : _a.loadedKeys) || [];
    }
    setLoadedKeys(loadedKeys) {
        const { folderTree } = this.state;
        this.setState({
            folderTree: Object.assign(Object.assign({}, folderTree), { loadedKeys }),
        });
    }
    setCurrentFolderLocation(data, id) {
        const children = data.children;
        const { tree } = this.getCurrentRootFolderInfo(id);
        // The tree exist in certainly, because it was prejudged in the previous processing
        const parentIndex = tree.getHashMap(id);
        data.location = `${parentIndex.node.location}/${data.name}`;
        if (children === null || children === void 0 ? void 0 : children.length) {
            children.forEach((child) => {
                child.location = `${data.location}/${child.name}`;
            });
        }
    }
    /**
     * Returns the node of root folder in folderTree
     */
    getRootFolderById(id) {
        var _a;
        const stateData = ((_a = this.state.folderTree) === null || _a === void 0 ? void 0 : _a.data) || [];
        for (let index = 0; index < stateData.length; index++) {
            const folder = stateData[index];
            const treeInstance = new TreeViewUtil(folder);
            if (treeInstance.getNode(id)) {
                return folder;
            }
        }
        return null;
    }
    addRootFolder(folder) {
        var _a;
        const { folderTree, autoSort } = this.state;
        if ((_a = folderTree === null || folderTree === void 0 ? void 0 : folderTree.data) === null || _a === void 0 ? void 0 : _a.length) {
            // if root folder exists, then do nothing
            return;
        }
        if (autoSort) {
            this.sortTree(folder.children || []);
        }
        this.setState({
            folderTree: Object.assign(Object.assign({}, folderTree), { data: [folder] }),
        });
        const { SAMPLE_FOLDER_PANEL_ID } = this.builtinService.getConstants();
        this.explorerService.updatePanel({
            id: SAMPLE_FOLDER_PANEL_ID,
            name: folder.name || 'Default Root Folder',
        });
    }
    getRootFolderIndex(id) {
        var _a;
        const data = ((_a = this.state.folderTree) === null || _a === void 0 ? void 0 : _a.data) || [];
        const index = data.findIndex((folder) => folder.id === id);
        return index;
    }
    getCurrentRootFolderInfo(id) {
        const currentRootFolder = this.getRootFolderById(id);
        if (!currentRootFolder) {
            return {
                currentRootFolder: null,
                index: -1,
                tree: null,
            };
        }
        const index = this.getRootFolderIndex(currentRootFolder.id);
        const tree = new TreeViewUtil(currentRootFolder);
        return {
            currentRootFolder,
            index,
            tree,
        };
    }
    // Get the position of file by type
    // We considered by default that the list is sorted in fileType
    getPosOfType(type, folderList) {
        if (!folderList.length)
            return 0;
        if (type === FileTypes.Folder || type === FileTypes.RootFolder) {
            return 0;
        }
        // find the first file type
        const index = folderList.findIndex((list) => list.fileType === FileTypes.File);
        return index === -1 ? folderList.length : index;
    }
    add(data, id) {
        var _a, _b;
        const isRootFolder = data.fileType === 'RootFolder';
        const { autoSort } = this.state;
        if (isRootFolder) {
            this.addRootFolder(data);
            return;
        }
        if (!id && id !== 0)
            throw new Error('File node or folder node both need id');
        const cloneData = ((_a = this.state.folderTree) === null || _a === void 0 ? void 0 : _a.data) || [];
        const { tree, index } = this.getCurrentRootFolderInfo(id);
        // this index is root folder index
        if (index <= -1) {
            logger.error('Please check id again, there is not folder tree');
            return;
        }
        const currentIndex = tree.getHashMap(id);
        if (currentIndex.node.fileType === FileTypes.File) {
            data.location =
                ((_b = currentIndex.node.location) === null || _b === void 0 ? void 0 : _b.replace(/[^\/]+$/, `${data.name}`)) || '';
            const parentNode = tree.getNode(currentIndex.parent);
            const pos = this.getPosOfType(data.fileType, parentNode.children || []);
            tree.insertNode(data, currentIndex.parent, pos);
        }
        else {
            this.setCurrentFolderLocation(data, id);
            const pos = this.getPosOfType(data.fileType, currentIndex.node.children || []);
            tree === null || tree === void 0 ? void 0 : tree.insertNode(data, currentIndex.id, pos);
        }
        cloneData[index] = tree.obj;
        if (autoSort) {
            this.sortTree(cloneData[index].children || []);
        }
        this.setState({
            folderTree: Object.assign(Object.assign({}, this.state.folderTree), { data: cloneDeep(cloneData) }),
        });
    }
    remove(id) {
        var _a;
        const folderTree = cloneDeep(this.getState().folderTree || {});
        const nextData = folderTree.data || [];
        const { tree, index } = this.getCurrentRootFolderInfo(id);
        if (!tree || index === -1) {
            logger.error(`There is unable to find a tree node whose id is ${id}`);
            return;
        }
        tree.removeNode(id);
        if (index > -1)
            nextData[index] = tree.obj;
        // Remove loadedKey while removing node
        if ((_a = folderTree.loadedKeys) === null || _a === void 0 ? void 0 : _a.includes(id.toString())) {
            folderTree.loadedKeys = folderTree.loadedKeys.filter((key) => key !== id.toString());
        }
        this.setState({
            folderTree,
        });
    }
    update(data) {
        const { id } = data, restData = __rest(data, ["id"]);
        const { autoSort } = this.state;
        if (!id && id !== 0)
            throw new Error('Id is required in updating data');
        const folderTree = cloneDeep(this.getState().folderTree || {});
        const nextData = folderTree.data || [];
        const { tree, index } = this.getCurrentRootFolderInfo(id);
        if (!tree) {
            logger.error(`There is unable to find a tree node whose id is ${id}`);
            return;
        }
        tree.updateNode(id, restData);
        if (index > -1) {
            nextData[index] = tree.obj;
            if (autoSort) {
                this.sortTree(nextData[index].children || []);
            }
        }
        this.setState({
            folderTree,
        });
    }
    get(id) {
        const { tree } = this.getCurrentRootFolderInfo(id);
        if (!tree) {
            return null;
        }
        const node = tree.getNode(id);
        return node;
    }
    setActive(id) {
        const { folderTree } = this.state;
        const pendingActiveNode = typeof id === 'undefined' ? null : this.get(id);
        this.setState({
            folderTree: Object.assign(Object.assign({}, folderTree), { current: pendingActiveNode }),
        });
    }
    setEntry(entry) {
        this.setState({
            entry,
        });
    }
    onRename(callback) {
        this.subscribe(FolderTreeEvent.onRename, callback);
    }
    onRemove(callback) {
        this.subscribe(FolderTreeEvent.onDelete, callback);
    }
    onUpdateFileName(callback) {
        this.subscribe(FolderTreeEvent.onUpdateFileName, callback);
    }
    onSelectFile(callback) {
        this.subscribe(FolderTreeEvent.onSelectFile, callback);
    }
    toggleAutoSort() {
        this.setState({ autoSort: !this.state.autoSort });
    }
};
FolderTreeService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], FolderTreeService);
export { FolderTreeService };
