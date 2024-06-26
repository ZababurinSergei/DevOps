import React from 'react';
import { IEditorAction } from './../../../this/model';
import { IEditorController } from './../../../this/controller/editor';
export interface IEditorActionProps extends IEditorAction {
    isActiveGroup: boolean;
}
declare function EditorAction(props: IEditorActionProps & IEditorController): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof EditorAction>;
export default _default;
