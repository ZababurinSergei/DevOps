import type { IActionBarItemProps, IMenuItemProps } from './../../../this/components';
import type { IActivityBarItem, IActivityMenuItemProps, IEditorActionsProps, IEditorOptions, IEditorTab, IExplorerPanelItem, IOutput, IPanelItem, IStatusBarItem } from './../../../this/model';
export declare const constants: {
    PANEL_PROBLEMS: string;
    STATUS_PROBLEMS: string;
    SAMPLE_FOLDER_PANEL_ID: string;
    EDITOR_PANEL_ID: string;
    OUTLINE_PANEL_ID: string;
    OUTLINE_PANEL_MORE_DESC: string;
    EXPLORER_ACTIVITY_ITEM: string;
    EXPLORER_ACTION_TITLE: string;
    EXPLORER_TOGGLE_VERTICAL: string;
    EXPLORER_TOGGLE_SAVE_ALL: string;
    EXPLORER_TOGGLE_CLOSE_ALL_EDITORS: string;
    EXPLORER_TOGGLE_SAVE_GROUP: string;
    EXPLORER_TOGGLE_CLOSE_GROUP_EDITORS: string;
    NEW_FILE_COMMAND_ID: string;
    NEW_FOLDER_COMMAND_ID: string;
    COLLAPSE_COMMAND_ID: string;
    RENAME_COMMAND_ID: string;
    REMOVE_COMMAND_ID: string;
    DELETE_COMMAND_ID: string;
    OPEN_TO_SIDE_COMMAND_ID: string;
    FIND_IN_WORKSPACE_ID: string;
    DOWNLOAD_COMMAND_ID: string;
    EDITOR_MENU_CLOSE_TO_RIGHT: string;
    EDITOR_MENU_CLOSE_TO_LEFT: string;
    EDITOR_MENU_CLOSE_ALL: string;
    EDITOR_MENU_CLOSE_OTHERS: string;
    EDITOR_MENU_CLOSE_SAVED: string;
    EDITOR_MENU_CLOSE: string;
    EDITOR_MENU_SHOW_OPENEDITORS: string;
    EDITOR_MENU_SPILIT: string;
    SETTING_ID: string;
    PROBLEM_MODEL_ID: string;
    PROBLEM_MODEL_NAME: string;
    NOTIFICATION_CLEAR_ALL_ID: string;
    NOTIFICATION_HIDE_ID: string;
    NOTIFICATION_MODEL_ID: string;
    NOTIFICATION_MODEL_NAME: string;
    STATUS_BAR_HIDE_ID: string;
    SEARCH_CASE_SENSITIVE_COMMAND_ID: string;
    SEARCH_WHOLE_WORD_COMMAND_ID: string;
    SEARCH_REGULAR_EXPRESSION_COMMAND_ID: string;
    SEARCH_PRESERVE_CASE_COMMAND_ID: string;
    SEARCH_REPLACE_ALL_COMMAND_ID: string;
    SEARCH_ACTIVITY_ITEM: string;
    SEARCH_TOOLBAR_REFRESH: string;
    SEARCH_TOOLBAR_CLEAR: string;
    SEARCH_TOOLBAR_COLLAPSE: string;
    PANEL_TOOLBOX_CLOSE: string;
    PANEL_TOOLBOX_RESIZE: string;
    PANEL_TOOLBOX_RESTORE_SIZE: string;
    PANEL_OUTPUT: string;
    MENU_APPEARANCE_ID: string;
    MENU_FILE_OPEN: string;
    MENU_QUICK_COMMAND: string;
    MENU_VIEW_MENUBAR: string;
    MENU_VIEW_AUXILIARY: string;
    MENU_VIEW_ACTIVITYBAR: string;
    MENU_VIEW_STATUSBAR: string;
    MENU_VIEW_PANEL: string;
    ACTION_QUICK_COMMAND: string;
    ACTION_QUICK_SELECT_ALL: string;
    ACTION_QUICK_COPY_LINE_UP: string;
    ACTION_QUICK_UNDO: string;
    ACTION_QUICK_REDO: string;
    ACTION_QUICK_CREATE_FILE: string;
    ACTION_QUICK_CREATE_FOLDER: string;
    ACTION_QUICK_ACCESS_SETTINGS: string;
    ACTION_SELECT_THEME: string;
    ACTION_SELECT_LOCALE: string;
    ACTIVITY_BAR_GLOBAL_SETTINGS: string;
    ACTIVITY_BAR_GLOBAL_ACCOUNT: string;
    CONTEXT_MENU_MENU: string;
    CONTEXT_MENU_EXPLORER: string;
    CONTEXT_MENU_SEARCH: string;
    CONTEXT_MENU_HIDE: string;
    MENUBAR_MODE_HORIZONTAL: string;
    MENUBAR_MODE_VERTICAL: string;
    MENUBAR_MENU_MODE_DIVIDER: string;
};
export declare const modules: {
    builtInExplorerActivityItem: () => IActivityBarItem;
    builtInExplorerFolderPanel: () => IExplorerPanelItem;
    builtInExplorerHeaderToolbar: () => IActionBarItemProps<any>;
    builtInExplorerEditorPanel: () => IExplorerPanelItem;
    builtInExplorerOutlinePanel: () => IExplorerPanelItem;
    BuiltInEditorOptions: () => IEditorOptions;
    builtInEditorInitialActions: () => IEditorActionsProps[];
    builtInEditorInitialMenu: () => IMenuItemProps[];
    builtInEditorTreeHeaderContextMenu: () => IMenuItemProps[];
    builtInEditorTreeContextMenu: () => IMenuItemProps[];
    BuiltInSettingsTab: () => IEditorTab<{
        language: string;
        value: string;
    }>;
    builtInStatusProblems: () => IStatusBarItem<any>;
    builtInPanelProblems: () => IPanelItem<any>;
    NOTIFICATION_CLEAR_ALL: () => IActionBarItemProps<any>;
    NOTIFICATION_HIDE: () => IActionBarItemProps<any>;
    builtInNotification: () => IStatusBarItem<any>;
    STATUS_EDITOR_INFO: () => {
        id: string;
        sortIndex: number;
        data: {
            ln: number;
            col: number;
        };
        name: string;
    };
    CONTEXT_MENU_HIDE_STATUS_BAR: () => IMenuItemProps;
    builtInSearchActivityItem: () => IActivityBarItem;
    builtInHeaderToolbar: () => IActionBarItemProps<any>[];
    builtInSearchAddons: () => IActionBarItemProps<any>[];
    builtInReplaceAddons: () => IActionBarItemProps<any>[];
    builtInOutputPanel: () => IOutput;
    builtInPanelToolboxResize: () => IActionBarItemProps<any>;
    builtInPanelToolboxReStore: () => IActionBarItemProps<any>;
    builtInPanelToolbox: () => IActionBarItemProps<any>;
    builtInMenuBarData: () => IMenuItemProps[];
    quickAcessViewAction: () => {
        id: string;
    };
    quickSelectColorThemeAction: () => {
        id: string;
    };
    quickAccessSettingsAction: () => {
        id: string;
    };
    quickSelectLocaleAction: () => {
        id: string;
    };
    quickTogglePanelAction: () => {
        id: string;
    };
    quickSelectAllAction: () => {
        id: string;
    };
    quickCopyLineUpAction: () => {
        id: string;
    };
    quickUndoAction: () => {
        id: string;
    };
    quickRedoAction: () => {
        id: string;
    };
    quickCreateFileAction: () => {
        id: string;
    };
    COMMON_CONTEXT_MENU: () => IMenuItemProps[];
    BASE_CONTEXT_MENU: () => IMenuItemProps[];
    ROOT_FOLDER_CONTEXT_MENU: () => IMenuItemProps[];
    FILE_CONTEXT_MENU: () => IMenuItemProps[];
    FOLDER_PANEL_CONTEXT_MENU: () => IMenuItemProps[];
    activityBarData: () => IActivityBarItem[];
    contextMenuData: () => IActivityMenuItemProps[];
};
