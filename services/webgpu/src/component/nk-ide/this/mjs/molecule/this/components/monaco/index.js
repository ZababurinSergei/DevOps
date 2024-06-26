import 'reflect-metadata';
import React from 'react';
import { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { APP_PREFIX } from './../../../this/common/const';
import { MonacoService } from './../../../this/monaco/monacoService';
import { container } from 'tsyringe';
export const SYMBOL_MONACO_EDITOR = `${APP_PREFIX}-monaco-editor`;
export class MonacoEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.monacoService = container.resolve(MonacoService);
    }
    componentDidMount() {
        var _a;
        const { options = {}, override, editorInstanceRef } = this.props;
        if (!this.monacoInstance) {
            this.monacoInstance = (_a = this.monacoService) === null || _a === void 0 ? void 0 : _a.create(this.monacoDom, options, override);
            editorInstanceRef === null || editorInstanceRef === void 0 ? void 0 : editorInstanceRef(this.monacoInstance);
        }
    }
    componentDidUpdate(prevProps) {
        const { onChangeEditorProps } = this.props;
        // TODO: Functions are compared by strict equality
        !isEqual(prevProps, this.props) &&
            (onChangeEditorProps === null || onChangeEditorProps === void 0 ? void 0 : onChangeEditorProps(prevProps, this.props));
    }
    render() {
        const { style } = this.props;
        let renderStyle = {
            position: 'relative',
            minHeight: '400px',
            height: '100%',
            width: '100%',
        };
        renderStyle = style ? Object.assign(renderStyle, style) : renderStyle;
        return (React.createElement("div", { style: renderStyle, className: SYMBOL_MONACO_EDITOR, ref: (domIns) => {
                this.monacoDom = domIns;
            } }));
    }
}
