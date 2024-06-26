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
import { container, singleton } from 'tsyringe';
import { MenuBarEvent } from './../../this/model/workbench/menuBar';
import { MenuBarMode } from './../../this/model/workbench/layout';
import { Controller } from './../../this/react/controller';
import { MenuBarService, LayoutService, BuiltinService, ActivityBarService, } from './../../this/services';
import { ID_APP, ID_SIDE_BAR } from './../../this/common/id';
import { MonacoService } from './../../this/monaco/monacoService';
import { CommandQuickSideBarViewAction } from './../../this/monaco/quickToggleSideBarAction';
import { QuickTogglePanelAction } from './../../this/monaco/quickTogglePanelAction';
let MenuBarController = class MenuBarController extends Controller {
    constructor() {
        super();
        this._focusinEle = null;
        this._automation = {};
        this.updateFocusinEle = (ele) => {
            if ((ele === null || ele === void 0 ? void 0 : ele.id) == ID_APP)
                return;
            this._focusinEle = ele;
        };
        this.onClick = (event, item) => {
            var _a, _b;
            const menuId = item.id || '';
            this.emit(MenuBarEvent.onSelect, menuId);
            (_b = (_a = this._automation)[menuId]) === null || _b === void 0 ? void 0 : _b.call(_a);
            // Update the check status of MenuBar in the contextmenu of ActivityBar
            this.updateActivityBarContextMenu(menuId);
        };
        this.createFile = () => {
            const { ACTION_QUICK_CREATE_FILE } = this.builtinService.getConstants();
            if (ACTION_QUICK_CREATE_FILE) {
                this.monacoService.commandService.executeCommand(ACTION_QUICK_CREATE_FILE);
            }
        };
        this.undo = () => {
            const { ACTION_QUICK_UNDO } = this.builtinService.getConstants();
            if (ACTION_QUICK_UNDO) {
                this.monacoService.commandService.executeCommand(ACTION_QUICK_UNDO, this._focusinEle);
            }
        };
        this.redo = () => {
            const { ACTION_QUICK_REDO } = this.builtinService.getConstants();
            if (ACTION_QUICK_REDO) {
                this.monacoService.commandService.executeCommand(ACTION_QUICK_REDO, this._focusinEle);
            }
        };
        this.gotoQuickCommand = () => {
            const { ACTION_QUICK_COMMAND } = this.builtinService.getConstants();
            if (ACTION_QUICK_COMMAND) {
                this.monacoService.commandService.executeCommand(ACTION_QUICK_COMMAND);
            }
        };
        this.updateActivityBar = () => {
            const hidden = this.layoutService.toggleActivityBarVisibility();
            const { MENU_VIEW_ACTIVITYBAR } = this.builtinService.getConstants();
            if (MENU_VIEW_ACTIVITYBAR) {
                this.menuBarService.update(MENU_VIEW_ACTIVITYBAR, {
                    icon: hidden ? '' : 'check',
                });
            }
        };
        this.selectAll = () => {
            const { ACTION_QUICK_SELECT_ALL } = this.builtinService.getConstants();
            if (ACTION_QUICK_SELECT_ALL) {
                this.monacoService.commandService.executeCommand(ACTION_QUICK_SELECT_ALL, this._focusinEle);
            }
        };
        this.copyLineUp = () => {
            const { ACTION_QUICK_COPY_LINE_UP } = this.builtinService.getConstants();
            if (ACTION_QUICK_COPY_LINE_UP) {
                this.monacoService.commandService.executeCommand(ACTION_QUICK_COPY_LINE_UP);
            }
        };
        this.updateMenuBar = () => {
            const hidden = this.layoutService.toggleMenuBarVisibility();
            const { MENU_VIEW_MENUBAR } = this.builtinService.getConstants();
            if (MENU_VIEW_MENUBAR) {
                this.menuBarService.update(MENU_VIEW_MENUBAR, {
                    icon: hidden ? '' : 'check',
                });
            }
        };
        this.updateMenuBarMode = (mode) => {
            this.layoutService.setMenuBarMode(mode);
        };
        this.updateMenuBarDataByMode = (mode) => {
            const { builtInMenuBarData } = this.builtinService.getModules();
            const { MENUBAR_MODE_HORIZONTAL, MENUBAR_MODE_VERTICAL, MENU_APPEARANCE_ID, } = this.builtinService.getConstants();
            let removeKey = MENUBAR_MODE_HORIZONTAL;
            let appendKey = MENUBAR_MODE_VERTICAL;
            if (mode === MenuBarMode.vertical) {
                removeKey = MENUBAR_MODE_VERTICAL;
                appendKey = MENUBAR_MODE_HORIZONTAL;
            }
            const menuItem = this.getMenuBarItem(builtInMenuBarData, appendKey);
            this.menuBarService.remove(removeKey);
            this.menuBarService.append(menuItem, MENU_APPEARANCE_ID);
        };
        this.getMenuBarItem = (data, id) => {
            let item;
            for (item of data) {
                if (item.id === id) {
                    return Object.assign({}, item);
                }
                else if (Array.isArray(item.data) && item.data.length > 0) {
                    const itemData = this.getMenuBarItem(item.data, id);
                    if (itemData) {
                        return itemData;
                    }
                }
            }
            return null;
        };
        this.updateStatusBar = () => {
            const hidden = this.layoutService.toggleStatusBarVisibility();
            const { MENU_VIEW_STATUSBAR } = this.builtinService.getConstants();
            if (MENU_VIEW_STATUSBAR) {
                this.menuBarService.update(MENU_VIEW_STATUSBAR, {
                    icon: hidden ? '' : 'check',
                });
            }
        };
        this.updateSideBar = () => {
            this.monacoService.commandService.executeCommand(CommandQuickSideBarViewAction.ID);
        };
        this.updateAuxiliaryBar = () => {
            const nextHidden = this.layoutService.setAuxiliaryBar((hidden) => !hidden);
            const { MENU_VIEW_AUXILIARY } = this.builtinService.getConstants();
            if (MENU_VIEW_AUXILIARY) {
                this.menuBarService.update(MENU_VIEW_AUXILIARY, {
                    icon: nextHidden ? '' : 'check',
                });
            }
        };
        this.updatePanel = () => {
            this.monacoService.commandService.executeCommand(QuickTogglePanelAction.ID);
        };
        this.menuBarService = container.resolve(MenuBarService);
        this.layoutService = container.resolve(LayoutService);
        this.monacoService = container.resolve(MonacoService);
        this.builtinService = container.resolve(BuiltinService);
        this.activityBarService = container.resolve(ActivityBarService);
    }
    initView() {
        const { builtInMenuBarData } = this.builtinService.getModules();
        const { ACTION_QUICK_CREATE_FILE, ACTION_QUICK_UNDO, ACTION_QUICK_REDO, ACTION_QUICK_SELECT_ALL, ACTION_QUICK_COPY_LINE_UP, MENU_VIEW_ACTIVITYBAR, MENU_VIEW_AUXILIARY, MENU_VIEW_MENUBAR, MENU_VIEW_STATUSBAR, MENU_QUICK_COMMAND, MENU_VIEW_PANEL, MENUBAR_MODE_HORIZONTAL, MENUBAR_MODE_VERTICAL, } = this.builtinService.getConstants();
        if (builtInMenuBarData) {
            const mode = this.layoutService.getMenuBarMode();
            const menuBarData = this.getMenuBarDataByMode(mode, builtInMenuBarData);
            this.menuBarService.setMenus(menuBarData);
        }
        [
            [ACTION_QUICK_CREATE_FILE, () => this.createFile()],
            [ACTION_QUICK_UNDO, () => this.undo()],
            [ACTION_QUICK_REDO, () => this.redo()],
            [ACTION_QUICK_SELECT_ALL, () => this.selectAll()],
            [ACTION_QUICK_COPY_LINE_UP, () => this.copyLineUp()],
            [MENU_VIEW_ACTIVITYBAR, () => this.updateActivityBar()],
            [MENU_VIEW_MENUBAR, () => this.updateMenuBar()],
            [MENU_VIEW_STATUSBAR, () => this.updateStatusBar()],
            [MENU_QUICK_COMMAND, () => this.gotoQuickCommand()],
            [ID_SIDE_BAR, () => this.updateSideBar()],
            [MENU_VIEW_AUXILIARY, () => this.updateAuxiliaryBar()],
            [MENU_VIEW_PANEL, () => this.updatePanel()],
            [
                MENUBAR_MODE_HORIZONTAL,
                () => this.updateMenuBarMode(MenuBarMode.horizontal),
            ],
            [
                MENUBAR_MODE_VERTICAL,
                () => this.updateMenuBarMode(MenuBarMode.vertical),
            ],
        ].forEach(([key, value]) => {
            if (key) {
                this._automation[key] = value;
            }
        });
        this.subscribe(MenuBarEvent.onChangeMode, this.updateMenuBarDataByMode);
    }
    /**
     * Get the menu bar data after filtering out the menu contained in ids
     * @param menuData
     * @param ids
     * @returns Filtered menu bar data
     */
    getFilteredMenuBarData(menuData, ids) {
        const newData = [];
        if (Array.isArray(menuData)) {
            menuData.forEach((item) => {
                if (ids.includes(item.id))
                    return;
                const newItem = Object.assign({}, item);
                if (Array.isArray(item.data) && item.data.length > 0) {
                    newItem.data = this.getFilteredMenuBarData(item.data, ids);
                }
                newData.push(newItem);
            });
        }
        return newData;
    }
    getMenuBarDataByMode(mode, menuData) {
        const { MENUBAR_MODE_VERTICAL, MENUBAR_MODE_HORIZONTAL } = this.builtinService.getConstants();
        const ids = [];
        if (mode === MenuBarMode.horizontal) {
            ids.push(MENUBAR_MODE_HORIZONTAL);
        }
        else if (mode === MenuBarMode.vertical) {
            ids.push(MENUBAR_MODE_VERTICAL);
        }
        const menuBarData = this.getFilteredMenuBarData(menuData, ids);
        return menuBarData;
    }
    updateActivityBarContextMenu(menuId) {
        const { MENU_VIEW_MENUBAR, CONTEXT_MENU_MENU } = this.builtinService.getConstants();
        if (CONTEXT_MENU_MENU && menuId === MENU_VIEW_MENUBAR) {
            this.activityBarService.toggleContextMenuChecked(CONTEXT_MENU_MENU);
        }
    }
};
MenuBarController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], MenuBarController);
export { MenuBarController };
