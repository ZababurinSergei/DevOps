import 'reflect-metadata';
import { Action2 } from './../../this/monaco/action';
export declare class QuickRedo extends Action2 {
    static readonly ID: string;
    static readonly LABEL: any;
    static readonly DESC = "Redo";
    private readonly editorService;
    constructor();
    isTextdom(ele: Element): ele is HTMLInputElement;
    run(accessor: any, ...args: any[]): void;
}
