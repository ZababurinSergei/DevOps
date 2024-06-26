import { IEditorOptions } from './workbench';
/**
 * The Settings configuration event definition
 */
export declare enum SettingsEvent {
    /**
     * The settings content changed
     */
    OnChange = "settings.onchange"
}
export interface ISettings {
    colorTheme?: string;
    editor?: IEditorOptions;
    locale?: string;
    [index: string]: any;
}
export declare class SettingsModel implements ISettings {
    colorTheme: string;
    editor: IEditorOptions;
    locale?: string;
    constructor(colorTheme: string, editor: IEditorOptions, locale?: string);
    [key: string]: any;
}
