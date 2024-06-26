import React from 'react';
export interface IDisplayProps extends React.ComponentProps<'div'> {
    visible?: boolean;
}
declare const Display: (props: IDisplayProps) => React.JSX.Element;
export default Display;
