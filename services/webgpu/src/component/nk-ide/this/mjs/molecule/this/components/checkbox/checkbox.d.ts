import React from 'react';
import type { HTMLElementProps, UniqueId } from './../../../this/common/types';
export interface ICheckboxProps extends HTMLElementProps {
    id: UniqueId;
    value?: string;
    children?: React.ReactNode;
    onChange?(e: React.ChangeEvent, options?: ICheckboxProps): void;
    [key: string]: any;
}
export declare const checkboxClassName: string;
export declare function Checkbox(props: ICheckboxProps): React.JSX.Element;
