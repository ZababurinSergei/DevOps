export var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus[NotificationStatus["Read"] = 1] = "Read";
    NotificationStatus[NotificationStatus["WaitRead"] = 2] = "WaitRead";
})(NotificationStatus || (NotificationStatus = {}));
export class NotificationModel {
    constructor(id = '', name = '', data = [], sortIndex = 1, showNotifications = false, actionBar = [], render) {
        this.id = id;
        this.name = name;
        this.sortIndex = sortIndex;
        this.render = render;
        this.showNotifications = showNotifications;
        this.data = data;
        this.actionBar = actionBar;
    }
}
