import React from 'react';
import '@vscode/codicons/dist/codicon.css';
import { ComponentProps } from 'react';
export interface IIconProps extends ComponentProps<'span'> {
    type?: string | JSX.Element;
    onClick?: (e: React.MouseEvent) => void;
}
export declare function Icon(props: React.PropsWithChildren<IIconProps>): React.JSX.Element | null;
