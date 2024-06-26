var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useMemo, useCallback, useRef, useState, } from 'react';
import { cloneReactChildren } from './../../../this/react';
import { classNames } from './../../../this/common/className';
import Pane from './pane';
import Sash from './sash';
import { paneItemClassName, splitClassName, splitDraggingClassName, splitVerticalClassName, splitHorizontalClassName, sashDisabledClassName, sashHorizontalClassName, sashVerticalClassName, } from './base';
/**
 * Convert size to absolute number or Infinity
 */
const assertsSize = function (size, sum, defaultValue = Infinity) {
    if (typeof size === 'undefined')
        return defaultValue;
    if (typeof size === 'number')
        return size;
    if (size.endsWith('%'))
        return sum * (+size.replace('%', '') / 100);
    if (size.endsWith('px'))
        return +size.replace('px', '');
    return defaultValue;
};
const SplitPane = (_a) => {
    var _b;
    var { children, sizes: propSizes, allowResize: propAllowResize = true, showSashes = true, split = 'vertical', className, sashClassName, paneClassName, resizerSize = 4, onChange } = _a, restProps = __rest(_a, ["children", "sizes", "allowResize", "showSashes", "split", "className", "sashClassName", "paneClassName", "resizerSize", "onChange"]);
    const axis = useRef({ x: 0, y: 0 });
    const wrapper = useRef(null);
    const [wrapperRect, setWrapperRect] = useState({});
    const [draging, setDrag] = useState(false);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            setWrapperRect(wrapper.current.getBoundingClientRect());
        });
        resizeObserver.observe(wrapper.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    // Get some size infos via split
    const { sizeName, sPos, sAxis } = useMemo(function () {
        return {
            sizeName: split === 'vertical' ? 'width' : 'height',
            sPos: split === 'vertical' ? 'left' : 'top',
            sAxis: split === 'vertical' ? 'x' : 'y',
        };
    }, [split]);
    const wrapSize = (_b = wrapperRect[sizeName]) !== null && _b !== void 0 ? _b : 0;
    // Get limit sizes via children
    const paneLimitSizes = useMemo(function () {
        return children.map((childNode) => {
            const limits = [0, Infinity];
            if (childNode.type === Pane) {
                const { minSize, maxSize } = childNode.props;
                limits[0] = assertsSize(minSize, wrapSize, 0);
                limits[1] = assertsSize(maxSize, wrapSize);
            }
            return limits;
        });
    }, [children, wrapSize]);
    // perform the task for recalculating resizable
    const allowResize = useMemo(() => {
        if (typeof propAllowResize === 'boolean') {
            return new Array(children.length).fill(propAllowResize);
        }
        return children.map((_, index) => { var _a; return (_a = propAllowResize[index]) !== null && _a !== void 0 ? _a : true; });
    }, [children.length, propAllowResize]);
    /**
     * SplitPane allows sizes in string and number, but the state sizes only support number,
     * so convert string and number to number in here
     * ```ts
     * 'auto' -> divide the remaining space equally
     * 'xxxpx' -> xxx
     * 'xxx%' -> wrapper.size * xxx/100
     * xxx -> xxx
     * ```
     */
    const sizes = useMemo(function () {
        let count = 0;
        let curSum = 0;
        let allowResizeSum = 0;
        const res = children.map((_, index) => {
            const size = assertsSize(propSizes[index], wrapSize);
            if (size === Infinity) {
                count++;
            }
            else {
                curSum += size;
                if (allowResize[index])
                    allowResizeSum += size;
            }
            return size;
        });
        const allowResizePanes = allowResize.filter((item) => item === true).length;
        if (allowResizePanes === 0)
            return res;
        // resize or illegal size input,recalculate pane sizes
        if (curSum > wrapSize || (!count && curSum < wrapSize)) {
            const gap = (curSum - wrapSize) / allowResizeSum;
            return res.map((size, index) => {
                if (size === Infinity)
                    return 0;
                return allowResize[index] ? size - size * gap : size;
            });
        }
        if (count > 0) {
            const average = (wrapSize - curSum) / count;
            return res.map((size) => {
                return size === Infinity ? average : size;
            });
        }
        return res;
    }, [...propSizes, children.length, wrapSize, ...allowResize]);
    // Gets dragging axis position
    const sashPosSizes = useMemo(function () {
        return sizes.reduce(function (a, b) {
            return [...a, a[a.length - 1] + b];
        }, [0]);
    }, [...sizes]);
    const onDragStart = useCallback(function (e) {
        var _a, _b;
        axis.current = {
            x: (_a = e.pageX) !== null && _a !== void 0 ? _a : e.screenX,
            y: (_b = e.pageY) !== null && _b !== void 0 ? _b : e.screenY,
        };
        setDrag(true);
    }, []);
    const onDragging = useCallback(function (e, i) {
        var _a, _b;
        const curAxis = {
            x: (_a = e.pageX) !== null && _a !== void 0 ? _a : e.screenX,
            y: (_b = e.pageY) !== null && _b !== void 0 ? _b : e.screenY,
        };
        let distanceX = curAxis[sAxis] - axis.current[sAxis];
        const leftBorder = -Math.min(sizes[i] - paneLimitSizes[i][0], paneLimitSizes[i + 1][1] - sizes[i + 1]);
        const rightBorder = Math.min(sizes[i + 1] - paneLimitSizes[i + 1][0], paneLimitSizes[i][1] - sizes[i]);
        if (distanceX < leftBorder) {
            distanceX = leftBorder;
        }
        if (distanceX > rightBorder) {
            distanceX = rightBorder;
        }
        const nextSizes = [...sizes];
        nextSizes[i] += distanceX;
        nextSizes[i + 1] -= distanceX;
        onChange === null || onChange === void 0 ? void 0 : onChange(nextSizes);
    }, [paneLimitSizes, onChange, sizes]);
    return (React.createElement("div", Object.assign({ className: classNames(splitClassName, draging && splitDraggingClassName, split === 'vertical' && splitVerticalClassName, split === 'horizontal' && splitHorizontalClassName, className), ref: wrapper }, restProps), children.map((childNode, idx) => {
        const paneClasses = classNames(paneItemClassName, paneClassName);
        const paneStyle = {
            [sizeName]: sizes[idx],
            [sPos]: sashPosSizes[idx],
        };
        let sashChild = null;
        if (idx > 0) {
            const disabled = showSashes === false || (showSashes === null || showSashes === void 0 ? void 0 : showSashes[idx - 1]) === false;
            sashChild = (React.createElement(Sash, { className: classNames(disabled && sashDisabledClassName, split === 'vertical'
                    ? sashVerticalClassName
                    : sashHorizontalClassName, sashClassName), style: {
                    [sizeName]: resizerSize,
                    [sPos]: sashPosSizes[idx] - resizerSize / 2,
                }, onDragStart: onDragStart, onDragging: (e) => onDragging(e, idx - 1), onDragEnd: () => {
                    setDrag(false);
                } }));
        }
        if (childNode.type === Pane) {
            const { className = '', style = {} } = childNode.props;
            return (React.createElement(React.Fragment, { key: idx },
                sashChild,
                cloneReactChildren(childNode, {
                    className: classNames(paneClasses, className),
                    style: Object.assign(Object.assign({}, style), paneStyle),
                })));
        }
        return (React.createElement(React.Fragment, { key: idx },
            sashChild,
            React.createElement(Pane, { className: paneClasses, style: paneStyle }, childNode)));
    })));
};
export default SplitPane;
