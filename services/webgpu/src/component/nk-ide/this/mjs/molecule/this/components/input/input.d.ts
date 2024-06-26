import React from 'react';
import { TextArea } from './textArea';
declare type SizeType = 'normal' | 'large';
export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onKeyDown' | 'onPressEnter'> {
    disabled?: boolean;
    size?: SizeType;
    type?: LiteralUnion<'button' | 'checkbox' | 'search' | 'submit' | 'text', string>;
    placeholder?: string;
    value?: string;
    style?: React.CSSProperties;
    defaultValue?: string;
    className?: string;
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export declare const inputClassName: string;
export declare const normalClassName: string;
export declare const largetClassName: string;
export declare const disabledClassName: string;
export declare function fixControlledValue<T>(value: T): "" | T;
export declare function resolveOnChange(_: HTMLInputElement | HTMLTextAreaElement | null, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent>, onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void): void;
export declare function getInputClassName(size?: SizeType, disabled?: boolean): string | undefined;
export interface InputState {
    value: any;
    prevValue: any;
}
export declare class Input extends React.Component<IInputProps, InputState> {
    static TextArea: typeof TextArea;
    static defaultProps: {
        type: string;
    };
    input: HTMLInputElement | HTMLTextAreaElement | null;
    constructor(props: IInputProps);
    static getDerivedStateFromProps(nextProps: IInputProps, { prevValue }: InputState): Partial<InputState>;
    saveInput: (input: HTMLInputElement) => void;
    setValue(value: string): void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    render(): React.JSX.Element;
}
export {};
