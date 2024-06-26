import React from 'react';
import { TriggerEvent, PlacementType } from './../../../this/common/dom';
export interface IDropDownProps extends React.ComponentProps<'div'> {
    overlay: React.ReactNode;
    trigger?: TriggerEvent;
    placement?: PlacementType;
}
export declare type DropDownRef = {
    dispose: () => void;
};
export declare const defaultDropDownClassName: string;
export declare const DropDown: React.ForwardRefExoticComponent<Omit<IDropDownProps, "ref"> & React.RefAttributes<DropDownRef>>;
