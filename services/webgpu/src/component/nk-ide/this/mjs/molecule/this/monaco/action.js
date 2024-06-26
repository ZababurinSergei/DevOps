var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { DisposableStore } from 'monaco-editor/esm/vs/base/common/lifecycle';
import { ContextKeyExpr } from 'monaco-editor/esm/vs/platform/contextkey/common/contextkey';
import { KeybindingsRegistry } from 'monaco-editor/esm/vs/platform/keybinding/common/keybindingsRegistry';
import { CommandsRegistry } from 'monaco-editor/esm/vs/platform/commands/common/commands';
import { MenuRegistry, MenuId, } from 'monaco-editor/esm/vs/platform/actions/common/actions';
export class Action2 {
    constructor(desc) {
        this.desc = desc;
    }
}
export function registerAction2(Ctor) {
    const disposables = new DisposableStore();
    const action = new Ctor();
    const _a = action.desc, { f1, menu, keybinding, description } = _a, command = __rest(_a, ["f1", "menu", "keybinding", "description"]);
    // command
    disposables.add(CommandsRegistry.registerCommand({
        id: command.id,
        handler: (accessor, ...args) => action.run(accessor, ...args),
        description: description,
    }));
    // menu
    if (Array.isArray(menu)) {
        disposables.add(MenuRegistry.appendMenuItems(menu.map((item) => ({
            id: item.id,
            item: Object.assign({ command }, item),
        }))));
    }
    else if (menu) {
        disposables.add(MenuRegistry.appendMenuItem(menu.id, Object.assign({ command }, menu)));
    }
    if (f1) {
        disposables.add(MenuRegistry.appendMenuItem(MenuId.CommandPalette, {
            command,
            when: command.precondition,
        }));
        disposables.add(MenuRegistry.addCommand(command));
    }
    // keybinding
    if (Array.isArray(keybinding)) {
        for (const item of keybinding) {
            KeybindingsRegistry.registerKeybindingRule(Object.assign(Object.assign({}, item), { id: command.id, when: command.precondition
                    ? ContextKeyExpr.and(command.precondition, item.when)
                    : item.when }));
        }
    }
    else if (keybinding) {
        KeybindingsRegistry.registerKeybindingRule(Object.assign(Object.assign({}, keybinding), { id: command.id, when: command.precondition
                ? ContextKeyExpr.and(command.precondition, keybinding.when)
                : keybinding.when }));
    }
    return disposables;
}
