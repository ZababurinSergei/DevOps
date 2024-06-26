export var EditorTreeEvent;
(function (EditorTreeEvent) {
    EditorTreeEvent["onClose"] = "editorTree.close";
    EditorTreeEvent["onSelect"] = "editorTree.select";
    EditorTreeEvent["onCloseOthers"] = "editorTree.closeOthers";
    EditorTreeEvent["onCloseSaved"] = "editorTree.closeSaved";
    EditorTreeEvent["onCloseAll"] = "editorTree.closeAll";
    EditorTreeEvent["onSaveAll"] = "editorTree.saveAll";
    EditorTreeEvent["onSplitEditorLayout"] = "editorTree.splitEditorLayout";
    EditorTreeEvent["onToolbarClick"] = "editorTree.toolbarClick";
    EditorTreeEvent["onContextMenu"] = "editorTree.contextMenuClick";
})(EditorTreeEvent || (EditorTreeEvent = {}));
export class EditorTree {
    constructor() { }
}
