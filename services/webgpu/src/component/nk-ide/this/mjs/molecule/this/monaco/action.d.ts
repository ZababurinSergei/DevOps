import { ServicesAccessor } from 'monaco-editor/esm/vs/platform/instantiation/common/instantiation';
import { IDisposable } from './common';
export declare abstract class Action2 {
    readonly desc: Readonly<{
        /**
         * Specify visible in quick access view
         */
        f1: boolean;
        [key: string]: any;
    }>;
    static readonly ID: string;
    constructor(desc: Readonly<{
        /**
         * Specify visible in quick access view
         */
        f1: boolean;
        [key: string]: any;
    }>);
    abstract run(accessor: ServicesAccessor, ...args: any[]): any;
}
export declare function registerAction2(Ctor: {
    new (): Action2;
}): IDisposable;
