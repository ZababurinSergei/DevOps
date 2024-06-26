import 'reflect-metadata';
import React from 'react';
export interface ILocalizeProps {
    sourceKey: string;
    defaultValue?: string;
}
/**
 * Returns the international text located by source key，or the default value if it is not find
 * For examples:
 * ```ts
 * localize('id','default value'); // hello ${i}, ${i}
 * localize('id','default value', 'world'); // hello world, ${i}
 * localize('id','default value', 'world', 'molecule'); // hello world, molecule
 * ```
 * @param sourceKey The key value located in the source international text
 * @param defaultValue The default value to be used when not find the international text
 * @param args If provided, it will used as the values to be replaced in the international text
 * @returns
 */
export declare function localize(sourceKey: string, defaultValue: string, ...args: string[]): any;
/**
 * @Deprecated Localize by react component not work correct currently.
 */
export declare class Localize extends React.PureComponent<ILocalizeProps> {
    state: {
        localeId: string;
    };
    constructor(props: ILocalizeProps);
    componentDidMount(): void;
    private update;
    private get localeService();
    getValue: () => string;
    render(): string;
}
