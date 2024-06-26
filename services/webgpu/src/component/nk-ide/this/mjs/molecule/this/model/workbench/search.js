export var SearchEvent;
(function (SearchEvent) {
    SearchEvent["onChange"] = "search.onChange";
    SearchEvent["onSearch"] = "search.onSearch";
    SearchEvent["onReplaceAll"] = "search.onReplaceAll";
    SearchEvent["onResultClick"] = "search.onResultClick";
})(SearchEvent || (SearchEvent = {}));
export class SearchModel {
    constructor(headerToolBar = [], searchAddons = [], replaceAddons = [], result = [], value = '', replaceValue = '', replaceMode = false, isCaseSensitive = false, isWholeWords = false, isRegex = false, preserveCase = false, validationInfo = {
        type: 'info',
        text: '',
    }) {
        this.result = [];
        this.value = '';
        this.replaceValue = '';
        this.replaceMode = false;
        this.isRegex = false;
        this.isCaseSensitive = false;
        this.isWholeWords = false;
        this.preserveCase = false;
        this.validationInfo = {
            type: 'info',
            text: '',
        };
        this.headerToolBar = headerToolBar;
        this.searchAddons = searchAddons;
        this.replaceAddons = replaceAddons;
        this.value = value;
        this.replaceValue = replaceValue;
        this.replaceMode = replaceMode;
        this.isCaseSensitive = isCaseSensitive;
        this.isWholeWords = isWholeWords;
        this.isRegex = isRegex;
        this.preserveCase = preserveCase;
        this.result = result;
        this.validationInfo = validationInfo;
    }
}
