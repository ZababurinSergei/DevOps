export var EditorEvent;
(function (EditorEvent) {
    EditorEvent["OnCloseTab"] = "editor.closeTab";
    EditorEvent["OnCloseAll"] = "editor.closeAll";
    EditorEvent["OnCloseOther"] = "editor.closeOther";
    EditorEvent["OnCloseToLeft"] = "editor.closeToLeft";
    EditorEvent["OnCloseToRight"] = "editor.closeToRight";
    EditorEvent["OnMoveTab"] = "editor.moveTab";
    EditorEvent["OpenTab"] = "editor.openTab";
    EditorEvent["OnSelectTab"] = "editor.selectTab";
    EditorEvent["OnUpdateTab"] = "editor.updateTab";
    EditorEvent["onActionsClick"] = "editor.actionsClick";
    EditorEvent["OnSplitEditorRight"] = "editor.splitEditorRight";
    EditorEvent["onEditorInstanceMount"] = "editor.onEditorInstanceMount";
})(EditorEvent || (EditorEvent = {}));
export class EditorGroupModel {
    constructor(id, tab, activeTab, data, actions = [], menu = [], editorInstance) {
        this.id = id;
        this.data = data;
        this.menu = menu;
        this.actions = actions;
        this.tab = tab;
        this.activeTab = activeTab;
        this.editorInstance = editorInstance;
    }
}
export class EditorModel {
    constructor(current = null, groups = [], entry, editorOptions = {}) {
        this.current = current;
        this.groups = groups;
        this.entry = entry;
        this.editorOptions = editorOptions;
    }
}
