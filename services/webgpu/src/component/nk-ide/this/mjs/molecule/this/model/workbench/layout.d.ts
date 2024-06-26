export declare enum Position {
    left = "left",
    right = "right"
}
export declare enum MenuBarMode {
    horizontal = "horizontal",
    vertical = "vertical"
}
export declare enum LayoutEvents {
    OnWorkbenchDidMount = "workbench.didMount"
}
export interface ViewVisibility {
    hidden: boolean;
}
export interface IPanelViewState extends ViewVisibility {
    panelMaximized: boolean;
}
export interface ISidebarViewState extends ViewVisibility {
    position: keyof typeof Position;
}
export interface IMenuBarViewState extends ViewVisibility {
    mode: keyof typeof MenuBarMode;
}
export interface ILayout {
    splitPanePos: (number | string)[];
    horizontalSplitPanePos: (number | string)[];
    activityBar: ViewVisibility;
    auxiliaryBar: ViewVisibility;
    panel: IPanelViewState;
    statusBar: ViewVisibility;
    sidebar: ISidebarViewState;
    menuBar: IMenuBarViewState;
    groupSplitPos: (number | string)[];
    editorGroupDirection: MenuBarMode;
}
export declare class LayoutModel implements ILayout {
    splitPanePos: (number | string)[];
    horizontalSplitPanePos: (number | string)[];
    groupSplitPos: (number | string)[];
    activityBar: ViewVisibility;
    auxiliaryBar: ViewVisibility;
    panel: IPanelViewState;
    statusBar: ViewVisibility;
    sidebar: ISidebarViewState;
    menuBar: IMenuBarViewState;
    editorGroupDirection: MenuBarMode;
    constructor(splitPanePos?: (number | string)[], horizontalSplitPanePos?: string[], groupSplitPos?: never[], activityBar?: {
        hidden: boolean;
    }, auxiliaryBar?: {
        hidden: boolean;
    }, panel?: {
        hidden: boolean;
        panelMaximized: boolean;
    }, statusBar?: {
        hidden: boolean;
    }, sidebar?: {
        hidden: boolean;
        position: Position;
    }, menuBar?: {
        hidden: boolean;
        mode: MenuBarMode;
    }, editorGroupDirection?: MenuBarMode);
}
