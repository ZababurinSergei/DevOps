/**
 * VSCode theme extends guides: https://code.visualstudio.com/api/extension-guides/color-theme
 * https://code.visualstudio.com/api/references/theme-color
 */
import 'reflect-metadata';
import { IColorTheme, ColorThemeMode } from './../../../this/model/colorTheme';
import { GlobalEvent } from './../../../this/common/event';
export interface IColorThemeService {
    /**
     * Add themes into `colorThemes`
     *
     * This will update the duplicated themes found in `colorThemes`
     * @param themes
     */
    addThemes(themes: IColorTheme | IColorTheme[]): void;
    /**
     * Set the current Color Theme via id,
     * Please ensure the theme could be found in `colorThemes`
     * @param id The `id` is required
     */
    setTheme(id: string): void;
    /**
     * Update specific theme,
     * @param theme The `id` is required in theme
     */
    updateTheme(theme: IColorTheme): void;
    /**
     * Get all themes in `colorThemes`
     */
    getThemes(): IColorTheme[];
    /**
     * Get specific theme via id
     * @param id
     */
    getThemeById(id: string): IColorTheme | undefined;
    /**
     * Get the current Color Theme
     */
    getColorTheme(): IColorTheme;
    /**
     * Reload current theme
     */
    reload(): void;
    /**
     * Reset theme
     */
    reset(): void;
    /**
     * Get the mode('dark' or 'light') of the current Color Theme
     */
    getColorThemeMode(): ColorThemeMode;
    /**
     * Listen to the theme changed event
     * @param callback
     */
    onChange(callback: (prev: IColorTheme, next: IColorTheme, themeMode: ColorThemeMode) => void): void;
}
/**
 * @ignore
 */
export declare const BuiltInColorTheme: IColorTheme;
/**
 * @ignore
 */
export declare const DEFAULT_THEME_CLASS_NAME: string;
export declare class ColorThemeService extends GlobalEvent implements IColorThemeService {
    private colorThemes;
    private colorTheme;
    constructor();
    addThemes(themes: IColorTheme | IColorTheme[]): void;
    updateTheme(theme: IColorTheme): void;
    getThemeById(id: string): IColorTheme | undefined;
    getColorTheme(): IColorTheme;
    setTheme(id: string): void;
    getThemes(): IColorTheme[];
    reload(): void;
    reset(): void;
    getColorThemeMode(): ColorThemeMode;
    onChange(callback: (prev: IColorTheme, next: IColorTheme, themeMode: ColorThemeMode) => void): void;
}
