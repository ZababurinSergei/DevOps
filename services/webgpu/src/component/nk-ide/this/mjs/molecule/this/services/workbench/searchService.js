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
import { Component } from './../../../this/react/component';
import { SearchEvent, SearchModel, } from './../../../this/model/workbench/search';
import { searchById } from './../../../this/common/utils';
import { BuiltinService } from '../builtinService';
let SearchService = class SearchService extends Component {
    constructor() {
        super();
        this.state = container.resolve(SearchModel);
        this.builtinService = container.resolve(BuiltinService);
    }
    setValidateInfo(info) {
        this.setState({
            validationInfo: typeof info === 'string'
                ? {
                    type: 'info',
                    text: info,
                }
                : info,
        });
    }
    setSearchValue(value) {
        this.setState({
            value,
        });
    }
    setReplaceValue(value) {
        this.setState({
            replaceValue: value,
        });
    }
    setResult(value) {
        this.setState({
            result: value || [],
        });
    }
    toggleMode(status) {
        this.setState({
            replaceMode: status,
        });
    }
    toggleCaseSensitive() {
        const { isCaseSensitive } = this.state;
        const { SEARCH_CASE_SENSITIVE_COMMAND_ID } = this.builtinService.getConstants();
        if (SEARCH_CASE_SENSITIVE_COMMAND_ID) {
            this.setState({
                isCaseSensitive: !isCaseSensitive,
            });
            this.updateStatus(SEARCH_CASE_SENSITIVE_COMMAND_ID, !isCaseSensitive);
        }
    }
    toggleWholeWord() {
        const { isWholeWords } = this.state;
        const { SEARCH_WHOLE_WORD_COMMAND_ID } = this.builtinService.getConstants();
        if (SEARCH_WHOLE_WORD_COMMAND_ID) {
            this.setState({
                isWholeWords: !isWholeWords,
            });
            this.updateStatus(SEARCH_WHOLE_WORD_COMMAND_ID, !isWholeWords);
        }
    }
    toggleRegex() {
        const { isRegex } = this.state;
        const { SEARCH_REGULAR_EXPRESSION_COMMAND_ID } = this.builtinService.getConstants();
        if (SEARCH_REGULAR_EXPRESSION_COMMAND_ID) {
            this.setState({
                isRegex: !isRegex,
            });
            this.updateStatus(SEARCH_REGULAR_EXPRESSION_COMMAND_ID, !isRegex);
        }
    }
    togglePreserveCase() {
        const { preserveCase } = this.state;
        const { SEARCH_PRESERVE_CASE_COMMAND_ID } = this.builtinService.getConstants();
        if (SEARCH_PRESERVE_CASE_COMMAND_ID) {
            this.setState({
                preserveCase: !preserveCase,
            });
            this.updateStatus(SEARCH_PRESERVE_CASE_COMMAND_ID, !preserveCase);
        }
    }
    updateStatus(addonId, checked) {
        const { replaceAddons = [], searchAddons = [] } = this.state;
        const target = replaceAddons.find(searchById(addonId)) ||
            searchAddons.find(searchById(addonId));
        if (target) {
            target.checked = checked;
            this.setState({
                replaceAddons: replaceAddons.concat(),
                searchAddons: searchAddons.concat(),
            });
        }
    }
    reset() {
        this.setState({
            headerToolBar: [],
            searchAddons: [],
            replaceAddons: [],
            result: [],
            value: '',
            replaceValue: '',
            replaceMode: false,
            isRegex: false,
            isCaseSensitive: false,
            isWholeWords: false,
            preserveCase: false,
            validationInfo: { type: 'info', text: '' },
        });
    }
    onReplaceAll(callback) {
        this.subscribe(SearchEvent.onReplaceAll, callback);
    }
    onChange(callback) {
        this.subscribe(SearchEvent.onChange, callback);
    }
    onSearch(callback) {
        this.subscribe(SearchEvent.onSearch, callback);
    }
    onResultClick(callback) {
        this.subscribe(SearchEvent.onResultClick, callback);
    }
};
SearchService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], SearchService);
export { SearchService };
