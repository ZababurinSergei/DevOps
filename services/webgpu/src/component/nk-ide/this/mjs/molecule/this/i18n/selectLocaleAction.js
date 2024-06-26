import 'reflect-metadata';
import { container } from 'tsyringe';
import { IQuickInputService, } from 'monaco-editor/esm/vs/platform/quickinput/common/quickInput';
import { localize } from './localize';
import { LocaleService } from './localeService';
import { Action2 } from './../../this/monaco/action';
import { KeyCode, KeyMod } from './../../this/monaco';
import { constants } from './../../this/services/builtinService/const';
export class SelectLocaleAction extends Action2 {
    constructor() {
        super({
            id: SelectLocaleAction.ID,
            label: SelectLocaleAction.LABEL,
            title: SelectLocaleAction.LABEL,
            alias: 'Select Display Language',
            precondition: undefined,
            f1: true,
            keybinding: {
                when: undefined,
                primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyL,
            },
        });
    }
    get localeService() {
        return container.resolve(LocaleService);
    }
    run(accessor) {
        const quickInputService = accessor.get(IQuickInputService);
        const data = this.localeService.getLocales();
        const current = this.localeService.getCurrentLocale();
        const picks = data.map((item) => {
            return {
                id: item.id,
                label: item.name,
                description: item.description,
            };
        });
        let timer;
        const onSelect = (locale, apply) => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                timer = undefined;
                if (locale && locale.id) {
                    this.localeService.setCurrentLocale(locale.id);
                }
            }, apply ? 0 : 200);
        };
        return new Promise((resolve) => {
            let isCompleted = false;
            const autoFocusIndex = picks.findIndex((p) => p.id === (current === null || current === void 0 ? void 0 : current.id));
            const quickPick = quickInputService.createQuickPick();
            quickPick.items = picks;
            quickPick.placeholder = localize('locale.select', 'Select Display Language (Up/Down Keys to Preview)');
            quickPick.activeItems = [picks[autoFocusIndex]];
            quickPick.canSelectMany = false;
            quickPick.onDidAccept((_) => {
                const item = quickPick.activeItems[0];
                if (item) {
                    onSelect(item, true);
                }
                isCompleted = true;
                quickPick.hide();
                resolve();
            });
            quickPick.onDidHide(() => {
                if (!isCompleted) {
                    onSelect(current, true);
                    resolve();
                }
            });
            quickPick.show();
        });
    }
}
SelectLocaleAction.ID = constants.ACTION_SELECT_LOCALE;
SelectLocaleAction.LABEL = localize('select.locale', 'Select Display Language');
