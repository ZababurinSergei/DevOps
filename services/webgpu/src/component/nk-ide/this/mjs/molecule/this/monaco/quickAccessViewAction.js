var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'reflect-metadata';
import { container } from 'tsyringe';
import { localize } from 'monaco-editor/esm/vs/nls';
import { QuickCommandNLS } from 'monaco-editor/esm/vs/editor/common/standaloneStrings';
import { IQuickInputService } from 'monaco-editor/esm/vs/platform/quickinput/common/quickInput';
import { AbstractEditorCommandsQuickAccessProvider } from 'monaco-editor/esm/vs/editor/contrib/quickAccess/commandsQuickAccess';
import { IInstantiationService, } from 'monaco-editor/esm/vs/platform/instantiation/common/instantiation';
import { IKeybindingService } from 'monaco-editor/esm/vs/platform/keybinding/common/keybinding';
import { ICommandService } from 'monaco-editor/esm/vs/platform/commands/common/commands';
import { ITelemetryService } from 'monaco-editor/esm/vs/platform/telemetry/common/telemetry';
import { INotificationService } from 'monaco-editor/esm/vs/platform/notification/common/notification';
import { TriggerAction } from 'monaco-editor/esm/vs/platform/quickinput/browser/pickerQuickAccess';
import { MenuId, MenuRegistry, } from 'monaco-editor/esm/vs/platform/actions/common/actions';
import { stripIcons } from 'monaco-editor/esm/vs/base/common/iconLabels';
import { KeyMod, KeyCode } from './../../this/monaco';
import { EditorService } from './../../this/services';
import { constants } from './../../this/services/builtinService/const';
import { Action2 } from './../../this/monaco/action';
import { KeybindingWeight } from './../../this/monaco/common';
import { MonacoService } from './../../this/monaco/monacoService';
import { registerQuickAccessProvider } from './../../this/monaco/quickAccessProvider';
export class CommandQuickAccessProvider extends AbstractEditorCommandsQuickAccessProvider {
    constructor() {
        super({
            showAlias: false,
            noResultsPick: {
                label: localize('noCommandResults', 'No matching commands'),
                commandId: '',
            },
        }, CommandQuickAccessProvider.services.get(IInstantiationService), CommandQuickAccessProvider.services.get(IKeybindingService), CommandQuickAccessProvider.services.get(ICommandService), CommandQuickAccessProvider.services.get(ITelemetryService), CommandQuickAccessProvider.services.get(INotificationService));
        this.editorService = container.resolve(EditorService);
    }
    get activeTextEditorControl() {
        var _a;
        return (_a = this.editorService) === null || _a === void 0 ? void 0 : _a.editorInstance;
    }
    static get services() {
        return container.resolve(MonacoService).services;
    }
    getCommandPicks(disposables, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token.isCancellationRequested) {
                return [];
            }
            return [
                ...(this).getCodeEditorCommandPicks(),
                ...this.getGlobalCommandPicks(disposables),
            ].map((c) => (Object.assign(Object.assign({}, c), { buttons: [
                    {
                        iconClass: 'codicon codicon-gear',
                        tooltip: localize('configure keybinding', 'Configure Keybinding'),
                    },
                ], trigger: () => {
                    return TriggerAction.CLOSE_PICKER;
                } })));
        });
    }
    getGlobalCommandPicks(disposables) {
        var _a;
        const globalCommandPicks = [];
        const globalCommandsMenu = MenuRegistry.getMenuItems(MenuId.CommandPalette);
        for (const menu of globalCommandsMenu) {
            // Label
            let label = (typeof menu.command.title === 'string'
                ? menu.command.title
                : menu.command.title.value) || menu.command.id;
            // Category
            const category = typeof menu.command.category === 'string'
                ? menu.command.category
                : (_a = menu.command.category) === null || _a === void 0 ? void 0 : _a.value;
            if (category) {
                label = localize('commandWithCategory', '{0}: {1}', category, label);
            }
            // Alias
            const aliasLabel = typeof menu.command.title !== 'string'
                ? menu.command.title.original
                : undefined;
            const aliasCategory = category &&
                menu.command.category &&
                typeof menu.command.category !== 'string'
                ? menu.command.category.original
                : undefined;
            const commandAlias = aliasLabel && category
                ? aliasCategory
                    ? `${aliasCategory}: ${aliasLabel}`
                    : `${category}: ${aliasLabel}`
                : aliasLabel;
            globalCommandPicks.push({
                commandId: menu.command.id,
                commandAlias,
                label: stripIcons(label),
            });
        }
        return globalCommandPicks;
    }
}
CommandQuickAccessProvider.PREFIX = '>';
registerQuickAccessProvider({
    ctor: CommandQuickAccessProvider,
    prefix: CommandQuickAccessProvider.PREFIX,
    placeholder: localize('commandsQuickAccessPlaceholder', 'Type the name of a command to run.'),
    helpEntries: [
        {
            description: localize('commandsQuickAccess', 'Show and Run Commands'),
            needsEditor: false,
        },
    ],
});
export class CommandQuickAccessViewAction extends Action2 {
    constructor() {
        super({
            id: CommandQuickAccessViewAction.ID,
            label: QuickCommandNLS.quickCommandActionLabel,
            alias: 'Command Palette',
            title: {
                value: localize('showTriggerActions', 'Command Palette'),
                original: 'Command Palette',
            },
            f1: false,
            keybinding: {
                weight: KeybindingWeight.WorkbenchContrib,
                when: undefined,
                primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyP,
                secondary: [KeyCode.F1],
            },
        });
    }
    run(accessor) {
        accessor
            .get(IQuickInputService)
            .quickAccess.show(CommandQuickAccessProvider.PREFIX);
    }
}
CommandQuickAccessViewAction.ID = constants.ACTION_QUICK_COMMAND;
