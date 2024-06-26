import React from 'react';
import { IActionBarProps } from './../../../this/components/actionBar';
export interface IToolbarProps<T = any> extends IActionBarProps {
}
export declare const toolbarClassName: string;
export declare function Toolbar<T = any>(props: IToolbarProps<T>): React.JSX.Element;
