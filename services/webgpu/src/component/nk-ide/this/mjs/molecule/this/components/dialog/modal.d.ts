import React from 'react';
import { IDialogPropTypes } from 'rc-dialog/lib/IDialogPropTypes';
import { ConfrimType } from './';
import { IButtonProps } from './../../../this/components/button';
export interface IModalProps extends IDialogPropTypes {
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    onCancel?: (e: React.SyntheticEvent<Element, Event>) => void;
    centered?: boolean;
    cancelText?: React.ReactNode;
    okText?: React.ReactNode;
    okButtonProps?: IButtonProps;
    cancelButtonProps?: IButtonProps;
    okCancel?: boolean;
}
export interface IModalFuncProps extends IDialogPropTypes {
    cancelText?: React.ReactNode;
    okText?: React.ReactNode;
    icon?: string | JSX.Element;
    content?: React.ReactNode;
    onOk?: (...args: any[]) => any;
    onCancel?: (...args: any[]) => void;
    okButtonProps?: IButtonProps;
    cancelButtonProps?: IButtonProps;
    centered?: boolean;
    okCancel?: boolean;
    type?: ConfrimType;
}
export declare const destroyFns: Array<() => void>;
export declare const Modal: React.FC<IModalProps>;
