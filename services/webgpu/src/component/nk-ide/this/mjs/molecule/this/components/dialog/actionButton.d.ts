import React from 'react';
import { IButtonProps } from './../../../this/components/button';
export interface ActionButtonProps {
    actionFn?: (...args: any[]) => any | PromiseLike<any>;
    close?: Function;
    buttonProps?: IButtonProps;
    children?: React.ReactNode;
}
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
