import 'reflect-metadata';
import { ServicesAccessor } from 'monaco-editor/esm/vs/platform/instantiation/common/instantiation';
import { Action2 } from './../../this/monaco/action';
export declare class QuickTogglePanelAction extends Action2 {
    static readonly ID: string;
    static readonly LABEL: any;
    private readonly layoutService;
    private readonly menuBarService;
    constructor();
    run(accessor: ServicesAccessor): void;
}
