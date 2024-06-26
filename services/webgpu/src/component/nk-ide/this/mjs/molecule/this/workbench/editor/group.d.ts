import { IEditorGroup, IEditorOptions } from './../../../this/model';
import React from 'react';
import { IEditorController } from './../../../this/controller/editor';
export interface IEditorGroupProps extends IEditorGroup {
    currentGroup?: IEditorGroup;
    editorOptions?: IEditorOptions;
    group?: IEditorGroup;
}
export declare function EditorGroup(props: IEditorGroupProps & IEditorController): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof EditorGroup>;
export default _default;
