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
import { Controller } from './../../this/react/controller';
import { container, singleton } from 'tsyringe';
import { BuiltinService, } from './../../this/services';
import { ExtensionService } from './../../this/services/extensionService';
import { CommandQuickAccessViewAction } from './../../this/monaco/quickAccessViewAction';
import { SelectColorThemeAction } from './../../this/monaco/selectColorThemeAction';
import { QuickAccessSettings } from './../../this/monaco/quickAccessSettingsAction';
import { SelectLocaleAction } from './../../this/i18n/selectLocaleAction';
import { CommandQuickSideBarViewAction } from './../../this/monaco/quickToggleSideBarAction';
import { ID_SIDE_BAR } from './../../this/common/id';
import { QuickTogglePanelAction } from './../../this/monaco/quickTogglePanelAction';
import { QuickSelectAllAction } from './../../this/monaco/quickSelectAllAction';
import { QuickCopyLineUp } from './../../this/monaco/quickCopyLineUp';
import { QuickUndo } from './../../this/monaco/quickUndo';
import { QuickRedo } from './../../this/monaco/quickRedo';
import { QuickCreateFile } from './../../this/monaco/quickCreateFile';
let ExtensionController = class ExtensionController extends Controller {
    constructor() {
        super();
        this.extensionService = container.resolve(ExtensionService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { quickAcessViewAction, quickSelectColorThemeAction, quickAccessSettingsAction, quickSelectLocaleAction, quickTogglePanelAction, quickSelectAllAction, quickCopyLineUpAction, quickUndoAction, quickRedoAction, quickCreateFileAction, } = this.builtinService.getModules();
        [
            [quickAcessViewAction, CommandQuickAccessViewAction],
            [quickSelectColorThemeAction, SelectColorThemeAction],
            [quickAccessSettingsAction, QuickAccessSettings],
            [quickSelectLocaleAction, SelectLocaleAction],
            [ID_SIDE_BAR, CommandQuickSideBarViewAction],
            [quickTogglePanelAction, QuickTogglePanelAction],
            [quickSelectAllAction, QuickSelectAllAction],
            [quickCopyLineUpAction, QuickCopyLineUp],
            [quickUndoAction, QuickUndo],
            [quickRedoAction, QuickRedo],
            [quickCreateFileAction, QuickCreateFile],
        ].forEach(([key, action]) => {
            if (key) {
                this.extensionService.registerAction(action);
            }
        });
    }
};
ExtensionController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ExtensionController);
export { ExtensionController };
