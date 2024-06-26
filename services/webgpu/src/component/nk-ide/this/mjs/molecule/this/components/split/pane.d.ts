import React, { PropsWithChildren } from 'react';
import type { HTMLElementProps } from './../../../this/common/types';
interface IPaneProps extends HTMLElementProps {
}
export interface IPaneConfigs {
    maxSize?: number | string;
    minSize?: number | string;
}
export default function Pane({ children, style, className, role, title, }: PropsWithChildren<IPaneProps & IPaneConfigs>): React.JSX.Element;
export {};
