import React from 'react';
import { IActionBarItemProps } from '../actionBar';
import { InfoTypeEnum } from './input';
export declare type SearchValues = (string | undefined)[];
export interface ISearchProps extends React.ComponentProps<any> {
    style?: React.CSSProperties;
    className?: string;
    values?: SearchValues;
    placeholders?: string[];
    addons?: (IActionBarItemProps[] | undefined)[];
    validationInfo?: string | {
        type: InfoTypeEnum;
        text: string;
    };
    onAddonClick?: (addon: any) => void;
    onButtonClick?: (status: boolean) => void;
    /**
     * onChange only oberseves the values of inputs
     *
     * first value is from query input
     *
     * second value is from replace input
     */
    onChange?: (value?: SearchValues) => void;
    /**
     * onSearch always be triggered behind onChange or onClick
     */
    onSearch?: (value?: SearchValues) => void;
}
export declare function Search(props: ISearchProps): React.JSX.Element;
