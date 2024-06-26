import React, { CSSProperties } from 'react';
interface ISashProps {
    className?: string;
    style: CSSProperties;
    onDragStart: React.MouseEventHandler<HTMLDivElement>;
    onDragging: React.MouseEventHandler<HTMLDivElement>;
    onDragEnd: React.MouseEventHandler<HTMLDivElement>;
}
export default function Sash({ className, onDragStart, onDragging, onDragEnd, ...restProps }: ISashProps): React.JSX.Element;
export {};
