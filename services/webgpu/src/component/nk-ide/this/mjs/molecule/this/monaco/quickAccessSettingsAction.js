import 'reflect-metadata';
import { container } from 'tsyringe';
import { localize } from 'monaco-editor/esm/vs/nls';
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';
import { KeyMod, KeyCode } from './../../this/monaco';
import { KeybindingWeight } from './../../this/monaco/common';
import { Action2 } from './../../this/monaco/action';
import { constants } from './../../this/services/builtinService/const';
import { SettingsService } from './../../this/services';
export class QuickAccessSettings extends Action2 {
    constructor() {
        super({
            id: QuickAccessSettings.ID,
            label: QuickAccessSettings.LABEL,
            title: QuickAccessSettings.LABEL,
            alias: 'Open Settings (JSON)',
            precondition: undefined,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                // eslint-disable-next-line new-cap
                primary: KeyChord(KeyMod.CtrlCmd | KeyCode.Comma),
            },
        });
        this.settingsService = container.resolve(SettingsService);
    }
    run(accessor) {
        this.settingsService.openSettingsInEditor();
    }
}
QuickAccessSettings.ID = constants.ACTION_QUICK_ACCESS_SETTINGS;
QuickAccessSettings.LABEL = localize('quickAccessSettings.label', 'Open Settings (JSON)');
