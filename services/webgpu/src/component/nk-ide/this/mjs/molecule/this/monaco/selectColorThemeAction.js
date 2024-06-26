import 'reflect-metadata';
import { container } from 'tsyringe';
import { localize } from 'monaco-editor/esm/vs/nls';
import { IQuickInputService, } from 'monaco-editor/esm/vs/platform/quickinput/common/quickInput';
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';
import { KeyMod, KeyCode } from './../../this/monaco';
import { Action2 } from './../../this/monaco/action';
import { KeybindingWeight } from './../../this/monaco/common';
import { constants } from './../../this/services/builtinService/const';
import { ColorThemeService } from './../../this/services';
export class SelectColorThemeAction extends Action2 {
    constructor() {
        super({
            id: SelectColorThemeAction.ID,
            label: SelectColorThemeAction.LABEL,
            title: SelectColorThemeAction.LABEL,
            alias: 'Color Theme',
            precondition: undefined,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                // eslint-disable-next-line new-cap
                primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyK),
            },
        });
        this.colorThemeService = container.resolve(ColorThemeService);
    }
    run(accessor) {
        const quickInputService = accessor.get(IQuickInputService);
        const themes = this.colorThemeService.getThemes();
        const currentTheme = this.colorThemeService.getColorTheme();
        const picks = [...toEntries(themes)];
        let selectThemeTimeout;
        const selectTheme = (theme, applyTheme) => {
            if (selectThemeTimeout) {
                clearTimeout(selectThemeTimeout);
            }
            selectThemeTimeout = window.setTimeout(() => {
                selectThemeTimeout = undefined;
                const themeId = theme && theme.id !== undefined
                    ? theme.id
                    : currentTheme.id;
                this.colorThemeService.setTheme(themeId);
            }, applyTheme ? 0 : 200);
        };
        return new Promise((resolve) => {
            let isCompleted = false;
            const autoFocusIndex = picks.findIndex((p) => p.id === currentTheme.id);
            const quickPick = quickInputService.createQuickPick();
            quickPick.items = picks;
            quickPick.placeholder = localize('themes.selectTheme', 'Select Color Theme (Up/Down Keys to Preview)');
            quickPick.activeItems = [picks[autoFocusIndex]];
            quickPick.canSelectMany = false;
            quickPick.onDidAccept((_) => {
                const theme = quickPick.activeItems[0];
                if (theme) {
                    selectTheme(theme, true);
                }
                isCompleted = true;
                quickPick.hide();
                resolve();
            });
            quickPick.onDidChangeActive((themes) => selectTheme(themes[0], false));
            quickPick.onDidHide(() => {
                if (!isCompleted) {
                    selectTheme(currentTheme, true);
                    resolve();
                }
            });
            quickPick.show();
        });
    }
}
SelectColorThemeAction.ID = constants.ACTION_SELECT_THEME;
SelectColorThemeAction.LABEL = localize('selectTheme.label', 'Color Theme');
function toEntries(themes, label) {
    const toEntry = (theme) => ({
        id: theme.id,
        label: theme.label,
        description: theme.description,
    });
    const sorter = (t1, t2) => { var _a; return (_a = t1.label) === null || _a === void 0 ? void 0 : _a.localeCompare(t2.label); };
    const entries = themes
        .map(toEntry)
        .sort(sorter);
    if (entries.length > 0 && label) {
        entries.unshift({ type: 'separator', label });
    }
    return entries;
}
