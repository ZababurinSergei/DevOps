import React, { useState, useRef } from 'react';
import { ActionBar } from './../../../this/components/actionBar';
import { inputGroupClassName, searchToolBarClassName, validationBaseInputClassName, validationErrorInputClassName, validationInfoInputClassName, validationWarningInputClassName, } from './base';
import { classNames } from './../../../this/common/className';
export var InfoTypeEnums;
(function (InfoTypeEnums) {
    InfoTypeEnums["info"] = "info";
    InfoTypeEnums["warning"] = "warning";
    InfoTypeEnums["error"] = "error";
})(InfoTypeEnums || (InfoTypeEnums = {}));
/**
 * Mock an Input by textarea
 * 'Cause we have to achieve text wrap and input cannot achieve it
 */
function Input(props) {
    const { className, placeholder, toolbarData = [], onChange, value, info, } = props;
    const [focusStatus, setFocus] = useState(false);
    const textareaRef = useRef(null);
    const onToolbarClick = (e, item) => {
        var _a, _b;
        // toolbar click can trigger input focus
        (_a = textareaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        (_b = props.onToolbarClick) === null || _b === void 0 ? void 0 : _b.call(props, item);
    };
    const getInfoClassName = (classname) => {
        switch (classname) {
            case InfoTypeEnums.info:
                return validationInfoInputClassName;
            case InfoTypeEnums.warning:
                return validationWarningInputClassName;
            case InfoTypeEnums.error:
                return validationErrorInputClassName;
            default:
                return '';
        }
    };
    const handleInputFocus = () => {
        setFocus(true);
    };
    const handleInputBlur = () => {
        setFocus(false);
    };
    const handleInputChange = (e) => {
        if (textareaRef.current) {
            // base height
            textareaRef.current.style.height = '24px';
            const curretnScollerHeight = textareaRef.current.scrollHeight;
            // count the lines
            const lines = curretnScollerHeight / 24;
            const maxLines = 5;
            if (lines > maxLines) {
                textareaRef.current.style.height = `${24 * maxLines}px`;
            }
            else {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value || '');
    };
    const handleInputKeyPress = (e) => {
        // detect Enter press
        if (e.keyCode === 13) {
            onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value || '');
            e.preventDefault();
        }
    };
    return (React.createElement("div", { className: className },
        React.createElement("textarea", { ref: textareaRef, spellCheck: false, autoCorrect: "off", autoCapitalize: "off", className: classNames((info === null || info === void 0 ? void 0 : info.text) && getInfoClassName((info === null || info === void 0 ? void 0 : info.type) || '')), value: value || '', placeholder: placeholder, title: placeholder, onKeyDown: handleInputKeyPress, onFocus: handleInputFocus, onBlur: handleInputBlur, onChange: handleInputChange }),
        (info === null || info === void 0 ? void 0 : info.text) && focusStatus && (React.createElement("div", { className: classNames(validationBaseInputClassName, getInfoClassName(info.type)) }, info.text)),
        React.createElement(ActionBar, { className: searchToolBarClassName, data: toolbarData, onClick: onToolbarClick })));
}
function Group({ children }) {
    return React.createElement("div", { className: inputGroupClassName }, children);
}
Input.Group = Group;
export default Input;
