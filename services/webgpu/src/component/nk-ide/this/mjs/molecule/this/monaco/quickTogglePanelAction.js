import 'reflect-metadata';
import { container } from 'tsyringe';
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';
import { localize } from './../../this/i18n/localize';
import { LayoutService, MenuBarService, } from './../../this/services';
import { KeyMod, KeyCode } from './../../this/monaco';
import { constants } from './../../this/services/builtinService/const';
import { Action2 } from './../../this/monaco/action';
import { CATEGORIES, KeybindingWeight } from './../../this/monaco/common';
export class QuickTogglePanelAction extends Action2 {
    constructor() {
        super({
            id: QuickTogglePanelAction.ID,
            label: QuickTogglePanelAction.LABEL,
            title: QuickTogglePanelAction.LABEL,
            category: CATEGORIES.View,
            alias: 'Toggle Panel',
            precondition: undefined,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                // eslint-disable-next-line new-cap
                primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyJ),
            },
        });
        this.layoutService = container.resolve(LayoutService);
        this.menuBarService = container.resolve(MenuBarService);
    }
    run(accessor) {
        const hidden = this.layoutService.togglePanelVisibility();
        this.menuBarService.update(QuickTogglePanelAction.ID, {
            icon: hidden ? '' : 'check',
        });
    }
}
QuickTogglePanelAction.ID = constants.MENU_VIEW_PANEL;
QuickTogglePanelAction.LABEL = localize('menu.showPanel.title', 'Toggle Panel');
