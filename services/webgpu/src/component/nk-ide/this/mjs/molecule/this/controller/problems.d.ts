import 'reflect-metadata';
import React from 'react';
import { IStatusBarItem, IProblemsTreeNode } from './../../this/model';
import { Controller } from './../../this/react/controller';
export interface IProblemsController extends Partial<Controller> {
    onClick?: (e: React.MouseEvent, item: IStatusBarItem) => void;
    onSelect?: (node: IProblemsTreeNode) => void;
}
export declare class ProblemsController extends Controller implements IProblemsController {
    private readonly panelService;
    private readonly statusBarService;
    private readonly layoutService;
    private readonly monacoService;
    private readonly problemsService;
    private readonly builtinService;
    constructor();
    private showHideProblems;
    onClick: (e: React.MouseEvent, item: IStatusBarItem) => void;
    initView(): void;
    onSelect: (node: IProblemsTreeNode) => void;
}
