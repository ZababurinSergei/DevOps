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
import React, { useEffect } from 'react';
import Dialog from 'rc-dialog';
import { classNames } from './../../../this/common/className';
import { modalClassName, closeDialogDescriptorClassName, wrapDialogClassName, } from './base';
import { Icon } from './../../../this/components/icon';
import { Button } from './../../../this/components/button';
export const destroyFns = [];
let mousePosition;
const getClickPosition = (e) => {
    mousePosition = {
        x: e.pageX,
        y: e.pageY,
    };
    setTimeout(() => {
        mousePosition = null;
    }, 100);
};
const closeIconToRender = (React.createElement("span", { className: closeDialogDescriptorClassName },
    React.createElement(Icon, { type: "close" })));
export const Modal = (props) => {
    useEffect(() => {
        document.documentElement.addEventListener('click', getClickPosition, true);
        return () => {
            document.documentElement.removeEventListener('click', getClickPosition, true);
        };
    }, []);
    const handleCancel = (e) => {
        const { onCancel } = props;
        onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
    };
    const handleOk = (e) => {
        const { onOk } = props;
        onOk === null || onOk === void 0 ? void 0 : onOk(e);
    };
    const { footer, visible, wrapClassName, centered, getContainer, closeIcon, cancelText = 'Cancel', okText = 'Ok' } = props, restProps = __rest(props, ["footer", "visible", "wrapClassName", "centered", "getContainer", "closeIcon", "cancelText", "okText"]);
    const wrapClassNameExtended = classNames(wrapClassName, {
        [wrapDialogClassName]: !!centered,
    });
    const renderFooter = () => {
        const { footer, cancelButtonProps, okButtonProps } = props;
        if (footer !== undefined)
            return footer;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, Object.assign({ onClick: handleCancel }, cancelButtonProps), cancelText),
            React.createElement(Button, Object.assign({ onClick: handleOk }, okButtonProps), okText)));
    };
    return (React.createElement(Dialog, Object.assign({}, restProps, { getContainer: getContainer, prefixCls: modalClassName, wrapClassName: wrapClassNameExtended, footer: renderFooter(), visible: visible, mousePosition: mousePosition, onClose: handleCancel, closeIcon: closeIconToRender })));
};
