import 'reflect-metadata';
import { container } from 'tsyringe';
import { localize } from './../../this/i18n/localize';
import { KeyMod, KeyCode } from './../../this/monaco';
import { EditorService } from './../../this/services';
import { constants } from './../../this/services/builtinService/const';
import { KeybindingWeight } from './../../this/monaco/common';
import { Action2 } from './../../this/monaco/action';
export class QuickCopyLineUp extends Action2 {
    constructor() {
        super({
            id: QuickCopyLineUp.ID,
            title: {
                value: QuickCopyLineUp.LABEL,
                original: QuickCopyLineUp.DESC,
            },
            label: QuickCopyLineUp.LABEL,
            alias: QuickCopyLineUp.DESC,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                // eslint-disable-next-line new-cap
                primary: KeyMod.Alt | KeyMod.Shift | KeyCode.PageUp,
            },
        });
        this.editorService = container.resolve(EditorService);
    }
    run() {
        var _a;
        (_a = this.editorService.editorInstance) === null || _a === void 0 ? void 0 : _a.getAction(constants.ACTION_QUICK_COPY_LINE_UP).run();
    }
}
QuickCopyLineUp.ID = constants.ACTION_QUICK_COPY_LINE_UP;
QuickCopyLineUp.LABEL = localize('menu.copyLineUp', 'Copy Line Up');
QuickCopyLineUp.DESC = 'Copy Line Up';
