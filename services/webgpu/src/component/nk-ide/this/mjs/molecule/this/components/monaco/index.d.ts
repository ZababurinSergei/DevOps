import 'reflect-metadata';
import React from 'react';
import { PureComponent } from 'react';
import { editor } from 'monaco-editor';
export declare const SYMBOL_MONACO_EDITOR: string;
export interface IMonacoEditorProps extends React.ComponentProps<any> {
    /**
     * The option of monaco editor
     */
    options?: editor.IStandaloneEditorConstructionOptions;
    /**
     * The override for monaco editor
     */
    override?: editor.IEditorOverrideServices;
    editorInstanceRef?: (instance: editor.IStandaloneCodeEditor) => void;
    onChangeEditorProps?: (props: IMonacoEditorProps, nextProps: IMonacoEditorProps) => void;
}
export declare class MonacoEditor extends PureComponent<IMonacoEditorProps> {
    /**
     * The instance of monaco
     */
    private monacoInstance;
    /**
     * The dom element of editor container
     */
    private monacoDom;
    private readonly monacoService;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    render(): React.JSX.Element;
}
