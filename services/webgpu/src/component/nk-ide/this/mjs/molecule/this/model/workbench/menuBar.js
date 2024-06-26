/**
 * The activity bar event definition
 */
export var MenuBarEvent;
(function (MenuBarEvent) {
    /**
     * Selected an activity bar
     */
    MenuBarEvent["onSelect"] = "menuBar.onSelect";
    MenuBarEvent["onChangeMode"] = "menuBar.onChangeMode";
})(MenuBarEvent || (MenuBarEvent = {}));
export class MenuBarModel {
    constructor(data = []) {
        this.data = data;
    }
}
