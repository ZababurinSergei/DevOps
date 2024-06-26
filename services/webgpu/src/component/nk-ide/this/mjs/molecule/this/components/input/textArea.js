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
import RcTextArea from 'rc-textarea';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useEffect, useRef } from 'react';
import { omit } from 'lodash';
import { classNames, getBEMElement, getBEMModifier } from './../../../this/common/className';
import { fixControlledValue, inputClassName, resolveOnChange } from './input';
const textAreaClassName = getBEMElement(inputClassName, 'textarea');
const showCountClassName = getBEMModifier(textAreaClassName, 'show-count');
export const TextArea = (_a) => {
    var { showCount = false, maxLength, className, style, onChange } = _a, props = __rest(_a, ["showCount", "maxLength", "className", "style", "onChange"]);
    const innerRef = useRef(null);
    const [value, setValue] = useMergedState(props.defaultValue, {
        value: props.value,
    });
    const prevValue = useRef(props.value);
    useEffect(() => {
        if (props.value !== undefined || prevValue.current !== props.value) {
            setValue(props.value);
            prevValue.current = props.value;
        }
    }, [props.value, prevValue.current]);
    const handleSetValue = (val) => {
        if (props.value === undefined) {
            setValue(val);
        }
    };
    const handleChange = (e) => {
        handleSetValue(e.target.value);
        resolveOnChange(innerRef.current, e, onChange);
    };
    const otherProps = omit(props, ['value']);
    const textArea = (React.createElement(RcTextArea, Object.assign({}, otherProps, { value: value, maxLength: maxLength, className: classNames(className && !showCount ? [className] : ''), style: showCount ? {} : style, prefixCls: inputClassName, onChange: handleChange, ref: innerRef })));
    let val = fixControlledValue(value);
    const hasMaxLength = Number(maxLength) > 0;
    val = hasMaxLength ? [...val].slice(0, maxLength).join('') : val;
    // Only show text area wrapper when needed
    if (showCount) {
        const valueLength = [...val].length;
        const dataCount = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;
        return (React.createElement("div", { className: classNames(className, textAreaClassName, showCountClassName), style: style, "data-count": dataCount }, textArea));
    }
    return textArea;
};
