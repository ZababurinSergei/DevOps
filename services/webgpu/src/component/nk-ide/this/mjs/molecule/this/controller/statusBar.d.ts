import 'reflect-metadata';
import React from 'react';
import { IStatusBarItem } from './../../this/model';
import { Controller } from './../../this/react/controller';
import { IMenuItemProps } from './../../this/components/menu';
export interface IStatusBarController extends Partial<Controller> {
    onClick?: (e: React.MouseEvent, item: IStatusBarItem) => void;
    onContextMenuClick?: (e: React.MouseEvent, item: IMenuItemProps | undefined) => void;
}
export declare class StatusBarController extends Controller implements IStatusBarController {
    private readonly menuBarController;
    private readonly statusBarService;
    private readonly builtinService;
    constructor();
    initView(): void;
    onClick: (e: React.MouseEvent, item: IStatusBarItem) => void;
    readonly onContextMenuClick: (e: React.MouseEvent, item: IMenuItemProps | undefined) => void;
}
