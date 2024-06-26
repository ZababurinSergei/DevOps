/**
 * The activity bar event definition
 */
export var ActivityBarEvent;
(function (ActivityBarEvent) {
    ActivityBarEvent["OnClick"] = "activityBar.onClick";
    ActivityBarEvent["OnChange"] = "activityBar.onChange";
    /**
     * Activity bar data changed
     */
    ActivityBarEvent["DataChanged"] = "activityBar.data";
    ActivityBarEvent["ReRender"] = "activityBar.reRender";
})(ActivityBarEvent || (ActivityBarEvent = {}));
export class ActivityBarModel {
    constructor(data = [], contextMenu = [], selected = '') {
        this.data = data;
        this.contextMenu = contextMenu;
        this.selected = selected;
    }
}
