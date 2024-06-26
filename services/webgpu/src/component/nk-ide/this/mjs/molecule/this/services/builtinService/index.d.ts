import 'reflect-metadata';
import { constants, modules } from './const';
declare type IBuiltinModuleProps<T = any> = {
    id: string;
    module: () => T;
    /**
     * Before excuting the module, the value is empty
     */
    value?: T;
    active: boolean;
};
declare type IBuiltinConstantProps = {
    id: string;
    value: string;
    active: boolean;
};
export declare type IBuiltinProps = IBuiltinModuleProps & IBuiltinConstantProps;
export interface IBuiltinService {
    /**
     * Mark the specific constant as inactive
     * @deprecated we're considering the necessary of this method, because it's useless for now to inactive a constant
     */
    inactiveConstant(id: keyof typeof constants): boolean;
    /**
     * Mark the specific module as inactive
     */
    inactiveModule(id: keyof typeof modules): boolean;
    /**
     * Get the specific constant by id
     */
    getConstant(id: keyof typeof constants): IBuiltinConstantProps | undefined;
    /**
     * Get all constants
     */
    getConstants(): Partial<typeof constants>;
    /**
     * Get the specific module by id
     */
    getModule<T>(id: keyof typeof modules): IBuiltinModuleProps<T> | undefined;
    /**
     * Get all modules
     */
    getModules(): any;
    /**
     * Reset all constants and modules
     */
    reset(): void;
}
export declare class BuiltinService implements IBuiltinService {
    private builtinConstants;
    private builtinModules;
    constructor();
    private initialize;
    private addConstant;
    private addModules;
    getConstant(id: keyof typeof constants): IBuiltinConstantProps | undefined;
    getConstants(): Record<Partial<"PANEL_PROBLEMS" | "STATUS_PROBLEMS" | "SAMPLE_FOLDER_PANEL_ID" | "EDITOR_PANEL_ID" | "OUTLINE_PANEL_ID" | "OUTLINE_PANEL_MORE_DESC" | "EXPLORER_ACTIVITY_ITEM" | "EXPLORER_ACTION_TITLE" | "EXPLORER_TOGGLE_VERTICAL" | "EXPLORER_TOGGLE_SAVE_ALL" | "EXPLORER_TOGGLE_CLOSE_ALL_EDITORS" | "EXPLORER_TOGGLE_SAVE_GROUP" | "EXPLORER_TOGGLE_CLOSE_GROUP_EDITORS" | "NEW_FILE_COMMAND_ID" | "NEW_FOLDER_COMMAND_ID" | "COLLAPSE_COMMAND_ID" | "RENAME_COMMAND_ID" | "REMOVE_COMMAND_ID" | "DELETE_COMMAND_ID" | "OPEN_TO_SIDE_COMMAND_ID" | "FIND_IN_WORKSPACE_ID" | "DOWNLOAD_COMMAND_ID" | "EDITOR_MENU_CLOSE_TO_RIGHT" | "EDITOR_MENU_CLOSE_TO_LEFT" | "EDITOR_MENU_CLOSE_ALL" | "EDITOR_MENU_CLOSE_OTHERS" | "EDITOR_MENU_CLOSE_SAVED" | "EDITOR_MENU_CLOSE" | "EDITOR_MENU_SHOW_OPENEDITORS" | "EDITOR_MENU_SPILIT" | "SETTING_ID" | "PROBLEM_MODEL_ID" | "PROBLEM_MODEL_NAME" | "NOTIFICATION_CLEAR_ALL_ID" | "NOTIFICATION_HIDE_ID" | "NOTIFICATION_MODEL_ID" | "NOTIFICATION_MODEL_NAME" | "STATUS_BAR_HIDE_ID" | "SEARCH_CASE_SENSITIVE_COMMAND_ID" | "SEARCH_WHOLE_WORD_COMMAND_ID" | "SEARCH_REGULAR_EXPRESSION_COMMAND_ID" | "SEARCH_PRESERVE_CASE_COMMAND_ID" | "SEARCH_REPLACE_ALL_COMMAND_ID" | "SEARCH_ACTIVITY_ITEM" | "SEARCH_TOOLBAR_REFRESH" | "SEARCH_TOOLBAR_CLEAR" | "SEARCH_TOOLBAR_COLLAPSE" | "PANEL_TOOLBOX_CLOSE" | "PANEL_TOOLBOX_RESIZE" | "PANEL_TOOLBOX_RESTORE_SIZE" | "PANEL_OUTPUT" | "MENU_APPEARANCE_ID" | "MENU_FILE_OPEN" | "MENU_QUICK_COMMAND" | "MENU_VIEW_MENUBAR" | "MENU_VIEW_AUXILIARY" | "MENU_VIEW_ACTIVITYBAR" | "MENU_VIEW_STATUSBAR" | "MENU_VIEW_PANEL" | "ACTION_QUICK_COMMAND" | "ACTION_QUICK_SELECT_ALL" | "ACTION_QUICK_COPY_LINE_UP" | "ACTION_QUICK_UNDO" | "ACTION_QUICK_REDO" | "ACTION_QUICK_CREATE_FILE" | "ACTION_QUICK_CREATE_FOLDER" | "ACTION_QUICK_ACCESS_SETTINGS" | "ACTION_SELECT_THEME" | "ACTION_SELECT_LOCALE" | "ACTIVITY_BAR_GLOBAL_SETTINGS" | "ACTIVITY_BAR_GLOBAL_ACCOUNT" | "CONTEXT_MENU_MENU" | "CONTEXT_MENU_EXPLORER" | "CONTEXT_MENU_SEARCH" | "CONTEXT_MENU_HIDE" | "MENUBAR_MODE_HORIZONTAL" | "MENUBAR_MODE_VERTICAL" | "MENUBAR_MENU_MODE_DIVIDER">, string | undefined>;
    inactiveConstant(id: keyof typeof constants): boolean;
    inactiveModule(id: keyof typeof modules): boolean;
    getModule(id: keyof typeof modules): IBuiltinModuleProps<any> | undefined;
    getModules(): any;
    reset(): void;
}
export default BuiltinService;
