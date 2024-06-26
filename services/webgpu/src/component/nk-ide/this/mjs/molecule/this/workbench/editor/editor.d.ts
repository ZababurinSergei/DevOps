import React from 'react';
import { IEditor } from './../../../this/model';
import { IEditorController } from './../../../this/controller/editor';
import { ILayout } from './../../../this/model/workbench/layout';
export declare function Editor(props: {
    editor?: IEditor;
    layout?: ILayout;
} & IEditorController): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Editor>;
export default _default;
