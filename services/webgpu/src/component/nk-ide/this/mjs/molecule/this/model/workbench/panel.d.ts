import { editor as MonacoEditor } from './../../../this/monaco';
import { IActionBarItemProps } from './../../../this/components/actionBar';
import { ITabProps } from './../../../this/components/tabs/tab';
export interface IPanelItem<T = any> extends ITabProps<T> {
    /**
     * The same as HTMLElement title attribute
     */
    title?: string;
    toolbox?: IActionBarItemProps[];
    data?: T;
    /**
     * The sort of panel item
     */
    sortIndex?: number;
}
export declare enum PanelEvent {
    onTabChange = "panel.onTabChange",
    onToolbarClick = "panel.onToolbarClick",
    onTabClose = "panel.onTabClose"
}
export interface IPanel {
    current?: IPanelItem | null;
    data?: IPanelItem[];
    toolbox?: IActionBarItemProps[];
}
export interface IOutput extends IPanelItem {
    outputEditorInstance?: MonacoEditor.IStandaloneCodeEditor;
    onUpdateEditorIns?(editorInstance: MonacoEditor.IStandaloneCodeEditor): void;
}
export declare class PanelModel implements IPanel {
    current: IPanelItem | null;
    data: IPanelItem[];
    hidden: boolean;
    maximize: boolean;
    toolbox: IActionBarItemProps[];
    constructor(current?: IPanelItem | null, data?: IPanelItem[], toolbox?: IActionBarItemProps[]);
}
