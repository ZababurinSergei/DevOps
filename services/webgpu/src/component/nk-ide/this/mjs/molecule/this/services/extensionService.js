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
import { singleton, container } from 'tsyringe';
import { ErrorMsg } from './../../this/common/error';
import { IContributeType } from './../../this/model/extension';
import { LocaleService } from './../../this/i18n';
import logger from './../../this/common/logger';
import { ColorThemeService, } from './theme/colorThemeService';
import { MonacoService } from './../../this/monaco/monacoService';
import { searchById } from './../../this/common/utils';
import { registerAction2 } from './../../this/monaco/action';
let ExtensionService = class ExtensionService {
    constructor() {
        this.extensions = [];
        /**
         * TODO: This property is used for marking the extensions were loaded
         * we are going to refactor this logic after redesign the Molecule lifecycle.
         */
        this._isLoaded = false;
        this.colorThemeService = container.resolve(ColorThemeService);
        this.monacoService = container.resolve(MonacoService);
        this.localeService = container.resolve(LocaleService);
    }
    setLoaded(flag) {
        this._isLoaded = flag !== undefined ? flag : true;
    }
    isLoaded() {
        return this._isLoaded;
    }
    getExtension(id) {
        return this.extensions.find(searchById(id));
    }
    reset() {
        this.extensions = [];
    }
    getAllExtensions() {
        return this.extensions.concat();
    }
    add(extensions) {
        if (!extensions || (extensions === null || extensions === void 0 ? void 0 : extensions.length) === 0)
            return null;
        /**
         * Filtered the exist Extensions
         */
        const unloadExtensions = extensions.filter((ext) => {
            const isExist = this.extensions.find(searchById(ext.id));
            if (isExist) {
                logger.warn('Warning: Unable to load the existed Extension:' + ext.id);
            }
            return !isExist;
        });
        if (unloadExtensions.length > 0) {
            this.extensions = this.extensions.concat(unloadExtensions);
        }
        return unloadExtensions;
    }
    load(extensions) {
        try {
            // First add the extensions
            const unloadExtensions = this.add(extensions);
            if (!unloadExtensions)
                return;
            // Then activate
            this.activate(unloadExtensions);
        }
        catch (e) {
            logger.error(ErrorMsg.LoadExtensionFail, e);
        }
    }
    loadContributes(contributes) {
        const contributeKeys = Object.keys(contributes);
        contributeKeys.forEach((type) => {
            switch (type) {
                case IContributeType.Themes: {
                    const themes = contributes[type];
                    if (!themes)
                        return;
                    return this.colorThemeService.addThemes(themes);
                }
                case IContributeType.Languages: {
                    const locales = contributes[type];
                    if (!locales)
                        return;
                    return this.localeService.addLocales(locales);
                }
            }
        });
    }
    registerAction(ActionClass) {
        return registerAction2(ActionClass);
    }
    executeCommand(id, ...args) {
        this.monacoService.commandService.executeCommand(id, ...args);
    }
    activate(extensions) {
        if (extensions.length === 0)
            return;
        const ctx = this;
        extensions === null || extensions === void 0 ? void 0 : extensions.forEach((extension, index) => {
            // Ignore the inactive or invalid extension
            if (!extension || this.isInactive(extension))
                return;
            if (extension.activate) {
                extension.activate(ctx);
            }
            if (extension.contributes) {
                this.loadContributes(extension.contributes);
            }
        });
    }
    dispose(extensionId) {
        var _a;
        const ctx = this;
        const extIndex = this.extensions.findIndex(searchById(extensionId));
        if (extIndex > -1) {
            const extension = this.extensions[extIndex];
            (_a = extension.dispose) === null || _a === void 0 ? void 0 : _a.call(extension, ctx);
            this.extensions.splice(extIndex, 1);
        }
    }
    disposeAll() {
        this.extensions.forEach((ext) => {
            var _a;
            (_a = ext.dispose) === null || _a === void 0 ? void 0 : _a.call(ext, this);
        });
        this.reset();
    }
    inactive(predicate) {
        this._inactive = predicate;
    }
    isInactive(extension) {
        if (this._inactive && typeof this._inactive === 'function') {
            return this._inactive(extension);
        }
        return false;
    }
    splitLanguagesExts(extensions) {
        const languagesExts = [];
        const others = [];
        extensions.forEach((ext) => {
            var _a;
            if ((_a = ext.contributes) === null || _a === void 0 ? void 0 : _a.languages) {
                languagesExts.push(ext);
            }
            else {
                others.push(ext);
            }
        });
        return [languagesExts, others];
    }
};
ExtensionService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ExtensionService);
export { ExtensionService };
