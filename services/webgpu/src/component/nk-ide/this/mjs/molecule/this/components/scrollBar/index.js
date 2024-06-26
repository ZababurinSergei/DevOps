import { classNames } from './../../../this/common/className';
import React, { useState, useEffect, useRef, useCallback, useMemo, useImperativeHandle, forwardRef, } from 'react';
import { scrollBarClassName, scrollBarContainerClassName, scrollBarContainerHorizontalClassName, scrollBarContainerVerticalClassName, scrollBarShadowClassName, scrollBarShadowHiddenClassName, scrollBarThumbClassName, scrollBarTrackClassName, scrollBarTrackHiddenClassName, scrollBarTrackHorizontalClassName, scrollBarTrackVerticalClassName, } from './base';
export var DirectionKind;
(function (DirectionKind) {
    DirectionKind["vertical"] = "vertical";
    DirectionKind["horizontal"] = "horizontal";
})(DirectionKind || (DirectionKind = {}));
function isVertical(direction) {
    return direction === DirectionKind.vertical;
}
function getSizeLiteral(direction, concatStr) {
    const sizeLiteral = !isVertical(direction) ? 'width' : 'height';
    if (!concatStr)
        return sizeLiteral;
    const upperCase = `${sizeLiteral
        .substring(0, 1)
        .toUpperCase()}${sizeLiteral.substring(1)}`;
    return `${concatStr}${upperCase}`;
}
function getOffsetLiteral(direction, concatStr) {
    const offsetLiteral = isVertical(direction) ? 'top' : 'left';
    if (!concatStr)
        return offsetLiteral;
    const upperCase = `${offsetLiteral
        .substring(0, 1)
        .toUpperCase()}${offsetLiteral.substring(1)}`;
    return `${concatStr}${upperCase}`;
}
export const ScrollBar = forwardRef(function ({ children, style, trackStyle, className, isShowShadow = false, inactiveHidden = true, direction = DirectionKind.vertical, onScroll, onScrollStart, onScrollEnd, }, ref) {
    const [viewRate, setViewRate] = useState(0.1);
    const [isOffsetZero, setOffsetZero] = useState(true);
    const [isDragging, setDragging] = useState(false);
    const [isMouseOver, setMouseOver] = useState(false);
    const wrapper = useRef(null);
    const content = useRef(null);
    const track = useRef(null);
    const thumb = useRef(null);
    const dragPosition = useRef({
        y: 0,
        startOffset: 0,
    });
    /**
     * Get the scrollHeight or scrollWidth of content area
     */
    const getContentScrollSize = () => {
        var _a;
        return ((_a = content.current) === null || _a === void 0 ? void 0 : _a[getSizeLiteral(direction, 'scroll')]) || 0;
    };
    /**
     * Get the clientHeight or clientWidth of wrapper area
     */
    const getWrapperClientSize = () => {
        var _a;
        return ((_a = wrapper.current) === null || _a === void 0 ? void 0 : _a[getSizeLiteral(direction, 'client')]) || 0;
    };
    /**
     * Get the scrollTop or scrollLeft of wrapper area
     */
    const getWrapperScrollOffset = () => {
        var _a;
        return ((_a = wrapper.current) === null || _a === void 0 ? void 0 : _a[getOffsetLiteral(direction, 'scroll')]) || 0;
    };
    /**
     * Get the height or width of track
     */
    const getTrackSize = () => {
        var _a;
        return (((_a = track.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()[getSizeLiteral(direction)]) ||
            0);
    };
    /**
     * Get the height or width of thumb
     */
    const getThumbSize = () => {
        var _a;
        return (((_a = thumb.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()[getSizeLiteral(direction)]) ||
            0);
    };
    /**
     * Get the top or left of thumb
     */
    const getThumbOffset = () => {
        var _a;
        return ((_a = thumb.current) === null || _a === void 0 ? void 0 : _a[getOffsetLiteral(direction, 'offset')]) || 0;
    };
    useImperativeHandle(ref, () => {
        var _a;
        return ({
            scrollTo: (offset) => {
                if (!isSupportScroll())
                    return;
                if (typeof offset === 'number') {
                    const thumbOffset = (offset / getContentScrollSize()) * getTrackSize();
                    contentScrollTo(offset);
                    thumbScrollTo(thumbOffset);
                }
            },
            scrollHeight: ((_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.scrollHeight) || 0,
        });
    });
    // listen to the wrapper's size changed
    useEffect(() => {
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const cr = entry.contentRect;
                const wrapperSize = cr[getSizeLiteral(direction)];
                const contentSize = getContentScrollSize();
                let rate = wrapperSize / contentSize;
                // prevent contentHeight to be 0
                if (Number.isNaN(rate))
                    rate = 1;
                const scrollOffset = getWrapperScrollOffset();
                const thumbOffset = (scrollOffset / contentSize) * getTrackSize();
                contentScrollTo(scrollOffset);
                thumbScrollTo(thumbOffset);
                setViewRate(rate > 1 ? 1 : rate);
            }
        });
        ro.observe(wrapper.current);
        return () => {
            ro.disconnect();
        };
    }, []);
    useEffect(() => {
        const ro = new ResizeObserver((entries) => {
            for (const _ of entries) {
                const contentSize = getContentScrollSize();
                const wrapperSize = getWrapperClientSize();
                const rate = wrapperSize / contentSize;
                setViewRate(rate > 1 ? 1 : rate);
            }
        });
        ro.observe(content.current);
        return () => {
            ro.disconnect();
        };
    }, []);
    useEffect(() => {
        var _a;
        let timeout = 0;
        function handleWheelListener(e) {
            if (!isSupportScroll())
                return;
            e.preventDefault();
            const scrollOffset = getWrapperScrollOffset();
            if (!timeout) {
                onScrollStart === null || onScrollStart === void 0 ? void 0 : onScrollStart({ scrollTop: scrollOffset }, e);
                setDragging(true);
            }
            else {
                window.clearTimeout(timeout);
            }
            timeout = window.setTimeout(() => {
                onScrollEnd === null || onScrollEnd === void 0 ? void 0 : onScrollEnd({ scrollTop: scrollOffset }, e);
                timeout = 0;
                setDragging(false);
            }, 150);
            const factor = e[isVertical(direction) ? 'deltaY' : 'deltaX'] / 10;
            const threshold = 5 * factor;
            const thumbOffset = (scrollOffset /
                this[isVertical(direction) ? 'scrollHeight' : 'scrollWidth']) *
                getTrackSize();
            thumbScrollTo(thumbOffset);
            contentScrollTo(scrollOffset + threshold);
            onScroll === null || onScroll === void 0 ? void 0 : onScroll({ scrollTop: scrollOffset }, e);
        }
        (_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.addEventListener('wheel', handleWheelListener);
        return () => {
            var _a;
            (_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('wheel', handleWheelListener);
        };
    }, []);
    const isSupportScroll = () => {
        return getContentScrollSize() > getWrapperClientSize();
    };
    const thumbScrollTo = (offset) => {
        const trackSize = getTrackSize();
        const thumbSize = getThumbSize();
        requestAnimationFrame(() => {
            const offsetLiteral = getOffsetLiteral(direction);
            if (offset <= 0) {
                thumb.current.style[offsetLiteral] = '0px';
            }
            else if (offset >= trackSize - thumbSize) {
                thumb.current.style[offsetLiteral] = `${trackSize - thumbSize}px`;
            }
            else {
                thumb.current.style[offsetLiteral] = `${offset}px`;
            }
        });
    };
    const contentScrollTo = (offset) => {
        requestAnimationFrame(() => {
            var _a, _b, _c;
            const offsetLiteral = getOffsetLiteral(direction);
            if (offset <= 0) {
                (_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ [offsetLiteral]: 0 });
                setOffsetZero(true);
            }
            else if (offset >= getContentScrollSize() - getTrackSize()) {
                (_b = wrapper.current) === null || _b === void 0 ? void 0 : _b.scrollTo({
                    [offsetLiteral]: getContentScrollSize(),
                });
                setOffsetZero(false);
            }
            else {
                (_c = wrapper.current) === null || _c === void 0 ? void 0 : _c.scrollTo({ [offsetLiteral]: offset });
                setOffsetZero(false);
            }
        });
    };
    const handleTrackClick = (e) => {
        e.stopPropagation();
        if (!isSupportScroll())
            return;
        const { y, height, x, width } = e.target.getBoundingClientRect();
        const thumbSize = getThumbSize();
        const halfThumbSize = thumbSize / 2;
        const contentSize = getContentScrollSize();
        const thumbOffset = e[isVertical(direction) ? 'clientY' : 'clientX'] -
            (isVertical(direction) ? y : x);
        const thumbCenterOffset = thumbOffset - halfThumbSize;
        const rate = thumbCenterOffset / (isVertical(direction) ? height : width);
        onScrollStart === null || onScrollStart === void 0 ? void 0 : onScrollStart({
            scrollTop: getWrapperScrollOffset(),
        }, e);
        contentScrollTo(contentSize * rate);
        thumbScrollTo(thumbCenterOffset);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll({
            scrollTop: getWrapperScrollOffset(),
        }, e);
        onScrollEnd === null || onScrollEnd === void 0 ? void 0 : onScrollEnd({
            scrollTop: getWrapperScrollOffset(),
        }, e);
    };
    const handleMouseDrag = useCallback((e) => {
        const clientOffset = e[isVertical(direction) ? 'clientY' : 'clientX'];
        const distanceChanged = clientOffset - dragPosition.current.y;
        const currentThumbOffset = dragPosition.current.startOffset;
        const trackSize = getTrackSize();
        const nextThumbOffset = currentThumbOffset + distanceChanged;
        const rate = nextThumbOffset / trackSize;
        const contentHeight = getContentScrollSize();
        contentScrollTo(contentHeight * rate);
        thumbScrollTo(nextThumbOffset);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll({
            scrollTop: getWrapperScrollOffset(),
        }, e);
    }, []);
    const handleMouseDown = (e) => {
        if (!isSupportScroll())
            return;
        setDragging(true);
        onScrollStart === null || onScrollStart === void 0 ? void 0 : onScrollStart({
            scrollTop: getWrapperScrollOffset(),
        }, e);
        dragPosition.current = {
            y: e[isVertical(direction) ? 'clientY' : 'clientX'],
            startOffset: getThumbOffset(),
        };
        document.body.style.userSelect = 'none';
        window.addEventListener('mouseup', (e) => {
            e.stopPropagation();
            e.preventDefault();
            setDragging(false);
            onScrollEnd === null || onScrollEnd === void 0 ? void 0 : onScrollEnd({
                scrollTop: getWrapperScrollOffset(),
            }, e);
            document.body.style.removeProperty('user-select');
            window.removeEventListener('mousemove', handleMouseDrag);
        }, { once: true });
        window.addEventListener('mousemove', handleMouseDrag, {
            passive: false,
        });
    };
    const isHidden = useMemo(() => {
        const contentSize = getContentScrollSize();
        const wrapperSize = getWrapperClientSize();
        // if content's height less than wrapper's height
        // it's no need to scroll
        if (contentSize <= wrapperSize)
            return true;
        return !isDragging && !isMouseOver;
    }, [isDragging, isMouseOver]);
    return (React.createElement("div", { className: classNames(scrollBarClassName, className), ref: wrapper, style: style, onMouseEnter: () => setMouseOver(true), onMouseLeave: () => setMouseOver(false) },
        isShowShadow && (React.createElement("div", { className: classNames(scrollBarShadowClassName, isOffsetZero && scrollBarShadowHiddenClassName) })),
        React.createElement("div", { className: classNames(scrollBarContainerClassName, isVertical(direction)
                ? scrollBarContainerVerticalClassName
                : scrollBarContainerHorizontalClassName), ref: content }, children),
        React.createElement("div", { className: classNames(scrollBarTrackClassName, isVertical(direction)
                ? scrollBarTrackVerticalClassName
                : scrollBarTrackHorizontalClassName, inactiveHidden && isHidden && scrollBarTrackHiddenClassName), ref: track, onClick: handleTrackClick, style: trackStyle },
            React.createElement("div", { className: scrollBarThumbClassName, style: {
                    [getSizeLiteral(direction)]: `calc(100% * ${viewRate})`,
                }, ref: thumb, onClick: (e) => e.stopPropagation(), onMouseDown: handleMouseDown }))));
});
