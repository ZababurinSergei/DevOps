import React from 'react';
import { classNames } from './../../../this/common/className';
import { confirmClassName, containerConfirmClassName, indicatorConfirmClassName, contentConfirmClassName, messageConfirmClassName, btnsConfirmClassName, textConfirmClassName, centeredConfirmClassName, detailConfirmClassName, iconConfirmClassName, } from './base';
import { Modal as Dialog } from './modal';
import ActionButton from './actionButton';
const ConfirmDialog = (props) => {
    const { actions, icon, onCancel, onOk, close, maskStyle, okText = 'Ok', okButtonProps, cancelText = 'Cancel', cancelButtonProps, okCancel, bodyStyle, closable = false, className, width = 520, style = {}, mask = true, maskClosable = false, transitionName = 'zoom', maskTransitionName = 'fade', type, visible, } = props;
    const confirmDescriperClassName = iconConfirmClassName(type);
    const classString = classNames(confirmClassName, confirmDescriperClassName, className);
    const cancelButton = okCancel && (React.createElement(ActionButton, { actionFn: onCancel, close: close, buttonProps: cancelButtonProps }, cancelText));
    return (React.createElement(Dialog, { prefixCls: confirmClassName, className: classString, wrapClassName: classNames({
            [centeredConfirmClassName]: !!props.centered,
        }), onCancel: () => close({ triggerCancel: true }), transitionName: transitionName, maskTransitionName: maskTransitionName, mask: mask, maskClosable: maskClosable, style: style, width: width, closable: closable, footer: "", title: "", maskStyle: maskStyle, visible: visible },
        React.createElement("div", { className: containerConfirmClassName, style: bodyStyle },
            React.createElement("div", { className: contentConfirmClassName },
                React.createElement("div", { className: indicatorConfirmClassName },
                    " ",
                    icon,
                    " "),
                React.createElement("div", { className: messageConfirmClassName },
                    props.title !== undefined && (React.createElement("span", { className: textConfirmClassName }, props.title)),
                    React.createElement("div", { className: detailConfirmClassName }, props.content))),
            React.createElement("div", { className: btnsConfirmClassName }, actions === undefined ? (React.createElement(React.Fragment, null,
                cancelButton,
                React.createElement(ActionButton, { actionFn: onOk, close: close, buttonProps: okButtonProps }, okText))) : (actions)))));
};
export default ConfirmDialog;
