import 'reflect-metadata';
export var FileTypes;
(function (FileTypes) {
    FileTypes["File"] = "File";
    FileTypes["Folder"] = "Folder";
    FileTypes["RootFolder"] = "RootFolder";
})(FileTypes || (FileTypes = {}));
export var FolderTreeEvent;
(function (FolderTreeEvent) {
    FolderTreeEvent["onSelectFile"] = "folderTree.onSelectFile";
    FolderTreeEvent["onDelete"] = "folderTree.onDelete";
    FolderTreeEvent["onRename"] = "folderTree.onRename";
    FolderTreeEvent["onUpdateFileName"] = "folderTree.onUpdateFileName";
    FolderTreeEvent["onRightClick"] = "folderTree.onRightClick";
    FolderTreeEvent["onContextMenuClick"] = "folderTree.onContextMenuClick";
    FolderTreeEvent["onCreate"] = "folderTree.onCreate";
    FolderTreeEvent["onLoadData"] = "folderTree.onLoadData";
    FolderTreeEvent["onDrop"] = "folderTree.onDrop";
    FolderTreeEvent["onExpandKeys"] = "folderTree.onExpandKeys";
})(FolderTreeEvent || (FolderTreeEvent = {}));
export class TreeNodeModel {
    constructor(props) {
        this.fileType = FileTypes.File;
        const { id, name = '', location = '', fileType = FileTypes.File, children = [], icon = '', isEditable = false, content = '', isLeaf = true, data, } = props;
        this.fileType = fileType;
        this.isEditable = isEditable;
        this.name = name;
        this.id = id;
        this.location = location;
        this.children = children;
        this.icon = icon;
        this.content = content;
        this.data = data;
        this.isLeaf = isLeaf;
    }
}
export class IFolderTreeModel {
    constructor(folderTree = {
        contextMenu: [],
        current: null,
        folderPanelContextMenu: [],
        data: [],
        expandKeys: [],
    }, autoSort = false, entry) {
        this.folderTree = folderTree;
        this.entry = entry;
        this.autoSort = autoSort;
    }
}
