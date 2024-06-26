import React from 'react';
import { PureComponent, ComponentProps } from 'react';
import { ISelectOptionProps } from './option';
export interface ISelectProps extends Omit<ComponentProps<'div'>, 'onSelect'> {
    value?: string;
    style?: React.CSSProperties;
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    children?: React.ReactNode;
    onSelect?(e: React.MouseEvent, selectedOption?: ISelectOptionProps): void;
}
declare type IState = {
    isOpen: boolean;
    option: ISelectOptionProps;
};
export declare const selectClassName: string;
export declare const inputClassName: string;
export declare class Select extends PureComponent<ISelectProps, IState> {
    private contextView;
    state: IState;
    private selectElm;
    private selectInput;
    constructor(props: any);
    static getDerivedStateFromProps(props: any, state: any): {
        option: ISelectOptionProps;
    } | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private static getSelectOption;
    private getDefaultState;
    handleOnClickOption: (e: React.MouseEvent) => void;
    handleOnHoverOption: (e: React.MouseEvent) => void;
    handleOnClickSelect: (e: React.MouseEvent) => void;
    render(): React.JSX.Element;
}
export {};
