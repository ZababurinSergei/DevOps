import React from 'react';
import { IConfigProps } from './create';
export default function Provider({ defaultLocale, extensions, children, }: IConfigProps & {
    children: React.ReactElement;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
