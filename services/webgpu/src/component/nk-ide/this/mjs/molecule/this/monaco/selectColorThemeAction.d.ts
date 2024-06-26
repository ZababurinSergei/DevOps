import 'reflect-metadata';
import { ServicesAccessor } from 'monaco-editor/esm/vs/platform/instantiation/common/instantiation';
import { Action2 } from './../../this/monaco/action';
export declare class SelectColorThemeAction extends Action2 {
    static readonly ID: string;
    static readonly LABEL: any;
    private readonly colorThemeService;
    constructor();
    run(accessor: ServicesAccessor): Promise<void>;
}
