import React from 'react';
import { HTMLElementType, IPosition } from './../../../this/common/dom';
export interface IContextViewProps {
    /**
     * Default true
     */
    shadowOutline?: boolean;
    render?: () => React.ReactNode;
}
export interface IContextView {
    view: HTMLElementType;
    show(anchorPos: IPosition, render?: () => React.ReactNode): void;
    hide(): void;
    onHide(callback?: Function): void;
    dispose(): void;
}
/**
 * It's a hook used in functional component
 */
export declare function useContextViewEle(props?: IContextViewProps): IContextView | undefined;
/**
 * TODO: It's not a hook, don't begin with use
 */
export declare function useContextView(props?: IContextViewProps): IContextView;
