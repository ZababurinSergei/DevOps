import React from 'react';
import type { UniqueId } from './../../../this/common/types';
export interface IItemProps extends Omit<React.ComponentProps<'li'>, 'id'> {
    id: UniqueId;
    disabled?: boolean;
    disable?: UniqueId;
    active?: UniqueId;
    onClick?(event: React.MouseEvent, item?: IItemProps): void;
}
export declare function Item(props: React.PropsWithChildren<IItemProps>): React.JSX.Element;
