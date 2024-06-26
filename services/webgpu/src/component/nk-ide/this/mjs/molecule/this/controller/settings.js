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
import React from 'react';
import { container, singleton } from 'tsyringe';
import { Controller } from './../../this/react/controller';
import { debounce } from 'lodash';
import { BuiltinService, EditorService, SettingsService, } from './../../this/services';
import { SettingsEvent } from './../../this/model/settings';
import { LocaleService } from './../../this/i18n';
import { NotificationService } from './../../this/services';
import { LocaleNotification } from './../../this/workbench/notification/notificationPane/localeNotification';
let SettingsController = class SettingsController extends Controller {
    constructor() {
        super();
        /**
         * Delay the each Settings change event 600 milliseconds,
         * and then call the `update` and `emit` functions;
         */
        this.onChangeSettings = debounce((args) => {
            this.settingsService.update(args);
            this.emit(SettingsEvent.OnChange, args);
        }, 600);
        this.editorService = container.resolve(EditorService);
        this.settingsService = container.resolve(SettingsService);
        this.localeService = container.resolve(LocaleService);
        this.notificationService = container.resolve(NotificationService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { SETTING_ID } = this.builtinService.getConstants();
        this.editorService.onUpdateTab((tab) => {
            var _a;
            if (tab.id === SETTING_ID) {
                const settingsValue = this.settingsService.normalizeFlatObject(((_a = tab.data) === null || _a === void 0 ? void 0 : _a.value) || '');
                this.onChangeSettings(settingsValue);
            }
        });
        this.localeService.onChange((prev, next) => {
            this.notifyLocaleChanged(prev, next);
        });
    }
    notifyLocaleChanged(prev, next) {
        const { SETTING_ID } = this.builtinService.getConstants();
        const notify = {
            id: SETTING_ID,
            value: next,
            render(value) {
                /* istanbul ignore next */
                return React.createElement(LocaleNotification, { key: next.id, locale: next.name });
            },
        };
        if (!this.notificationService.getState().showNotifications) {
            this.notificationService.toggleNotification();
        }
        this.notificationService.add([notify]);
    }
};
SettingsController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], SettingsController);
export { SettingsController };
