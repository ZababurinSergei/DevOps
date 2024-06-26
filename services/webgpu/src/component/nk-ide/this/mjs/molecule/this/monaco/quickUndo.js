import 'reflect-metadata';
import { container } from 'tsyringe';
import { localize } from './../../this/i18n/localize';
import { EditorService } from './../../this/services';
import { constants } from './../../this/services/builtinService/const';
import { KeybindingWeight } from './../../this/monaco/common';
import { Action2 } from './../../this/monaco/action';
import { KeyMod, KeyCode, Uri, editor as MonacoEditor } from './../../this/monaco';
export class QuickUndo extends Action2 {
    constructor() {
        super({
            id: QuickUndo.ID,
            title: {
                value: QuickUndo.LABEL,
                original: QuickUndo.DESC,
            },
            label: QuickUndo.LABEL,
            alias: QuickUndo.DESC,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                // eslint-disable-next-line new-cap
                primary: KeyMod.CtrlCmd | KeyCode.KeyZ,
            },
        });
        this.editorService = container.resolve(EditorService);
    }
    isTextdom(ele) {
        return typeof ele.selectionStart === 'number';
    }
    run(accessor, ...args) {
        const focusinEle = args[0];
        const currentFocusinEle = focusinEle || document.activeElement;
        if (currentFocusinEle &&
            this.isTextdom(currentFocusinEle) &&
            !currentFocusinEle.className.includes('monaco')) {
            // native dom use the native methods
            document.execCommand('undo');
        }
        else {
            // monaco component should use the method from instance
            const editorInstance = this.editorService.editorInstance;
            if (editorInstance) {
                const currentActiveGroup = this.editorService.getState().current;
                if (currentActiveGroup) {
                    const tab = this.editorService.getTabById(currentActiveGroup.activeTab, currentActiveGroup.id);
                    editorInstance === null || editorInstance === void 0 ? void 0 : editorInstance.focus();
                    const model = MonacoEditor.getModel(Uri.parse(tab.id.toString()));
                    model.undo();
                }
            }
        }
    }
}
QuickUndo.ID = constants.ACTION_QUICK_UNDO;
QuickUndo.LABEL = localize('menu.undo', 'Undo');
QuickUndo.DESC = 'Undo';
