import React from 'react';
import { ISubMenuProps } from './subMenu';
export declare type IMenuProps = ISubMenuProps;
export declare type MenuRef = {
    dispose: () => void;
};
export declare const Menu: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<ISubMenuProps>, "ref"> & React.RefAttributes<MenuRef>>;
