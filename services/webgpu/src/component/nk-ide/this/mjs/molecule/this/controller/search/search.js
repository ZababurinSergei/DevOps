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
import { Controller } from './../../../this/react/controller';
import { container, singleton } from 'tsyringe';
import { connect } from './../../../this/react';
import React from 'react';
import { SearchPanel } from './../../../this/workbench/sidebar/search';
import { SearchEvent } from './../../../this/model/workbench/search';
import { ActivityBarService, BuiltinService, SearchService, SidebarService, } from './../../../this/services';
let SearchController = class SearchController extends Controller {
    constructor() {
        super();
        this.validateValue = (value, callback) => {
            const { isRegex } = this.searchService.getState();
            if (isRegex) {
                try {
                    new RegExp(value);
                    return callback();
                }
                catch (e) {
                    if (e instanceof Error) {
                        return callback(e);
                    }
                }
            }
            return callback();
        };
        this.getSearchIndex = (text, queryVal = '') => {
            let searchIndex = -1;
            const { isCaseSensitive, isWholeWords, isRegex } = this.searchService.getState();
            const onlyCaseSensitiveMatch = isCaseSensitive;
            const onlyWholeWordsMatch = isWholeWords;
            const useAllCondtionsMatch = isCaseSensitive && isWholeWords;
            const notUseConditionsMatch = !isCaseSensitive && !isWholeWords;
            try {
                if (isRegex) {
                    if (onlyCaseSensitiveMatch) {
                        searchIndex = text.search(new RegExp(queryVal));
                    }
                    if (onlyWholeWordsMatch) {
                        searchIndex = text.search(new RegExp('\\b' + queryVal + '\\b', 'i'));
                    }
                    if (useAllCondtionsMatch) {
                        searchIndex = text.search(new RegExp('\\b' + queryVal + '\\b'));
                    }
                    if (notUseConditionsMatch) {
                        searchIndex = text
                            .toLowerCase()
                            .search(new RegExp(queryVal, 'i'));
                    }
                }
                else {
                    if (onlyCaseSensitiveMatch) {
                        searchIndex = text.indexOf(queryVal);
                    }
                    // TODO：应使用字符串方法做搜索匹配，暂时使用正则匹配
                    if (onlyWholeWordsMatch) {
                        const reg = new RegExp('\\b' + (queryVal === null || queryVal === void 0 ? void 0 : queryVal.toLowerCase()) + '\\b');
                        searchIndex = text.toLowerCase().search(reg);
                    }
                    if (useAllCondtionsMatch) {
                        searchIndex = text.search(new RegExp('\\b' + queryVal + '\\b'));
                    }
                    if (notUseConditionsMatch) {
                        searchIndex = text
                            .toLowerCase()
                            .indexOf(queryVal === null || queryVal === void 0 ? void 0 : queryVal.toLowerCase());
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
            return searchIndex;
        };
        this.setValidateInfo = (info) => {
            this.searchService.setValidateInfo(info);
        };
        this.setSearchValue = (value) => {
            this.searchService.setSearchValue(value);
        };
        this.setReplaceValue = (value) => {
            this.searchService.setReplaceValue(value);
        };
        this.toggleAddon = (addon) => {
            const addonId = addon === null || addon === void 0 ? void 0 : addon.id;
            const { SEARCH_CASE_SENSITIVE_COMMAND_ID, SEARCH_WHOLE_WORD_COMMAND_ID, SEARCH_REGULAR_EXPRESSION_COMMAND_ID, SEARCH_PRESERVE_CASE_COMMAND_ID, SEARCH_REPLACE_ALL_COMMAND_ID, } = this.builtinService.getConstants();
            switch (addonId) {
                case SEARCH_CASE_SENSITIVE_COMMAND_ID: {
                    this.searchService.toggleCaseSensitive();
                    break;
                }
                case SEARCH_WHOLE_WORD_COMMAND_ID: {
                    this.searchService.toggleWholeWord();
                    break;
                }
                case SEARCH_REGULAR_EXPRESSION_COMMAND_ID: {
                    this.searchService.toggleRegex();
                    break;
                }
                case SEARCH_PRESERVE_CASE_COMMAND_ID: {
                    this.searchService.togglePreserveCase();
                    break;
                }
                case SEARCH_REPLACE_ALL_COMMAND_ID: {
                    this.emit(SearchEvent.onReplaceAll);
                    break;
                }
                default:
                    console.log('no addon');
            }
        };
        this.toggleMode = (status) => {
            this.searchService.toggleMode(status);
        };
        this.onChange = (value = '', replaceValue = '') => {
            this.emit(SearchEvent.onChange, value, replaceValue);
        };
        this.onSearch = (value = '', replaceValue = '') => {
            const { isRegex, isCaseSensitive, isWholeWords, preserveCase } = this.searchService.getState();
            this.emit(SearchEvent.onSearch, value, replaceValue, {
                isRegex,
                isCaseSensitive,
                isWholeWords,
                preserveCase,
            });
        };
        this.onResultClick = (item, resultData) => {
            this.emit(SearchEvent.onResultClick, item, resultData);
        };
        this.activityBarService = container.resolve(ActivityBarService);
        this.sidebarService = container.resolve(SidebarService);
        this.searchService = container.resolve(SearchService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { builtInSearchActivityItem, builtInHeaderToolbar, builtInSearchAddons, builtInReplaceAddons, } = this.builtinService.getModules();
        if (builtInSearchActivityItem) {
            const SearchPanelView = connect(this.searchService, SearchPanel, this);
            const searchSidePane = {
                id: builtInSearchActivityItem.id,
                title: 'SEARCH',
                render() {
                    return React.createElement(SearchPanelView, null);
                },
            };
            this.searchService.setState({
                headerToolBar: builtInHeaderToolbar || [],
                searchAddons: builtInSearchAddons || [],
                replaceAddons: builtInReplaceAddons || [],
            });
            this.sidebarService.add(searchSidePane);
            this.activityBarService.add(builtInSearchActivityItem);
        }
    }
};
SearchController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], SearchController);
export { SearchController };
