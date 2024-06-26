import React from 'react';
import { ISidebar } from './../../../this/model/workbench/sidebar';
export interface IHeaderProps {
    title: React.ReactNode;
    toolbar: React.ReactNode;
}
export declare const Header: React.NamedExoticComponent<IHeaderProps>;
export declare function Content(props: React.ComponentProps<any>): React.JSX.Element;
export declare function Sidebar(props: ISidebar): React.JSX.Element;
