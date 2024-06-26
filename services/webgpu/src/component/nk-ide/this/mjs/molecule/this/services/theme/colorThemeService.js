/**
 * VSCode theme extends guides: https://code.visualstudio.com/api/extension-guides/color-theme
 * https://code.visualstudio.com/api/references/theme-color
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { ColorThemeMode, ColorScheme, ColorThemeEvent, } from './../../../this/model/colorTheme';
import { singleton } from 'tsyringe';
import { editor as monacoEditor } from './../../../this/monaco';
import { applyStyleSheetRules } from './../../../this/common/css';
import { getThemeData, convertToCSSVars } from './helper';
import logger from './../../../this/common/logger';
import { prefixClaName } from './../../../this/common/className';
import { searchById, colorLightOrDark } from './../../../this/common/utils';
import { GlobalEvent } from './../../../this/common/event';
/**
 * @ignore
 */
export const BuiltInColorTheme = {
    id: 'Default Dark+',
    name: 'Default Dark+',
    label: 'Default Dark+',
    uiTheme: 'vs-dark',
};
/**
 * @ignore
 */
export const DEFAULT_THEME_CLASS_NAME = prefixClaName('customize-theme');
let ColorThemeService = class ColorThemeService extends GlobalEvent {
    constructor() {
        super();
        this.colorThemes = [BuiltInColorTheme];
        this.colorTheme = BuiltInColorTheme;
        if (this.colorTheme) {
            this.setTheme(this.colorTheme.id);
        }
    }
    addThemes(themes) {
        const nextThemes = Array.isArray(themes) ? themes : [themes];
        nextThemes.forEach((theme) => {
            const targetTheme = this.getThemeById(theme.id);
            if (targetTheme) {
                logger.warn(`There has ${theme.name} already in theme, it'll update this theme otherwise please don't add the duplicated theme`);
                this.updateTheme(theme);
            }
            else {
                this.colorThemes.push(Object.assign({}, theme));
            }
        });
    }
    updateTheme(theme) {
        if (!theme.id) {
            logger.error("Update the theme failed!  The 'id' is required in the theme data.");
        }
        const index = this.colorThemes.findIndex(searchById(theme.id));
        if (index > -1) {
            Object.assign(this.colorThemes[index], theme);
            // If current theme be updated, then reload it
            if (this.colorThemes[index].id === this.getColorTheme().id) {
                this.reload();
            }
        }
        else {
            logger.error(`Update the theme failed! There is no theme found via '${theme.id}'`);
        }
    }
    getThemeById(id) {
        const target = this.colorThemes.find(searchById(id));
        return target ? Object.assign({}, target) : undefined;
    }
    getColorTheme() {
        return Object.assign({}, this.colorTheme);
    }
    setTheme(id) {
        const prevTheme = this.getColorTheme();
        const theme = this.getThemeById(id);
        if (theme) {
            this.colorTheme = Object.assign({}, theme);
            const themeData = getThemeData(theme);
            const styleSheetContent = convertToCSSVars(themeData.colors);
            applyStyleSheetRules(styleSheetContent, DEFAULT_THEME_CLASS_NAME);
            // Update monaco-editor theme
            monacoEditor.defineTheme(DEFAULT_THEME_CLASS_NAME, themeData);
            monacoEditor.setTheme(DEFAULT_THEME_CLASS_NAME);
            const themeMode = this.getColorThemeMode();
            this.emit(ColorThemeEvent.onChange, prevTheme, Object.assign({}, this.colorTheme), themeMode);
        }
        else {
            logger.error(`Can't get the theme by id:` + id);
        }
    }
    getThemes() {
        return this.colorThemes;
    }
    reload() {
        this.setTheme(this.getColorTheme().id);
    }
    reset() {
        this.colorThemes = [BuiltInColorTheme];
        this.setTheme(BuiltInColorTheme.id);
    }
    getColorThemeMode() {
        const { colors, type } = this.colorTheme;
        // Try to get colorThemeMode from type
        if (type === ColorScheme.DARK || type === ColorScheme.HIGH_CONTRAST) {
            return ColorThemeMode.dark;
        }
        else if (type === ColorScheme.LIGHT) {
            return ColorThemeMode.light;
        }
        // Try to get colorThemeMode from background color
        const background = (colors === null || colors === void 0 ? void 0 : colors['editor.background']) ||
            (colors === null || colors === void 0 ? void 0 : colors['tab.activeBackground']) ||
            (colors === null || colors === void 0 ? void 0 : colors['molecule.welcomeBackground']);
        if (background) {
            return colorLightOrDark(background);
        }
        // Default dark
        return ColorThemeMode.dark;
    }
    onChange(callback) {
        this.subscribe(ColorThemeEvent.onChange, callback);
    }
};
ColorThemeService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ColorThemeService);
export { ColorThemeService };
