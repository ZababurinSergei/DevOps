import React from 'react';
import type { UniqueId } from './../../../this/common/types';
export declare enum AuxiliaryEventKind {
    onTabClick = "AuxiliaryBar.onClick"
}
export declare type IAuxiliaryBarMode = 'default' | 'tabs';
export declare type IAuxiliaryData = {
    key: UniqueId;
    title: React.ReactNode;
};
export interface IAuxiliaryBar {
    mode: IAuxiliaryBarMode;
    data: IAuxiliaryData[];
    current?: UniqueId;
    children?: React.ReactNode;
}
export declare class AuxiliaryModel implements IAuxiliaryBar {
    mode: IAuxiliaryBarMode;
    children: React.ReactNode;
    data: IAuxiliaryData[];
    current?: UniqueId;
    constructor(mode?: IAuxiliaryBarMode, data?: IAuxiliaryData[], current?: UniqueId, children?: React.ReactNode);
}
