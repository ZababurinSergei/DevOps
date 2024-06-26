import { KeybindingsRegistry } from 'monaco-editor/esm/vs/platform/keybinding/common/keybindingsRegistry';
import { Utils } from '@dtinsight/dt-utils/lib';
import { KeyCodeString } from './../../this/model/keybinding';
export const KeybindingHelper = {
    _isMac: Utils.isMacOs(),
    queryGlobalKeybinding: (id) => {
        const defaultKeybindings = KeybindingsRegistry.getDefaultKeybindings();
        const globalKeybindings = defaultKeybindings.filter((key) => !key.when);
        // 'Cause one action can occupy multiply keybinding, so there should be filter rather than find
        const targetKeybinding = globalKeybindings.filter((i) => i.command === id);
        if (targetKeybinding.length) {
            // Since it's sorted out by the weight when getDefaultKeybindings, the targetKeybinding is sorted by weight
            // Get lower priority keybinding
            const lowerPriorty = targetKeybinding[targetKeybinding.length - 1];
            // keybinding which is chord key[组合键] can get more than 1 parts
            const keybindings = lowerPriorty.keybinding;
            return keybindings;
        }
        return null;
    },
    convertSimpleKeybindingToString: (keybinding = []) => {
        return (keybinding
            .map((key) => {
            const res = [];
            if (key.altKey) {
                res.push(KeybindingHelper._isMac ? '⌥' : 'Alt');
            }
            if (key.ctrlKey) {
                res.push(KeybindingHelper._isMac ? '⌃' : 'Ctrl');
            }
            if (key.metaKey) {
                res.push(KeybindingHelper._isMac ? '⌘' : 'Meta');
            }
            if (key.shiftKey) {
                res.push(KeybindingHelper._isMac ? '⇧' : 'Shift');
            }
            if (key.keyCode) {
                res.push(KeyCodeString[key.keyCode] || '');
            }
            return res.join(KeybindingHelper._isMac ? '' : '+');
        })
            // Insert a space between chord key
            .join(' '));
    },
};
