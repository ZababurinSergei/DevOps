import { Root } from 'react-dom/client';
export declare const renderedSign: unique symbol;
export declare const render: (node: JSX.Element, container: HTMLElement & {
    [renderedSign]?: Root;
}) => void;
export declare const unmout: (container: HTMLElement & {
    [renderedSign]?: Root;
}) => boolean;
