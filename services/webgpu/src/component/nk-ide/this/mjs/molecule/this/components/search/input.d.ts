import React from 'react';
import { IActionBarItemProps } from './../../../this/components/actionBar';
export declare enum InfoTypeEnums {
    info = "info",
    warning = "warning",
    error = "error"
}
export declare type InfoTypeEnum = keyof typeof InfoTypeEnums;
export interface IBaseInputProps {
    value?: string;
    className?: string;
    placeholder?: string;
    toolbarData?: IActionBarItemProps[];
    info?: {
        type: InfoTypeEnum;
        text: string;
    };
    onChange?: (value: string) => void;
    onToolbarClick?: (addon: any) => void;
}
/**
 * Mock an Input by textarea
 * 'Cause we have to achieve text wrap and input cannot achieve it
 */
declare function Input(props: IBaseInputProps): React.JSX.Element;
declare namespace Input {
    var Group: ({ children }: {
        children: any;
    }) => React.JSX.Element;
}
export default Input;
