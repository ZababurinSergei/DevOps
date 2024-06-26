import React from 'react';
import { Toolbar } from './../../../../this/components/toolbar';
import { classNames, prefixClaName } from './../../../../this/common/className';
import { Header, Content } from './../../../../this/workbench/sidebar';
import { Search } from './../../../../this/components/search';
import SearchTree from './searchTree';
import { localize } from './../../../../this/i18n/localize';
import { deleteSearchValueClassName, emptyTextValueClassName, matchSearchValueClassName, replaceSearchValueClassName, } from './base';
const SearchPanel = ({ value = '', replaceValue, searchAddons, replaceAddons, validationInfo, headerToolBar, result, toggleAddon, onResultClick, validateValue, setValidateInfo, onSearch, getSearchIndex, setSearchValue, setReplaceValue, onChange, toggleMode, }) => {
    const onClick = (e, item) => {
        console.log('onClick:', e, item);
    };
    const handleSearchChange = (values = []) => {
        const [searchVal, replaceVal] = values;
        setSearchValue === null || setSearchValue === void 0 ? void 0 : setSearchValue(searchVal);
        setReplaceValue === null || setReplaceValue === void 0 ? void 0 : setReplaceValue(replaceVal);
        onChange === null || onChange === void 0 ? void 0 : onChange(searchVal || '', replaceVal || '');
    };
    const handleToggleButton = (status) => {
        toggleMode === null || toggleMode === void 0 ? void 0 : toggleMode(status);
    };
    const renderTitle = (node, _, isLeaf) => {
        const { name = '' } = node;
        if (!isLeaf) {
            return name;
        }
        const searchIndex = getSearchIndex ? getSearchIndex(name, value) : -1;
        const beforeStr = name.substr(0, searchIndex);
        const currentValue = name.substr(searchIndex, value.length);
        const afterStr = name.substr(searchIndex + value.length);
        const title = searchIndex > -1 ? (React.createElement("span", null,
            beforeStr,
            React.createElement("span", { className: classNames(matchSearchValueClassName, replaceValue && deleteSearchValueClassName) }, currentValue),
            replaceValue && (React.createElement("span", { className: replaceSearchValueClassName }, replaceValue)),
            afterStr)) : (name);
        return title;
    };
    const handleSearch = (values = []) => {
        const [value, replaceVal] = values;
        validateValue === null || validateValue === void 0 ? void 0 : validateValue(value || '', (err) => {
            if (err) {
                setValidateInfo === null || setValidateInfo === void 0 ? void 0 : setValidateInfo({
                    type: 'error',
                    text: err.message,
                });
            }
            else {
                onSearch === null || onSearch === void 0 ? void 0 : onSearch(value || '', replaceVal || '');
            }
        });
    };
    const handleTreeSelect = (item) => {
        if (item.isLeaf) {
            onResultClick === null || onResultClick === void 0 ? void 0 : onResultClick(item, result);
        }
    };
    return (React.createElement("div", { className: prefixClaName('search-pane', 'sidebar') },
        React.createElement(Header, { title: localize('sidebar.search.title', 'Search'), toolbar: React.createElement(Toolbar, { data: headerToolBar || [], onClick: onClick }) }),
        React.createElement(Content, null,
            React.createElement(Search, { values: [value, replaceValue], addons: [searchAddons, replaceAddons], validationInfo: validationInfo, onChange: handleSearchChange, onSearch: handleSearch, onAddonClick: toggleAddon, onButtonClick: handleToggleButton }),
            value && result.length === 0 ? (React.createElement("div", { className: emptyTextValueClassName }, "\u672A\u627E\u5230\u7ED3\u679C\uFF0C\u8BF7\u91CD\u65B0\u4FEE\u6539\u60A8\u7684\u641C\u7D22\u6761\u4EF6")) : (React.createElement(SearchTree, { data: result, renderTitle: renderTitle, onSelect: handleTreeSelect })))));
};
export default SearchPanel;
