import 'reflect-metadata';
import { Action2 } from './../../this/monaco/action';
export declare class QuickSelectAllAction extends Action2 {
    static readonly ID: string;
    static readonly DESC = "Select All";
    static readonly LABEL: any;
    private readonly editorService;
    constructor();
    selectEditorAll(): void;
    isTextdom(ele: Element): ele is HTMLInputElement;
    run(accessor: any, ...args: any[]): void;
}
