import React from 'react';
import { ISearchProps } from './../../../../this/model/workbench/search';
import { ISearchController } from './../../../../this/controller';
export interface ISearchPaneToolBar extends ISearchController, ISearchProps {
}
declare const SearchPanel: ({ value, replaceValue, searchAddons, replaceAddons, validationInfo, headerToolBar, result, toggleAddon, onResultClick, validateValue, setValidateInfo, onSearch, getSearchIndex, setSearchValue, setReplaceValue, onChange, toggleMode, }: ISearchPaneToolBar) => React.JSX.Element;
export default SearchPanel;
