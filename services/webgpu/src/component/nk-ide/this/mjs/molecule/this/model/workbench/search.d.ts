import { ITreeNodeItemProps } from './../../../this/components';
import { IActionBarItemProps } from './../../../this/components/actionBar';
import { InfoTypeEnum } from './../../../this/components/search/input';
export declare enum SearchEvent {
    onChange = "search.onChange",
    onSearch = "search.onSearch",
    onReplaceAll = "search.onReplaceAll",
    onResultClick = "search.onResultClick"
}
export interface ISearchProps {
    headerToolBar?: IActionBarItemProps[];
    searchAddons?: IActionBarItemProps[];
    replaceAddons?: IActionBarItemProps[];
    result: ITreeNodeItemProps[];
    value?: string;
    replaceValue?: string;
    replaceMode?: boolean;
    validationInfo?: {
        type: InfoTypeEnum;
        text: string;
    };
    isRegex?: boolean;
    isCaseSensitive?: boolean;
    isWholeWords?: boolean;
    preserveCase?: boolean;
}
export declare class SearchModel implements ISearchProps {
    headerToolBar: IActionBarItemProps[];
    searchAddons: IActionBarItemProps[];
    replaceAddons: IActionBarItemProps[];
    result: ITreeNodeItemProps[];
    value: string;
    replaceValue: string;
    replaceMode: boolean;
    isRegex: boolean;
    isCaseSensitive: boolean;
    isWholeWords: boolean;
    preserveCase: boolean;
    validationInfo: {
        type: InfoTypeEnum;
        text: string;
    };
    constructor(headerToolBar?: IActionBarItemProps[], searchAddons?: IActionBarItemProps[], replaceAddons?: IActionBarItemProps[], result?: never[], value?: string, replaceValue?: string, replaceMode?: boolean, isCaseSensitive?: boolean, isWholeWords?: boolean, isRegex?: boolean, preserveCase?: boolean, validationInfo?: {
        type: InfoTypeEnum;
        text: string;
    });
}
