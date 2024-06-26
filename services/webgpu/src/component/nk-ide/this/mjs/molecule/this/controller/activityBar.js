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
import { MenuBarController } from './../../this/controller';
import { ActivityBarEvent } from './../../this/model';
import { SelectColorThemeAction } from './../../this/monaco/selectColorThemeAction';
import { ActivityBarService, BuiltinService, SettingsService, } from './../../this/services';
import { CommandQuickAccessViewAction } from './../../this/monaco/quickAccessViewAction';
import { MonacoService } from './../../this/monaco/monacoService';
let ActivityBarController = class ActivityBarController extends Controller {
    constructor() {
        super();
        this.onClick = (selectedKey, selctedNode) => {
            this.emit(ActivityBarEvent.OnClick, selectedKey, selctedNode);
        };
        this.onChange = (prevSelected, nextSelected) => {
            this.emit(ActivityBarEvent.OnChange, prevSelected, nextSelected);
        };
        this.onSelectColorTheme = () => {
            this.monacoService.commandService.executeCommand(SelectColorThemeAction.ID);
        };
        this.onContextMenuClick = (e, item) => {
            const contextMenuId = item === null || item === void 0 ? void 0 : item.id;
            const { ACTION_QUICK_COMMAND = '', ACTION_QUICK_ACCESS_SETTINGS = '', ACTION_SELECT_THEME = '', CONTEXT_MENU_MENU = '', CONTEXT_MENU_EXPLORER = '', CONTEXT_MENU_SEARCH = '', CONTEXT_MENU_HIDE, } = this.builtinService.getConstants();
            switch (contextMenuId) {
                // activityBar contextMenu
                case CONTEXT_MENU_MENU: {
                    this.menuBarController.updateMenuBar();
                    this.activityBarService.toggleContextMenuChecked(contextMenuId);
                    break;
                }
                case CONTEXT_MENU_EXPLORER:
                case CONTEXT_MENU_SEARCH: {
                    this.activityBarService.toggleBar(contextMenuId);
                    this.activityBarService.toggleContextMenuChecked(contextMenuId);
                    break;
                }
                case CONTEXT_MENU_HIDE: {
                    this.menuBarController.updateActivityBar();
                    break;
                }
                // manage button contextMenu
                case ACTION_QUICK_COMMAND: {
                    this.gotoQuickCommand();
                    break;
                }
                case ACTION_QUICK_ACCESS_SETTINGS: {
                    this.settingsService.openSettingsInEditor();
                    break;
                }
                case ACTION_SELECT_THEME: {
                    this.onSelectColorTheme();
                    break;
                }
                default: {
                }
            }
        };
        this.activityBarService = container.resolve(ActivityBarService);
        this.settingsService = container.resolve(SettingsService);
        this.monacoService = container.resolve(MonacoService);
        this.menuBarController = container.resolve(MenuBarController);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { activityBarData, contextMenuData } = this.builtinService.getModules();
        if (activityBarData) {
            this.activityBarService.add(activityBarData);
        }
        if (contextMenuData) {
            this.activityBarService.addContextMenu(contextMenuData);
        }
    }
    gotoQuickCommand() {
        this.monacoService.commandService.executeCommand(CommandQuickAccessViewAction.ID);
    }
};
ActivityBarController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], ActivityBarController);
export { ActivityBarController };
