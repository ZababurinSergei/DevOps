import 'reflect-metadata';
import { container } from 'tsyringe';
import { FolderTreeController, } from './../../this/controller/explorer/folderTree';
import { KeybindingWeight } from './../../this/monaco/common';
import { constants } from './../../this/services/builtinService/const';
import { Action2 } from './../../this/monaco/action';
import { localize } from './../../this/i18n/localize';
import { KeyMod, KeyCode } from './../../this/monaco';
import { FileTypes } from './../../this/model';
export class QuickCreateFile extends Action2 {
    constructor() {
        super({
            id: QuickCreateFile.ID,
            title: {
                value: QuickCreateFile.LABEL,
                original: QuickCreateFile.DESC,
            },
            label: QuickCreateFile.LABEL,
            alias: QuickCreateFile.DESC,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                // eslint-disable-next-line new-cap
                primary: KeyMod.CtrlCmd | KeyCode.KeyN,
            },
        });
        this.folderTreeController = container.resolve(FolderTreeController);
    }
    run() {
        var _a, _b;
        (_b = (_a = this.folderTreeController).createTreeNode) === null || _b === void 0 ? void 0 : _b.call(_a, FileTypes.File);
    }
}
QuickCreateFile.ID = constants.ACTION_QUICK_CREATE_FILE;
QuickCreateFile.LABEL = localize('menu.newFile', 'New File');
QuickCreateFile.DESC = 'New File';
