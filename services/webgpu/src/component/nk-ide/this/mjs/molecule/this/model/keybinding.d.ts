import { KeyCode } from './../../this/monaco';
export declare const KeyCodeString: Partial<{
    [key in KeyCode]: string;
}>;
export interface ISimpleKeybinding {
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    keyCode: KeyCode;
}
