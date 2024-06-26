import 'reflect-metadata';
import { Controller } from './../../../this/react/controller';
import { IActionBarItemProps } from './../../../this/components/actionBar';
import { ISearchProps, ITreeNodeItemProps } from './../../../this/components';
export interface ISearchController extends Partial<Controller> {
    getSearchIndex?: (text: string, queryVal?: string) => number;
    setSearchValue?: (value?: string) => void;
    setReplaceValue?: (value?: string) => void;
    setValidateInfo?: (info: string | ISearchProps['validationInfo']) => void;
    toggleMode?: (status: boolean) => void;
    toggleAddon?: (addon?: IActionBarItemProps) => void;
    validateValue?: (value: string, callback: (err: void | Error) => void) => void;
    onResultClick?: (item: ITreeNodeItemProps, resultData: ITreeNodeItemProps[]) => void;
    onChange?: (value: string, replaceValue: string) => void;
    onSearch?: (value: string, replaceValue: string) => void;
}
export declare class SearchController extends Controller implements ISearchController {
    private readonly activityBarService;
    private readonly sidebarService;
    private readonly searchService;
    private readonly builtinService;
    constructor();
    initView(): void;
    validateValue: (value: string, callback: (err: void | Error) => void) => void;
    getSearchIndex: (text: string, queryVal?: string) => number;
    readonly setValidateInfo: (info: string | ISearchProps['validationInfo']) => void;
    readonly setSearchValue: (value?: string | undefined) => void;
    readonly setReplaceValue: (value?: string | undefined) => void;
    toggleAddon: (addon?: IActionBarItemProps<any> | undefined) => void;
    readonly toggleMode: (status: boolean) => void;
    onChange: (value?: string, replaceValue?: string) => void;
    onSearch: (value?: string, replaceValue?: string) => void;
    onResultClick: (item: ITreeNodeItemProps, resultData: ITreeNodeItemProps[]) => void;
}
