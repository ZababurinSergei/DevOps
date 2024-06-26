export var ExplorerEvent;
(function (ExplorerEvent) {
    ExplorerEvent["onClick"] = "explorer.onClick";
    ExplorerEvent["onPanelToolbarClick"] = "explorer.onPanelToolbarClick";
    ExplorerEvent["onCollapseChange"] = "explorer.onCollapseChange";
    ExplorerEvent["onRemovePanel"] = "explorer.onRemovePanel";
    ExplorerEvent["onCollapseAllFolders"] = "explorer.onCollapseAllFolders";
})(ExplorerEvent || (ExplorerEvent = {}));
export class IExplorerModel {
    constructor(data = [], headerToolBar, activePanelKeys) {
        this.data = data;
        this.headerToolBar = headerToolBar;
        this.activePanelKeys = activePanelKeys;
    }
}
