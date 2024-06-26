export var Float;
(function (Float) {
    Float["left"] = "left";
    Float["right"] = "right";
})(Float || (Float = {}));
/**
 * The activity bar event definition
 */
export var StatusBarEvent;
(function (StatusBarEvent) {
    /**
     * Selected an activity bar
     */
    StatusBarEvent["onClick"] = "statusBar.onClick";
    /**
     * Activity bar data changed
     */
    StatusBarEvent["DataChanged"] = "statusBar.data";
})(StatusBarEvent || (StatusBarEvent = {}));
export class StatusBarModel {
    constructor(leftItems = [], rightItems = [], contextMenu = []) {
        this.leftItems = [];
        this.rightItems = [];
        this.leftItems = leftItems;
        this.rightItems = rightItems;
        this.contextMenu = contextMenu;
    }
}
