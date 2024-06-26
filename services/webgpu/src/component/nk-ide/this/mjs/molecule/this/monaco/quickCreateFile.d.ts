import 'reflect-metadata';
import { Action2 } from './../../this/monaco/action';
export declare class QuickCreateFile extends Action2 {
    static readonly ID: string;
    static readonly LABEL: any;
    static readonly DESC = "New File";
    private readonly folderTreeController;
    constructor();
    run(): void;
}
