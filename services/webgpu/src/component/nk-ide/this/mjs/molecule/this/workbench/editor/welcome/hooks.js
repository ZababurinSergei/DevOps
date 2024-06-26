import { localize } from './../../../../this/i18n/localize';
import { constants } from './../../../../this/services/builtinService/const';
import { KeybindingHelper } from './../../../../this/services/keybinding';
import { useEffect, useState } from 'react';
const KEYBINDINGS = () => [
    {
        id: constants.ACTION_QUICK_COMMAND,
        name: localize('menu.commandPalette', 'Command Palette'),
    },
    {
        id: constants.ACTION_QUICK_ACCESS_SETTINGS,
        name: localize('menu.settings', 'Settings'),
    },
    {
        id: constants.ACTION_SELECT_THEME,
        name: localize('menu.colorTheme', 'Color Theme'),
    },
];
export const useGetKeys = () => {
    const [keys, setKeys] = useState([]);
    useEffect(() => {
        const res = KEYBINDINGS()
            .map((acessCommand) => {
            const simpleKeybindings = KeybindingHelper.queryGlobalKeybinding(acessCommand.id);
            if (simpleKeybindings === null || simpleKeybindings === void 0 ? void 0 : simpleKeybindings.length) {
                const keybindings = KeybindingHelper.convertSimpleKeybindingToString(simpleKeybindings);
                return Object.assign(Object.assign({}, acessCommand), { keybindings });
            }
            return null;
        })
            .filter(Boolean);
        setKeys(res);
    }, []);
    return keys;
};
