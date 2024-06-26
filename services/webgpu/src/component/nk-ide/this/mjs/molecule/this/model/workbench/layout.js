export var Position;
(function (Position) {
    Position["left"] = "left";
    Position["right"] = "right";
})(Position || (Position = {}));
export var MenuBarMode;
(function (MenuBarMode) {
    MenuBarMode["horizontal"] = "horizontal";
    MenuBarMode["vertical"] = "vertical";
})(MenuBarMode || (MenuBarMode = {}));
export var LayoutEvents;
(function (LayoutEvents) {
    LayoutEvents["OnWorkbenchDidMount"] = "workbench.didMount";
})(LayoutEvents || (LayoutEvents = {}));
export class LayoutModel {
    constructor(splitPanePos = [300, 'auto', 300], horizontalSplitPanePos = ['auto', '150px'], groupSplitPos = [], activityBar = { hidden: false }, auxiliaryBar = { hidden: true }, panel = { hidden: false, panelMaximized: false }, statusBar = { hidden: false }, sidebar = { hidden: false, position: Position.left }, menuBar = { hidden: false, mode: MenuBarMode.vertical }, editorGroupDirection = MenuBarMode.vertical) {
        this.splitPanePos = splitPanePos;
        this.horizontalSplitPanePos = horizontalSplitPanePos;
        this.groupSplitPos = groupSplitPos;
        this.activityBar = activityBar;
        this.auxiliaryBar = auxiliaryBar;
        this.panel = panel;
        this.statusBar = statusBar;
        this.sidebar = sidebar;
        this.menuBar = menuBar;
        this.editorGroupDirection = editorGroupDirection;
    }
}
