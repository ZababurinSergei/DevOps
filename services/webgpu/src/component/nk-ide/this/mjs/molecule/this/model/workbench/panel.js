export var PanelEvent;
(function (PanelEvent) {
    PanelEvent["onTabChange"] = "panel.onTabChange";
    PanelEvent["onToolbarClick"] = "panel.onToolbarClick";
    PanelEvent["onTabClose"] = "panel.onTabClose";
})(PanelEvent || (PanelEvent = {}));
export class PanelModel {
    constructor(current = null, data = [], toolbox = []) {
        this.hidden = false;
        this.maximize = false;
        this.current = current;
        this.data = data;
        this.toolbox = toolbox;
    }
}
