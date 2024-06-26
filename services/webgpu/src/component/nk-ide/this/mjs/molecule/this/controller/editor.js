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
import { container, singleton } from 'tsyringe';
import { EditorEvent, } from './../../this/model/workbench/editor';
import { Controller } from './../../this/react/controller';
import { editor as MonacoEditor, Uri } from './../../this/monaco';
import { BuiltinService, EditorService, LayoutService, StatusBarService, } from './../../this/services';
let EditorController = class EditorController extends Controller {
    constructor() {
        super();
        this.editorStates = new Map();
        this.onClickContextMenu = (e, item, tabItem) => {
            const menuId = item === null || item === void 0 ? void 0 : item.id;
            const tabId = tabItem === null || tabItem === void 0 ? void 0 : tabItem.id;
            const { current } = this.editorService.getState();
            const groupId = current === null || current === void 0 ? void 0 : current.id;
            const { EDITOR_MENU_CLOSE, EDITOR_MENU_CLOSE_OTHERS, EDITOR_MENU_CLOSE_ALL, EDITOR_MENU_CLOSE_TO_RIGHT, EDITOR_MENU_CLOSE_TO_LEFT, } = this.builtinService.getConstants();
            switch (menuId) {
                case EDITOR_MENU_CLOSE: {
                    this.onCloseTab(tabId, groupId);
                    break;
                }
                case EDITOR_MENU_CLOSE_OTHERS: {
                    this.onCloseOther(tabItem, groupId);
                    break;
                }
                case EDITOR_MENU_CLOSE_ALL: {
                    this.onCloseAll(groupId);
                    break;
                }
                case EDITOR_MENU_CLOSE_TO_RIGHT: {
                    this.onCloseToRight(tabItem, groupId);
                    break;
                }
                case EDITOR_MENU_CLOSE_TO_LEFT: {
                    this.onCloseToLeft(tabItem, groupId);
                    break;
                }
                default: {
                    this.emit(EditorEvent.onActionsClick, menuId, current);
                }
            }
        };
        this.onCloseAll = (groupId) => {
            this.emit(EditorEvent.OnCloseAll, groupId);
        };
        this.onCloseTab = (tabId, groupId) => {
            if (tabId && groupId) {
                this.emit(EditorEvent.OnCloseTab, tabId, groupId);
            }
        };
        this.onCloseToRight = (tabItem, groupId) => {
            this.emit(EditorEvent.OnCloseToRight, tabItem, groupId);
        };
        this.onCloseToLeft = (tabItem, groupId) => {
            this.emit(EditorEvent.OnCloseToLeft, tabItem, groupId);
        };
        this.onCloseOther = (tabItem, groupId) => {
            this.emit(EditorEvent.OnCloseOther, tabItem, groupId);
        };
        this.onMoveTab = (updateTabs, groupId) => {
            this.editorService.updateGroup(groupId, {
                data: updateTabs,
            });
            this.emit(EditorEvent.OnMoveTab, updateTabs, groupId);
        };
        this.onSelectTab = (tabId, groupId) => {
            this.editorService.setActive(groupId, tabId);
            this.emit(EditorEvent.OnSelectTab, tabId, groupId);
        };
        /**
         * Called when open a new group
         */
        this.onUpdateEditorIns = (editorInstance, groupId) => {
            var _a, _b;
            if (!editorInstance)
                return;
            this.initEditorEvents(editorInstance, groupId);
            this.editorService.updateGroup(groupId, {
                editorInstance: editorInstance,
            });
            this.editorService.updateCurrentGroup({ editorInstance });
            const { current } = this.editorService.getState();
            const tab = current === null || current === void 0 ? void 0 : current.tab;
            this.openTab(editorInstance, tab.id.toString(), (_a = tab === null || tab === void 0 ? void 0 : tab.data) === null || _a === void 0 ? void 0 : _a.value, (_b = tab === null || tab === void 0 ? void 0 : tab.data) === null || _b === void 0 ? void 0 : _b.language);
            this.onEditorInstanceMount(editorInstance);
        };
        this.onClickActions = (action) => {
            const { current } = this.editorService.getState();
            if (!current)
                return;
            const { EDITOR_MENU_CLOSE_ALL, EDITOR_MENU_SHOW_OPENEDITORS, EDITOR_MENU_SPILIT, } = this.builtinService.getConstants();
            switch (action.id) {
                case EDITOR_MENU_CLOSE_ALL: {
                    this.onCloseAll(current.id);
                    break;
                }
                case EDITOR_MENU_SHOW_OPENEDITORS: {
                    // TODO
                    break;
                }
                case EDITOR_MENU_SPILIT: {
                    this.editorService.cloneGroup();
                    const { groupSplitPos } = this.layoutService.getState();
                    this.layoutService.setGroupSplitSize(new Array(groupSplitPos.length + 1).fill('auto'));
                    this.emit(EditorEvent.OnSplitEditorRight);
                    break;
                }
                default: {
                    this.emit(EditorEvent.onActionsClick, action.id, current);
                }
            }
        };
        this.onPaneSizeChange = (newSize) => {
            this.layoutService.setGroupSplitSize(newSize);
        };
        this.getViewState = (id) => {
            return this.editorStates.get(id);
        };
        /**
         * Called when Editor props changed
         */
        this.onChangeEditorProps = (prevProps, props) => {
            const { path, options } = props;
            if ((prevProps === null || prevProps === void 0 ? void 0 : prevProps.path) !== path) {
                const { current } = this.editorService.getState();
                const editorInstance = current === null || current === void 0 ? void 0 : current.editorInstance;
                this.editorStates.set(prevProps.path, editorInstance === null || editorInstance === void 0 ? void 0 : editorInstance.saveViewState());
                this.openTab(editorInstance, path, options === null || options === void 0 ? void 0 : options.value, options === null || options === void 0 ? void 0 : options.language);
            }
        };
        this.editorService = container.resolve(EditorService);
        this.layoutService = container.resolve(LayoutService);
        this.statusBarService = container.resolve(StatusBarService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { builtInEditorInitialActions, builtInEditorInitialMenu, BuiltInEditorOptions, } = this.builtinService.getModules();
        const defaultActions = this.editorService.getDefaultActions();
        if (!defaultActions.length) {
            const builtinActions = builtInEditorInitialActions || [];
            this.editorService.setDefaultActions(builtinActions);
        }
        const defaultMenus = this.editorService.getDefaultMenus();
        if (!defaultMenus.length) {
            const builtinMenus = builtInEditorInitialMenu || [];
            this.editorService.setDefaultMenus(builtinMenus);
        }
        this.editorService.setState({
            editorOptions: BuiltInEditorOptions || {},
        });
    }
    open(tab, groupId) {
        this.editorService.open(tab, groupId);
    }
    initEditorEvents(editorInstance, groupId) {
        if (!editorInstance)
            return;
        editorInstance.onDidChangeModelContent((event) => {
            var _a, _b, _c, _d;
            const { current } = this.editorService.getState();
            const tab = current === null || current === void 0 ? void 0 : current.tab;
            if (!tab)
                return;
            const currentEditorUri = (_b = (_a = current.editorInstance) === null || _a === void 0 ? void 0 : _a.getModel()) === null || _b === void 0 ? void 0 : _b.uri;
            const updateEditorUri = (_c = editorInstance === null || editorInstance === void 0 ? void 0 : editorInstance.getModel()) === null || _c === void 0 ? void 0 : _c.uri;
            if ((currentEditorUri === null || currentEditorUri === void 0 ? void 0 : currentEditorUri.path) !== (updateEditorUri === null || updateEditorUri === void 0 ? void 0 : updateEditorUri.path))
                return;
            const newValue = (_d = editorInstance.getModel()) === null || _d === void 0 ? void 0 : _d.getValue();
            const updatedTab = Object.assign(Object.assign({}, tab), { data: Object.assign(Object.assign({}, tab.data), { value: newValue }) });
            this.editorService.updateTab(updatedTab, groupId);
            this.updateStatusBar(editorInstance);
            this.emit(EditorEvent.OnUpdateTab, updatedTab);
        });
        editorInstance.onDidFocusEditorText(() => {
            const group = this.editorService.getGroupById(groupId);
            if (group === null || group === void 0 ? void 0 : group.tab.id) {
                this.editorService.setActive(groupId, group.tab.id);
                this.updateEditorLineColumnInfo(editorInstance);
            }
        });
        editorInstance.onDidChangeCursorSelection(() => {
            this.updateEditorLineColumnInfo(editorInstance);
        });
        editorInstance.onDidBlurEditorText(() => {
            var _a;
            const { current } = this.editorService.getState();
            const tab = current === null || current === void 0 ? void 0 : current.tab;
            if (tab === null || tab === void 0 ? void 0 : tab.id) {
                const viewState = editorInstance === null || editorInstance === void 0 ? void 0 : editorInstance.saveViewState();
                this.editorStates.set((_a = tab.id) === null || _a === void 0 ? void 0 : _a.toString(), viewState);
            }
        });
    }
    /**
     * Open a tab via instance.
     * Actually, one tab to one Model, so that
     * - the action to open a exist tab equals to switch the model in instance
     * - the action to open a new tab equals to create a new model in instance
     */
    openTab(editorInstance, path, value, language) {
        let model = MonacoEditor.getModel(Uri.parse(path));
        if (!model) {
            model = MonacoEditor.createModel(value, language, Uri.parse(path));
        }
        // 1. switch model
        editorInstance.setModel(model);
        // 2. Restore view state
        const editorState = this.editorStates.get(path);
        if (editorState) {
            // viewState contains: scroller info, cursor info, contributions info
            editorInstance.restoreViewState(editorState);
        }
        editorInstance === null || editorInstance === void 0 ? void 0 : editorInstance.focus();
    }
    updateStatusBar(editorInstance) {
        if (editorInstance) {
            // TODO
        }
    }
    updateEditorLineColumnInfo(editorInstance) {
        if (editorInstance) {
            const position = editorInstance.getPosition();
            const { STATUS_EDITOR_INFO } = this.builtinService.getModules();
            if (STATUS_EDITOR_INFO) {
                this.statusBarService.update(Object.assign(STATUS_EDITOR_INFO, {
                    data: {
                        ln: position === null || position === void 0 ? void 0 : position.lineNumber,
                        col: position === null || position === void 0 ? void 0 : position.column,
                    },
                }));
            }
        }
    }
    onEditorInstanceMount(editorInstance) {
        this.emit(EditorEvent.onEditorInstanceMount, editorInstance);
    }
};
EditorController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], EditorController);
export { EditorController };
