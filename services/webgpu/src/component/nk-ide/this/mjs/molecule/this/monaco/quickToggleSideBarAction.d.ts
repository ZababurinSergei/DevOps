import 'reflect-metadata';
import { ServicesAccessor } from 'monaco-editor/esm/vs/platform/instantiation/common/instantiation';
import { Action2 } from './../../this/monaco/action';
export declare class CommandQuickSideBarViewAction extends Action2 {
    static readonly ID = "sidebar";
    static readonly LABEL: any;
    private readonly layoutService;
    private readonly activityBarService;
    private readonly menuBarService;
    private readonly sideBarService;
    private _preActivityBar;
    constructor();
    run(accessor: ServicesAccessor, ...args: any[]): void;
}
