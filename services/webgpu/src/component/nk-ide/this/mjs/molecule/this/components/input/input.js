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
import { classNames, prefixClaName, getBEMModifier } from './../../../this/common/className';
import { KeyCodes } from './../../../this/common/keyCodes';
export const inputClassName = prefixClaName('input');
export const normalClassName = getBEMModifier(inputClassName, 'normal');
export const largetClassName = getBEMModifier(inputClassName, 'lg');
export const disabledClassName = getBEMModifier(inputClassName, 'disabled');
export function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null)
        return '';
    return value;
}
export function resolveOnChange(_, e, onChange) {
    if (onChange) {
        const event = e;
        onChange(event);
    }
}
export function getInputClassName(size, disabled) {
    return classNames(inputClassName, { [normalClassName]: size === 'normal' }, { [largetClassName]: size === 'large' }, { [disabledClassName]: disabled });
}
export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.input = null;
        this.saveInput = (input) => {
            this.input = input;
        };
        this.handleChange = (e) => {
            const { onChange } = this.props;
            this.setValue(e.target.value);
            if (typeof onChange === 'function')
                resolveOnChange(this.input, e, onChange);
        };
        this.handleKeyDown = (e) => {
            const { onPressEnter, onKeyDown } = this.props;
            if (e.key === KeyCodes.ENTER) {
                onPressEnter === null || onPressEnter === void 0 ? void 0 : onPressEnter(e);
            }
            onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
        };
        const value = typeof props.value === 'undefined'
            ? props.defaultValue
            : props.value;
        this.state = {
            value,
            prevValue: props.value,
        };
    }
    static getDerivedStateFromProps(nextProps, { prevValue }) {
        const newState = { prevValue: nextProps.value };
        if (nextProps.value !== undefined || prevValue !== nextProps.value) {
            newState.value = nextProps.value;
        }
        return newState;
    }
    setValue(value) {
        if (this.props.value === undefined) {
            this.setState({ value });
        }
    }
    render() {
        const { value } = this.state;
        const _a = this.props, { className, size = 'normal', disabled = false, placeholder, style } = _a, props = __rest(_a, ["className", "size", "disabled", "placeholder", "style"]);
        return (React.createElement("input", Object.assign({ value: value, style: style, placeholder: placeholder, onChange: this.handleChange, onKeyDown: this.handleKeyDown, className: classNames(className, getInputClassName(size, disabled)), ref: this.saveInput }, props)));
    }
}
Input.defaultProps = {
    type: 'text',
};
