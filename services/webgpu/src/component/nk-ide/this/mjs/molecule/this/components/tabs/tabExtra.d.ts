import React from 'react';
interface ITabExtraProps {
    classNames?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    renderStatus?: (hover: boolean) => JSX.Element;
}
declare const _default: ({ onClick, classNames, renderStatus }: ITabExtraProps) => React.JSX.Element;
export default _default;
