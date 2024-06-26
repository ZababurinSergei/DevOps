import React from 'react';
import type { UniqueId, HTMLElementProps } from './../../../this/common/types';
export interface IBreadcrumbItemProps extends HTMLElementProps {
    id: UniqueId;
    href?: string;
    name?: string;
    icon?: string | JSX.Element;
    render?(item: IBreadcrumbItemProps): React.ReactNode;
    [key: string]: any;
}
export interface IBreadcrumbProps extends HTMLElementProps {
    routes: IBreadcrumbItemProps[];
    separator?: React.ReactNode;
    onClick?(event: React.MouseEvent, item?: IBreadcrumbItemProps): void;
    [key: string]: any;
}
export declare function Breadcrumb(props: IBreadcrumbProps): React.JSX.Element;
