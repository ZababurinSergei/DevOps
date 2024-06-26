import 'reflect-metadata';
import { DisposableStore } from 'monaco-editor/esm/vs/base/common/lifecycle';
import { CancellationToken } from 'monaco-editor/esm/vs/base/common/cancellation';
import { ICommandQuickPick } from 'monaco-editor/esm/vs/platform/quickinput/browser/commandsQuickAccess';
import { AbstractEditorCommandsQuickAccessProvider } from 'monaco-editor/esm/vs/editor/contrib/quickAccess/commandsQuickAccess';
import { ServicesAccessor } from 'monaco-editor/esm/vs/platform/instantiation/common/instantiation';
import { editor as MonacoEditor } from './../../this/monaco';
import { IEditorService } from './../../this/services';
import { Action2 } from './../../this/monaco/action';
export declare class CommandQuickAccessProvider extends AbstractEditorCommandsQuickAccessProvider {
    static PREFIX: string;
    protected readonly editorService: IEditorService | undefined;
    protected get activeTextEditorControl(): MonacoEditor.IStandaloneCodeEditor | undefined;
    protected static get services(): ServiceCollection;
    constructor();
    protected getCommandPicks(disposables: DisposableStore, token: CancellationToken): Promise<Array<ICommandQuickPick>>;
    protected getGlobalCommandPicks(disposables: DisposableStore): ICommandQuickPick[];
}
export declare class CommandQuickAccessViewAction extends Action2 {
    static ID: string;
    constructor();
    run(accessor: ServicesAccessor): void;
}
