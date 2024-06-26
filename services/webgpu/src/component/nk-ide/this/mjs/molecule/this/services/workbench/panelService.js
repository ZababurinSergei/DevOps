var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import { StandaloneEditor } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeEditor';
import { cloneDeepWith, cloneDeep } from 'lodash';
import pickBy from 'lodash/pickBy';
import { Component } from './../../../this/react';
import { PanelEvent, PanelModel, } from './../../../this/model/workbench/panel';
import { searchById } from './../../../this/common/utils';
import { BuiltinService, LayoutService } from './../../../this/services';
import logger from './../../../this/common/logger';
let PanelService = class PanelService extends Component {
    constructor() {
        super();
        this.state = container.resolve(PanelModel);
        this.layoutService = container.resolve(LayoutService);
        this.builtinService = container.resolve(BuiltinService);
    }
    updateOutputProperty(data) {
        const { PANEL_OUTPUT } = this.builtinService.getConstants();
        const truthData = pickBy(data, (item) => item !== undefined);
        return this.update(Object.assign(this.getPanel(PANEL_OUTPUT), truthData));
    }
    get outputEditorInstance() {
        var _a;
        const { PANEL_OUTPUT } = this.builtinService.getConstants();
        const outputPane = (_a = this.state.data) === null || _a === void 0 ? void 0 : _a.find(searchById(PANEL_OUTPUT));
        return outputPane === null || outputPane === void 0 ? void 0 : outputPane.outputEditorInstance;
    }
    setActive(id) {
        const panel = this.getPanel(id);
        if (panel) {
            this.open(panel);
        }
        else {
            logger.error(`There is no panel found in data via ${id}. If you want to open a brand-new panel, please use the open method`);
        }
    }
    toggleMaximize() {
        const { PANEL_TOOLBOX_RESIZE } = this.builtinService.getConstants();
        const { builtInPanelToolboxResize, builtInPanelToolboxReStore } = this.builtinService.getModules();
        const { toolbox = [] } = this.state;
        if (builtInPanelToolboxResize && builtInPanelToolboxReStore) {
            const resizeBtnIndex = toolbox === null || toolbox === void 0 ? void 0 : toolbox.findIndex(searchById(PANEL_TOOLBOX_RESIZE));
            const resizeBtn = toolbox[resizeBtnIndex];
            if (resizeBtn) {
                const panelMaximized = this.layoutService.togglePanelMaximized();
                toolbox[resizeBtnIndex] = panelMaximized
                    ? builtInPanelToolboxReStore
                    : builtInPanelToolboxResize;
            }
        }
    }
    open(data) {
        const { data: stateData = [] } = this.state;
        let current = cloneDeep(data);
        const index = stateData.findIndex(searchById(current.id));
        if (index > -1) {
            current = stateData[index];
        }
        else {
            // Add the new panel item
            this.add(current);
        }
        this.setState({
            current,
        });
    }
    getPanel(id) {
        const { data = [] } = this.state;
        return cloneDeepWith(data.find(searchById(id)), (value) => {
            // prevent the browser from OOM
            // because when cloneDeep the StandaloneEditor class, it'll get infinity loop in
            // https://unpkg.com/monaco-editor@0.23.0/esm/vs/editor/common/model/pieceTreeTextBuffer/pieceTreeBase.js#L398
            // class PieceTreeBase.getOffsetAt.while
            if (value &&
                typeof value === 'object' &&
                value instanceof StandaloneEditor) {
                return value;
            }
        });
    }
    getOutputValue() {
        const { PANEL_OUTPUT = '' } = this.builtinService.getConstants();
        const outputPanel = this.getPanel(PANEL_OUTPUT);
        return (outputPanel === null || outputPanel === void 0 ? void 0 : outputPanel.data) || '';
    }
    /**
     * Onyl support to update several properties
     */
    updateOutput(data) {
        const { title, name, sortIndex, active, closable, editable } = data;
        return this.updateOutputProperty({
            title,
            name,
            sortIndex,
            active,
            closable,
            editable,
        });
    }
    appendOutput(content) {
        var _a;
        const outputValue = this.getOutputValue();
        this.updateOutputProperty({
            data: outputValue + content,
        });
        (_a = this.outputEditorInstance) === null || _a === void 0 ? void 0 : _a.setValue(outputValue + content);
    }
    cleanOutput() {
        var _a;
        (_a = this.outputEditorInstance) === null || _a === void 0 ? void 0 : _a.setValue('');
    }
    add(data) {
        let original = this.state.data || [];
        const cloneData = cloneDeep(data);
        if (Array.isArray(cloneData)) {
            original = original.concat(cloneData);
        }
        else {
            original.push(cloneData);
        }
        this.setState({
            data: original,
        });
    }
    update(data) {
        const panes = this.state.data || [];
        const targetIndex = panes === null || panes === void 0 ? void 0 : panes.findIndex(searchById(data.id));
        if (targetIndex !== undefined && targetIndex > -1) {
            Object.assign(panes[targetIndex], data);
            this.setState({
                data: [...panes],
            });
            return panes[targetIndex];
        }
        else {
            logger.error(`There is no panel found in data via the ${data.id}`);
            return undefined;
        }
    }
    remove(id) {
        const { data } = this.state;
        const targetIndex = data === null || data === void 0 ? void 0 : data.findIndex(searchById(id));
        if (targetIndex !== undefined && targetIndex > -1) {
            const result = (data === null || data === void 0 ? void 0 : data.splice(targetIndex, 1)) || [];
            this.setState({
                data: data,
            });
            return result[0];
        }
        else {
            logger.error(`There is no panel found in data via the ${id}`);
            return undefined;
        }
    }
    reset() {
        this.setState({
            data: [],
            current: null,
            toolbox: [],
        });
        this.cleanOutput();
    }
    onTabChange(callback) {
        this.subscribe(PanelEvent.onTabChange, callback);
    }
    onToolbarClick(callback) {
        this.subscribe(PanelEvent.onToolbarClick, callback);
    }
    onTabClose(callback) {
        this.subscribe(PanelEvent.onTabClose, callback);
    }
};
PanelService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], PanelService);
export { PanelService };
