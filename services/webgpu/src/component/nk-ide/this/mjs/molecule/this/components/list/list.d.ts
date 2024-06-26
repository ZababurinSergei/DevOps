import React from 'react';
import { ComponentProps } from 'react';
import type { UniqueId } from './../../../this/common/types';
import { IItemProps } from './item';
export interface IListProps extends Omit<ComponentProps<'ul'>, 'onSelect'> {
    /**
     * Default is vertical mode
     */
    mode?: 'horizontal' | 'vertical';
    /**
     * Current active
     */
    current?: string;
    /**
     * It's used to disable specific item, the value of disable is id string
     */
    disable?: UniqueId;
    /**
     * Listen to the select event of List
     * @param event React mouse event
     * @param item Selected the List item object
     */
    onSelect?(event: React.MouseEvent, item?: IItemProps): void;
    /**
     * Listen to the click event of List
     * @param event React mouse event
     * @param item Clicked the List item object
     */
    onClick?(event: React.MouseEvent, item?: IItemProps): void;
}
export declare const defaultListClassName: string;
export declare const verticalClassName: string;
export declare const horizontalClassName: string;
export declare function List(props: React.PropsWithChildren<IListProps>): React.JSX.Element;
