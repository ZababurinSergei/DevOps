import React from 'react';
import { IMenuBarItem } from './../../../this/model/workbench/menuBar';
import { IMenuProps } from './../../../this/components/menu';
export declare const defaultClassName: string;
export declare const actionClassName: string;
export declare const horizontalClassName: string;
export declare const logoClassName: string;
export declare const logoContentClassName: string;
export interface IHorizontalViewProps {
    data?: IMenuProps[];
    onClick?: (event: React.MouseEvent<any, any>, item: IMenuBarItem) => void;
    logo?: React.ReactNode;
}
export declare function HorizontalView(props: IHorizontalViewProps): React.JSX.Element;
