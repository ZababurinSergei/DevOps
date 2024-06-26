import React from 'react';
import { ComponentProps } from 'react';
export interface ISelectOptionProps extends ComponentProps<'div'> {
    value?: string;
    name?: string;
    description?: string;
    disabled?: boolean;
}
export declare function Option(props: ISelectOptionProps): React.JSX.Element;
