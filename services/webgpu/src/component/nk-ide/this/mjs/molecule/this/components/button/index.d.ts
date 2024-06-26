import React from 'react';
declare type BtnSizeType = 'normal' | 'large';
export interface IButtonProps extends Omit<React.ComponentProps<'button'>, 'ref'> {
    disabled?: boolean;
    size?: BtnSizeType;
    onClick?(event: React.MouseEvent): void;
}
export declare const defaultButtonClassName: string;
export declare const normalButtonClassName: string;
export declare const largeButtonClassName: string;
export declare const disableButtonClassName: string;
export declare const Button: React.ForwardRefExoticComponent<IButtonProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
export {};
