import React from 'react';
import { prefixClaName } from './../../../this/common/className';
import { MonacoEditor } from './../../../this/components/monaco';
const defaultClassName = prefixClaName('output');
function Output(props) {
    const { id, data = '', onUpdateEditorIns } = props;
    return (React.createElement("div", { className: defaultClassName },
        React.createElement(MonacoEditor, { key: id, options: {
                value: data,
                readOnly: true,
                lineDecorationsWidth: 0,
                lineNumbers: 'off',
                minimap: {
                    enabled: false,
                },
                automaticLayout: true,
            }, editorInstanceRef: (editorInstance) => {
                onUpdateEditorIns === null || onUpdateEditorIns === void 0 ? void 0 : onUpdateEditorIns(editorInstance);
            } })));
}
export default Output;
