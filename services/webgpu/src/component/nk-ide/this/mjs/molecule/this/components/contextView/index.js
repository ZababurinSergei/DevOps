import React, { useEffect, useState } from 'react';
import { render as renderUtils, unmout } from './../../../this/react/render';
import { classNames } from './../../../this/common/className';
import { getRelativePosition, select, } from './../../../this/common/dom';
import { EventEmitter } from './../../../this/common/event';
import { Utils } from '@dtinsight/dt-utils';
import { contextViewClass, contentClassName, blockClassName, shadowClassName, } from './base';
var ContextViewEvent;
(function (ContextViewEvent) {
    ContextViewEvent["onHide"] = "onHide";
})(ContextViewEvent || (ContextViewEvent = {}));
const Emitter = new EventEmitter();
/**
 * It's a hook used in functional component
 */
export function useContextViewEle(props) {
    const [contextView, setContextView] = useState();
    useEffect(() => {
        // The useContextView can't be called at initial of useState
        // Because this function has rendered an element
        setContextView(useContextView(props));
    }, []);
    return contextView;
}
/**
 * TODO: It's not a hook, don't begin with use
 */
export function useContextView(props = {}) {
    const { shadowOutline = true } = props;
    const claName = classNames(contextViewClass, 'fade-in');
    let contextView = select(`.${contextViewClass}`); // Singleton contextView dom
    const show = (anchorPos, render) => {
        const content = select('.' + contentClassName);
        const renderContent = render || (props === null || props === void 0 ? void 0 : props.render);
        if (!renderContent)
            throw new Error('ContextView show Error: the render parameter is required!');
        renderUtils(React.createElement("div", { ref: () => {
                // Notice: if want to get the computed offsetHeight of contextView,
                // must display contextView ahead.
                if (contextView) {
                    const position = getRelativePosition(contextView, anchorPos);
                    contextView.style.cssText = `
                    visibility: visible;
                    top: ${position.y}px;
                    left: ${position.x}px;
                `;
                }
            } }, renderContent()), content);
    };
    const hide = () => {
        if (contextView) {
            const contentContainer = select(`.${contentClassName}`);
            if (contentContainer) {
                unmout(contentContainer);
            }
            contextView.style.visibility = 'hidden';
            Emitter.emit(ContextViewEvent.onHide);
        }
    };
    const onHide = (callback) => {
        Emitter.subscribe(ContextViewEvent.onHide, callback);
    };
    const onMaskClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        hide();
    };
    const dispose = () => {
        Emitter.unsubscribe(ContextViewEvent.onHide);
        hide();
    };
    if (!contextView) {
        contextView = document.createElement('div');
        contextView.className = classNames(claName, Utils.isMacOs() ? 'mac' : '');
        contextView.style.visibility = 'hidden';
        const root = document.getElementById('molecule');
        if (!root) {
            document.body.appendChild(contextView);
        }
        else {
            root.appendChild(contextView);
        }
        const shadowClass = shadowOutline === false ? '' : shadowClassName;
        renderUtils(React.createElement(React.Fragment, null,
            React.createElement("div", { className: blockClassName, onClick: onMaskClick, onContextMenu: onMaskClick }),
            React.createElement("div", { className: classNames(contentClassName, shadowClass) })), contextView);
    }
    return { view: contextView, show, hide, onHide, dispose };
}
