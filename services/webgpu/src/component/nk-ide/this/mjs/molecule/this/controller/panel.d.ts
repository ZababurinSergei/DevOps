import 'reflect-metadata';
import React from 'react';
import { IActionBarItemProps } from './../../this/components/actionBar';
import { Controller } from './../../this/react/controller';
import type { UniqueId } from './../../this/common/types';
export interface IPanelController extends Partial<Controller> {
    onTabChange?(key: UniqueId): void;
    onToolbarClick?(e: React.MouseEvent, item: IActionBarItemProps): void;
    onClose?(key: UniqueId): void;
}
export declare class PanelController extends Controller implements IPanelController {
    private readonly panelService;
    private readonly monacoService;
    private readonly builtinService;
    constructor();
    initView(): void;
    readonly onTabChange: (key: UniqueId) => void;
    readonly onClose: (key: UniqueId) => void;
    readonly onToolbarClick: (e: React.MouseEvent, item: IActionBarItemProps) => void;
}
