import 'reflect-metadata';
import { container } from 'tsyringe';
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';
import { localize } from './../../this/i18n/localize';
import { KeyMod, KeyCode } from './../../this/monaco';
import { ActivityBarService, LayoutService, MenuBarService, SidebarService, } from './../../this/services';
import { ID_SIDE_BAR } from './../../this/common/id';
import { Action2 } from './../../this/monaco/action';
import { CATEGORIES, KeybindingWeight } from './../../this/monaco/common';
export class CommandQuickSideBarViewAction extends Action2 {
    constructor() {
        super({
            id: CommandQuickSideBarViewAction.ID,
            label: CommandQuickSideBarViewAction.LABEL,
            title: CommandQuickSideBarViewAction.LABEL,
            category: CATEGORIES.View,
            alias: 'Toggle Side Bar',
            precondition: undefined,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                // eslint-disable-next-line new-cap
                primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyB),
            },
        });
        this.layoutService = container.resolve(LayoutService);
        this.activityBarService = container.resolve(ActivityBarService);
        this.menuBarService = container.resolve(MenuBarService);
        this.sideBarService = container.resolve(SidebarService);
    }
    run(accessor, ...args) {
        const sidebarId = args[0];
        const { selected } = this.activityBarService.getState();
        const hidden = this.layoutService.toggleSidebarVisibility();
        const activityId = sidebarId || this._preActivityBar;
        this.activityBarService.setActive(hidden ? undefined : activityId);
        this.sideBarService.setActive(hidden ? undefined : activityId);
        this.menuBarService.update(CommandQuickSideBarViewAction.ID, {
            icon: hidden ? '' : 'check',
        });
        hidden && (this._preActivityBar = selected);
    }
}
CommandQuickSideBarViewAction.ID = ID_SIDE_BAR;
CommandQuickSideBarViewAction.LABEL = localize('menu.showSideBar.label', 'Toggle Side Bar Visibility');
