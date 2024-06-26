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
import { SettingsEvent, SettingsModel } from './../../this/model/settings';
import { singleton, container } from 'tsyringe';
import { flatObject, mergeObjects, normalizeFlattedObject, } from './../../this/common/utils';
import { EditorService } from './workbench';
import { GlobalEvent } from './../../this/common/event';
import { ColorThemeService, } from './theme/colorThemeService';
import { LocaleService } from './../../this/i18n';
import { cloneDeep, isEqual } from 'lodash';
import { BuiltinService } from './builtinService';
let SettingsService = class SettingsService extends GlobalEvent {
    constructor() {
        super();
        this.editorService = container.resolve(EditorService);
        this.localeService = container.resolve(LocaleService);
        this.colorThemeService = container.resolve(ColorThemeService);
        this.builtinService = container.resolve(BuiltinService);
        this.settings = this.getBuiltInSettings();
    }
    getBuiltInSettings() {
        const editorOptions = this.editorService.getState().editorOptions;
        const theme = this.colorThemeService.getColorTheme();
        const locale = this.localeService.getCurrentLocale();
        return new SettingsModel(theme.id, editorOptions, locale === null || locale === void 0 ? void 0 : locale.id);
    }
    getDefaultSettingsTab() {
        const { BuiltInSettingsTab } = this.builtinService.getModules();
        return Object.assign({}, BuiltInSettingsTab);
    }
    onChangeSettings(callback) {
        this.subscribe(SettingsEvent.OnChange, callback);
    }
    update(settings) {
        this.applySettings(settings);
        const oldSettings = cloneDeep(this.settings);
        this.settings = mergeObjects(oldSettings, settings);
    }
    append(settings) {
        this.update(settings);
    }
    getSettings() {
        const builtInSettings = this.getBuiltInSettings();
        return Object.assign({}, this.settings, builtInSettings);
    }
    applySettings(nextSettings) {
        const oldSettings = this.settings;
        const { colorTheme, locale, editor } = nextSettings;
        if (colorTheme && colorTheme !== oldSettings.colorTheme) {
            this.colorThemeService.setTheme(colorTheme);
        }
        if (locale && locale !== oldSettings.locale) {
            this.localeService.setCurrentLocale(locale);
        }
        if (editor && !isEqual(editor, oldSettings.editor)) {
            this.editorService.updateEditorOptions(editor);
        }
    }
    openSettingsInEditor() {
        const { BuiltInSettingsTab } = this.builtinService.getModules();
        if (BuiltInSettingsTab) {
            BuiltInSettingsTab.data.value = this.flatObject2JSONString(this.getSettings());
            this.editorService.open(BuiltInSettingsTab);
        }
    }
    normalizeFlatObject(jsonStr) {
        try {
            const obj = JSON.parse(jsonStr);
            return normalizeFlattedObject(obj);
        }
        catch (e) {
            throw new Error(`SettingsService.normalizeFlatJSONObject error: ${e}`);
        }
    }
    flatObject(obj) {
        return flatObject(obj);
    }
    flatObject2JSONString(obj) {
        return this.toJSONString(this.flatObject(obj));
    }
    toJSONString(obj, space = 4) {
        try {
            return JSON.stringify(obj, null, space);
        }
        catch (e) {
            throw new Error(`SettingsService.toJSONString error: ${e}`);
        }
    }
};
SettingsService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], SettingsService);
export { SettingsService };
