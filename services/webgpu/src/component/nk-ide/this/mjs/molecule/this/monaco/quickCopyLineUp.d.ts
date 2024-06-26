import 'reflect-metadata';
import { Action2 } from './../../this/monaco/action';
export declare class QuickCopyLineUp extends Action2 {
    static readonly ID: string;
    static readonly LABEL: any;
    static readonly DESC = "Copy Line Up";
    private readonly editorService;
    constructor();
    run(): void;
}
