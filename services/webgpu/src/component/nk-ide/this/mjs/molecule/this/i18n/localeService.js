var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LocaleService_1;
import { APP_PREFIX } from './../../this/common/const';
import logger from './../../this/common/logger';
import { LocalizationEvent } from './../../this/i18n/localization';
import { Component } from './../../this/react';
import { singleton } from 'tsyringe';
export const STORE_KEY = `${APP_PREFIX}.localeId`;
export const DEFAULT_LOCALE_ID = `${APP_PREFIX}.defaultLocaleId`;
let LocaleService = LocaleService_1 = class LocaleService extends Component {
    constructor() {
        super();
        this.state = {};
        this._locales = new Map();
    }
    reset() {
        localStorage.removeItem(STORE_KEY);
        this._current = undefined;
        this._locales.clear();
    }
    getLocales() {
        return Array.from(this._locales.values());
    }
    initialize(locales, localeId) {
        this.addLocales(locales);
        if (this._locales.get(localeId)) {
            this._current = this._locales.get(localeId);
        }
        else {
            logger.error(`Cannot initialize the locale with ${localeId}`);
        }
    }
    getCurrentLocale() {
        return this._current && Object.assign({}, this._current);
    }
    getLocale(id) {
        if (!id)
            return;
        return this._locales.get(id);
    }
    removeLocale(id) {
        const locale = this._locales.get(id);
        if (locale !== undefined) {
            if (this._locales.size === 1) {
                logger.error("You can't remove this Locale because there must have one locale at least");
                return undefined;
            }
            if (this._current && this._current.id === locale.id) {
                this._current = this._locales.values().next().value;
            }
            this._locales.delete(id);
            return locale;
        }
        return undefined;
    }
    setCurrentLocale(id) {
        if (this._current && this._current.id === id)
            return true;
        const locale = this._locales.get(id);
        if (locale) {
            this.emit(LocalizationEvent.OnChange, this._current, locale);
            this._current = locale;
            localStorage.setItem(STORE_KEY, locale.id);
            return true;
        }
        return false;
    }
    transformLocaleData(locale) {
        const newLocale = Object.assign({}, locale);
        // Convert a normal Object to a Map
        if (!(locale.source instanceof Map)) {
            newLocale.source = new Map(Object.entries(locale.source));
        }
        // If current locale inherit an exist, merge the parent.
        if (newLocale.inherit) {
            const parent = this._locales.get(newLocale.inherit);
            if (parent) {
                newLocale.source = new Map([
                    ...parent.source,
                    ...newLocale.source,
                ]);
            }
        }
        return newLocale;
    }
    addLocales(locales) {
        if (locales.length > 0) {
            const origin = this._locales;
            locales.forEach((locale) => {
                const key = locale.id;
                if (!origin.has(key)) {
                    origin.set(key, this.transformLocaleData(locale));
                }
            });
        }
    }
    onChange(callback) {
        this.subscribe(LocalizationEvent.OnChange, callback);
    }
    localize(sourceKey, defaultValue = '', ...args) {
        let result = defaultValue;
        if (this._current) {
            result = this._current.source.get(sourceKey) || defaultValue;
        }
        if (args.length) {
            args.forEach((replacedVal) => {
                result = result.replace(LocaleService_1.LOCALIZE_REPLACED_WORD, replacedVal);
            });
        }
        return result;
    }
};
LocaleService.LOCALIZE_REPLACED_WORD = '${i}';
LocaleService = LocaleService_1 = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], LocaleService);
export { LocaleService };
