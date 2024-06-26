import React from 'react';
import { HTMLElementProps } from './../../../this/common/types';
export interface ISplitProps extends HTMLElementProps {
    children: JSX.Element[];
    /**
     * Should allowed to resized
     *
     * default is true
     */
    allowResize?: boolean | boolean[];
    /**
     * Should show the sashes
     *
     * default is true
     */
    showSashes?: boolean | boolean[];
    /**
     * How to split the space
     *
     * default is vertical
     */
    split?: 'vertical' | 'horizontal';
    /**
     * Only support controlled mode, so it's required
     */
    sizes: (string | number)[];
    onChange: (sizes: number[]) => void;
    className?: string;
    sashClassName?: string;
    paneClassName?: string;
    /**
     * Specify the size fo resizer
     *
     * defualt size is 4px
     */
    resizerSize?: number;
}
declare const SplitPane: ({ children, sizes: propSizes, allowResize: propAllowResize, showSashes, split, className, sashClassName, paneClassName, resizerSize, onChange, ...restProps }: ISplitProps) => React.JSX.Element;
export default SplitPane;
