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
import React from 'react';
import { render as renderUtils, unmout } from './../../../this/react/render';
import { Icon } from './../../../this/components/icon';
import { destroyFns } from './modal';
import ConfirmDialog from './confirmDialog';
export default function confirm(config) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const currentConfig = Object.assign(Object.assign({}, config), { close, visible: true });
    function destroy(...args) {
        const triggerCancel = args.some((param) => param && param.triggerCancel);
        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
        }
        const unmountResult = unmout(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        for (let i = 0; i < destroyFns.length; i++) {
            const fn = destroyFns[i];
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            if (fn === close) {
                destroyFns.splice(i, 1);
                break;
            }
        }
    }
    function render(_a) {
        var { okText, cancelText } = _a, props = __rest(_a, ["okText", "cancelText"]);
        renderUtils(React.createElement(ConfirmDialog, Object.assign({ okText: okText, cancelText: cancelText }, props)), div);
    }
    function close(...args) {
        destroy(...args);
    }
    render(currentConfig);
    destroyFns.push(close);
    return {
        destroy: close,
    };
}
export function withWarn(props) {
    return Object.assign({ type: 'warning', okCancel: false, icon: React.createElement(Icon, { type: "warning" }) }, props);
}
export function withConfirm(props) {
    return Object.assign({ type: 'confirm', okCancel: true, icon: React.createElement(Icon, { type: "warning" }) }, props);
}
