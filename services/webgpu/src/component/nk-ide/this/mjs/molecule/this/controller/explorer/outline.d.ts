import 'reflect-metadata';
import { Controller } from './../../../this/react/controller';
import React from 'react';
export interface IOutlineController extends Partial<Controller> {
}
export declare class OutlineController extends Controller implements IOutlineController {
    private readonly explorerService;
    private readonly builtinService;
    constructor();
    initView(): void;
    readonly onClick: (event: React.MouseEvent) => void;
}
