import { ISimpleKeybinding } from './../../this/model/keybinding';
export interface IKeybinding {
    _isMac: boolean;
    /**
     * Query global keybingding
     * @example
     * ```ts
     * const key = queryGlobalKeybinding('workbench.test');
     * // [{ctrlKey: boolean; shiftKey: false; altKey: false; metaKey: false; keyCode: 0;}]
     * ```
     */
    queryGlobalKeybinding: (id: string) => ISimpleKeybinding[] | null;
    /**
     * Convert simple keybinding to a string
     * @example
     * ```ts
     * const key = queryGlobalKeybinding('workbench.test');
     * // [{ctrlKey: boolean; shiftKey: false; altKey: false; metaKey: true; keyCode: 82;}]
     * convertSimpleKeybindingToString(key);
     * // ⌘,
     * ```
     */
    convertSimpleKeybindingToString: (keybinding?: ISimpleKeybinding[]) => string;
}
export declare const KeybindingHelper: IKeybinding;
