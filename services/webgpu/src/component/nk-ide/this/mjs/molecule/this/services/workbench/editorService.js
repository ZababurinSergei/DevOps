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
import { cloneDeep } from 'lodash';
import { Component } from './../../../this/react';
import { EditorModel, EditorGroupModel, EditorEvent, } from './../../../this/model';
import { randomId, searchById } from './../../../this/common/utils';
import { editor as MonacoEditor, Uri } from './../../../this/monaco';
import { ExplorerService } from './explorer/explorerService';
import { LayoutService } from './layoutService';
let EditorService = class EditorService extends Component {
    constructor() {
        super();
        this.defaultActions = [];
        this.defaultMenus = [];
        this.updateActions = (actions, groupId) => {
            var _a;
            const { current, groups: rawGroups } = this.getState();
            if (!current)
                return;
            const groups = (rawGroups === null || rawGroups === void 0 ? void 0 : rawGroups.concat()) || [];
            const targetGroup = groups.find(searchById(groupId || current.id));
            if (targetGroup) {
                const newActions = ((_a = targetGroup.actions) === null || _a === void 0 ? void 0 : _a.concat()) || [];
                newActions.forEach((action) => {
                    const target = actions.find((item) => item.id === action.id);
                    if (target) {
                        Object.assign(action, target);
                    }
                });
                targetGroup.actions = newActions;
                this.setState({
                    current: targetGroup.id === current.id ? targetGroup : current,
                    groups,
                });
            }
        };
        this.state = container.resolve(EditorModel);
        this.explorerService = container.resolve(ExplorerService);
        this.layoutService = container.resolve(LayoutService);
    }
    updateEditorOptions(options) {
        var _a;
        const editorOptions = Object.assign({}, this.state.editorOptions, options);
        this.setState({
            editorOptions,
        });
        (_a = this.editorInstance) === null || _a === void 0 ? void 0 : _a.updateOptions(editorOptions);
    }
    getDefaultActions() {
        return cloneDeep(this.defaultActions);
    }
    getDefaultMenus() {
        return cloneDeep(this.defaultMenus);
    }
    disposeModel(tabs) {
        const arr = Array.isArray(tabs) ? tabs : [tabs];
        arr.forEach((tab) => {
            var _a;
            (_a = MonacoEditor.getModel(Uri.parse(tab.id.toString()))) === null || _a === void 0 ? void 0 : _a.dispose();
        });
    }
    isOpened(tabId, filterGroups) {
        const groups = filterGroups || this.state.groups || [];
        return groups.some((group) => this.getTabById(tabId, group.id));
    }
    setDefaultActions(actions) {
        this.defaultActions = actions;
    }
    setDefaultMenus(menus) {
        this.defaultMenus = menus;
    }
    setEntry(component) {
        this.setState({
            entry: component,
        });
    }
    getTabById(tabId, groupId) {
        var _a;
        const group = this.getGroupById(groupId);
        if (group) {
            return (_a = group.data) === null || _a === void 0 ? void 0 : _a.find(searchById(tabId));
        }
        return undefined;
    }
    get editorInstance() {
        var _a;
        return (_a = this.state.current) === null || _a === void 0 ? void 0 : _a.editorInstance;
    }
    updateTab(tab, groupId) {
        var _a, _b, _c;
        let updatedTab;
        const editorValue = (_a = tab === null || tab === void 0 ? void 0 : tab.data) === null || _a === void 0 ? void 0 : _a.value;
        if (groupId) {
            const group = this.getGroupById(groupId);
            if ((_b = group === null || group === void 0 ? void 0 : group.data) === null || _b === void 0 ? void 0 : _b.length) {
                const tabData = group.data.find(searchById(tab.id));
                if (tabData) {
                    updatedTab = Object.assign(tabData, tab);
                }
                if (group.activeTab === tab.id) {
                    updatedTab = Object.assign(group.tab, tab);
                }
                // Update model's value
                const model = MonacoEditor.getModel(Uri.parse(tab.id.toString()));
                if (model) {
                    model.setValue(editorValue || '');
                }
                this.updateGroup(groupId, group);
                if (groupId === ((_c = this.state.current) === null || _c === void 0 ? void 0 : _c.id)) {
                    this.updateCurrentGroup(group);
                }
            }
        }
        else {
            const { groups = [], current } = this.state;
            groups.forEach((group) => {
                const tabData = this.getTabById(tab.id, group.id);
                if (tabData) {
                    updatedTab = Object.assign(tabData, tab);
                }
                if (group.activeTab === tab.id) {
                    updatedTab = Object.assign(group.tab, tab);
                }
                // Update model's value
                const model = MonacoEditor.getModel(Uri.parse(tab.id.toString()));
                if (model) {
                    model.setValue(editorValue || '');
                }
            });
            if ((current === null || current === void 0 ? void 0 : current.activeTab) === tab.id) {
                updatedTab = Object.assign(current.tab, tab);
            }
            this.setState({
                current: current ? Object.assign({}, current) : current,
                groups: [...groups],
            });
        }
        return updatedTab;
    }
    setGroupEditorValue(group, value) {
        var _a;
        const model = (_a = group.editorInstance) === null || _a === void 0 ? void 0 : _a.getModel();
        if (!model)
            return;
        const currentValue = model === null || model === void 0 ? void 0 : model.getValue();
        if (currentValue !== value) {
            model === null || model === void 0 ? void 0 : model.setValue(value);
        }
    }
    closeTab(tabId, groupId) {
        const groupIndex = this.getGroupIndexById(groupId);
        if (groupIndex === -1)
            return;
        const { groups = [] } = this.state;
        const nextGroups = [...groups];
        const nextGroup = nextGroups[groupIndex];
        const tabIndex = nextGroup.data.findIndex(searchById(tabId));
        const tab = cloneDeep(nextGroup.data[tabIndex]);
        if (tabIndex === -1)
            return;
        if (nextGroup.data.length === 1 && tabIndex === 0) {
            // the tab which is closing is the only one tab in current group,
            // so delete group and choose last or former group as current one
            const activeGroup = nextGroups[groupIndex + 1] || nextGroups[groupIndex - 1];
            nextGroups.splice(groupIndex, 1);
            this.setState({
                groups: nextGroups,
                current: (nextGroups === null || nextGroups === void 0 ? void 0 : nextGroups.length) === 0 ? undefined : activeGroup,
            }, () => {
                const isOpened = this.isOpened(tabId);
                // the model of closed tab should be disposed after closing
                !isOpened && this.disposeModel(tab);
                this.explorerService.forceUpdate();
            });
            // reset the editor group
            this.layoutService.setGroupSplitSize(nextGroups.length
                ? new Array(nextGroups.length + 1).fill('auto')
                : []);
            return;
        }
        if (tabId === nextGroup.activeTab) {
            // the tab which is closing is the active one,
            // then choose last or former tab as current one
            const nextTab = nextGroup.data[tabIndex + 1] || nextGroup.data[tabIndex - 1];
            nextGroup.tab = Object.assign({}, nextTab);
            nextGroup.activeTab = nextTab === null || nextTab === void 0 ? void 0 : nextTab.id;
        }
        nextGroup.data.splice(tabIndex, 1);
        nextGroups[groupIndex] = nextGroup;
        this.setState({
            current: nextGroup,
            groups: nextGroups,
        }, () => {
            const isOpened = this.isOpened(tabId);
            !isOpened && this.disposeModel(tab);
            this.explorerService.forceUpdate();
        });
    }
    closeOther(tab, groupId) {
        const groupIndex = this.getGroupIndexById(groupId);
        if (groupIndex <= -1)
            return;
        const { groups = [] } = this.state;
        const nextGroups = [...groups];
        const tabId = tab.id;
        const nextGroup = nextGroups[groupIndex];
        const nextTabData = nextGroup.data;
        const updateTabs = nextTabData.filter(searchById(tabId));
        // tab data is unlikely to be large enough to affect exec time, so we filter twice for maintainability
        const removedTabs = cloneDeep(nextTabData.filter((item) => item.id !== tabId &&
            !this.isOpened(item.id, nextGroups.filter((g) => g.id !== groupId))));
        this.updateGroup(groupId, {
            data: updateTabs,
        });
        this.setActive(groupId, tabId);
        this.disposeModel(removedTabs);
        this.explorerService.forceUpdate();
    }
    closeToRight(tab, groupId) {
        const groupIndex = this.getGroupIndexById(groupId);
        if (groupIndex <= -1)
            return;
        const { groups = [] } = this.state;
        const nextGroups = [...groups];
        const tabId = tab.id;
        const nextGroup = nextGroups[groupIndex];
        const nextTabData = nextGroup.data;
        const tabIndex = nextTabData.findIndex(searchById(tabId));
        if (tabIndex <= -1)
            return;
        const updateTabs = nextTabData === null || nextTabData === void 0 ? void 0 : nextTabData.slice(0, tabIndex + 1);
        const removedTabs = cloneDeep(nextTabData === null || nextTabData === void 0 ? void 0 : nextTabData.slice(tabIndex + 1).filter((item) => !this.isOpened(item.id, nextGroups.filter((g) => g.id !== groupId))));
        this.updateGroup(groupId, {
            data: updateTabs,
        });
        this.setActive(groupId, tabId);
        this.disposeModel(removedTabs || []);
        this.explorerService.forceUpdate();
    }
    closeToLeft(tab, groupId) {
        const groupIndex = this.getGroupIndexById(groupId);
        if (groupIndex <= -1)
            return;
        const { groups = [] } = this.state;
        const nextGroups = [...groups];
        const tabId = tab.id;
        const nextGroup = nextGroups[groupIndex];
        const nextTabData = nextGroup.data;
        const tabIndex = nextTabData.findIndex(searchById(tabId));
        if (tabIndex <= -1)
            return;
        const updateTabs = nextTabData === null || nextTabData === void 0 ? void 0 : nextTabData.slice(tabIndex, nextTabData.length);
        const removedTabs = cloneDeep(nextTabData === null || nextTabData === void 0 ? void 0 : nextTabData.slice(0, tabIndex).filter((item) => !this.isOpened(item.id, nextGroups.filter((g) => g.id !== groupId))));
        this.updateGroup(groupId, {
            data: updateTabs,
        });
        this.setActive(groupId, tabId);
        this.disposeModel(removedTabs || []);
        this.explorerService.forceUpdate();
    }
    getGroupById(groupId) {
        const { groups } = this.state;
        return groups.find(searchById(groupId));
    }
    getGroupIndexById(id) {
        const { groups } = this.state;
        return groups.findIndex(searchById(id));
    }
    getGroupIdByTab(tabId) {
        const { groups = [] } = this.state;
        const isOpened = this.isOpened(tabId, groups);
        if (isOpened) {
            const targetGroup = groups.find((group) => this.getTabById(tabId, group.id));
            return targetGroup.id;
        }
        else {
            return null;
        }
    }
    setActive(groupId, tabId) {
        const { groups = [] } = this.state;
        const groupIndex = this.getGroupIndexById(groupId);
        if (groupIndex > -1) {
            const nextGroups = [...groups];
            const group = nextGroups[groupIndex];
            const tab = this.getTabById(tabId, group.id);
            if (tab) {
                const nextGroup = Object.assign({}, group);
                nextGroup.tab = Object.assign({}, tab);
                nextGroup.activeTab = tabId;
                nextGroups[groupIndex] = nextGroup;
                this.setState({
                    current: nextGroup,
                    groups: nextGroups,
                });
            }
        }
    }
    updateGroup(groupId, groupValues) {
        const { groups = [] } = this.state;
        const nextGroups = [...groups];
        const groupIndex = this.getGroupIndexById(groupId);
        if (groupIndex > -1) {
            const nextGroup = Object.assign({}, nextGroups[groupIndex], groupValues);
            nextGroups[groupIndex] = nextGroup;
            this.setState({
                groups: nextGroups,
            });
        }
    }
    updateCurrentGroup(currentValues) {
        const { current } = this.state;
        const nextGroup = Object.assign({}, current, currentValues);
        this.setState({ current: nextGroup });
    }
    /**
     * @param groupId If provided, will open tab in specific group
     */
    open(tab, groupId) {
        const { current, groups = [] } = this.state;
        let group = current;
        if (groupId) {
            // find specific group
            group = this.getGroupById(groupId);
        }
        if (group) {
            // insert tab into group
            const { id: tabId } = tab;
            const isExist = group === null || group === void 0 ? void 0 : group.data.find(searchById(tabId));
            if (isExist && tabId === (group === null || group === void 0 ? void 0 : group.activeTab))
                return;
            const groupIndex = this.getGroupIndexById(group.id);
            const currentGroup = groups[groupIndex];
            if (!isExist) {
                group.data.push(tab);
            }
            group.tab = tab;
            group.activeTab = tabId;
            groups[groupIndex] = Object.assign(Object.assign({}, currentGroup), { tab, activeTab: tabId });
        }
        else {
            // if group isn't exist, open a new group
            group = new EditorGroupModel(groups.length + 1, tab, tab.id, [tab], this.defaultActions, this.defaultMenus);
            groups.push(group);
        }
        this.emit(EditorEvent.OpenTab, tab);
        this.setState({
            current: group,
            groups: [...groups],
        });
        this.explorerService.forceUpdate();
    }
    onOpenTab(callback) {
        this.subscribe(EditorEvent.OpenTab, callback);
    }
    closeAll(groupId) {
        var _a;
        const { current, groups = [] } = this.state;
        const groupIndex = this.getGroupIndexById(groupId);
        if (groupIndex > -1) {
            const nextGroups = [...groups];
            let nextCurrentGroup = current;
            const removedGroup = nextGroups.splice(groupIndex, 1);
            const removed = cloneDeep(((_a = removedGroup[0].data) === null || _a === void 0 ? void 0 : _a.filter((item) => !this.isOpened(item.id, nextGroups))) || []);
            if (current && current.id === groupId) {
                nextCurrentGroup =
                    groups[groupIndex + 1] || groups[groupIndex - 1];
            }
            this.setState({
                groups: nextGroups,
                current: nextCurrentGroup,
            }, () => {
                // dispose all models in specific group
                this.disposeModel(removed);
                this.explorerService.forceUpdate();
            });
            // reset editor group
            this.layoutService.setGroupSplitSize(nextGroups.length
                ? new Array(nextGroups.length + 1).fill('auto')
                : []);
        }
    }
    cloneGroup(groupId) {
        const { current, groups = [] } = this.state;
        const cloneGroup = Object.assign({}, groupId ? this.getGroupById(groupId) : current);
        // get an random id for new group
        const id = randomId();
        const initialTab = Object.assign({}, cloneGroup.tab);
        cloneGroup.data = [initialTab];
        cloneGroup.tab = initialTab;
        cloneGroup.activeTab = initialTab.id;
        cloneGroup.id = id;
        this.setState({
            current: cloneGroup,
            groups: [...groups, cloneGroup],
        });
        return cloneGroup;
    }
    onUpdateTab(callback) {
        this.subscribe(EditorEvent.OnUpdateTab, callback);
    }
    onMoveTab(callback) {
        this.subscribe(EditorEvent.OnMoveTab, callback);
    }
    onSelectTab(callback) {
        this.subscribe(EditorEvent.OnSelectTab, callback);
    }
    onCloseAll(callback) {
        this.subscribe(EditorEvent.OnCloseAll, callback);
    }
    onCloseTab(callback) {
        this.subscribe(EditorEvent.OnCloseTab, callback);
    }
    onCloseOther(callback) {
        this.subscribe(EditorEvent.OnCloseOther, callback);
    }
    onCloseToLeft(callback) {
        this.subscribe(EditorEvent.OnCloseToLeft, callback);
    }
    onCloseToRight(callback) {
        this.subscribe(EditorEvent.OnCloseToRight, callback);
    }
    onActionsClick(callback) {
        this.subscribe(EditorEvent.onActionsClick, callback);
    }
    onEditorInstanceMount(callback) {
        this.subscribe(EditorEvent.onEditorInstanceMount, callback);
    }
};
EditorService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], EditorService);
export { EditorService };
