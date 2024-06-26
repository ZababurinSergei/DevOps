import React from 'react';
import { useState } from 'react';
import Input, { InfoTypeEnums } from './input';
import { classNames } from './../../../this/common/className';
import { baseInputClassName, defaultSearchClassName, replaceBtnClassName, replaceContainerClassName, searchTargetContainerClassName, } from './base';
import { Icon } from '../icon';
export function Search(props) {
    const { className = '', style, placeholders = [], validationInfo: rawInfo, addons = [], values = [], onAddonClick, onButtonClick, onChange, onSearch, } = props;
    const [searchPlaceholder = 'Search', replacePlaceholder = 'Replace'] = placeholders;
    const [searchAddons, replaceAddons] = addons;
    const [searchVal, replaceVal] = values;
    const [isShowReplace, setShowReplace] = useState(false);
    const onToggleReplaceBtn = () => {
        setShowReplace(!isShowReplace);
        onButtonClick === null || onButtonClick === void 0 ? void 0 : onButtonClick(!isShowReplace);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch([searchVal, replaceVal]);
    };
    const handleSearchChange = (value, source) => {
        if (onChange) {
            const values = source === 'search' ? [value, replaceVal] : [searchVal, value];
            onChange(values);
            onSearch === null || onSearch === void 0 ? void 0 : onSearch(values);
        }
    };
    const handleToolbarClick = (addon) => {
        onAddonClick === null || onAddonClick === void 0 ? void 0 : onAddonClick(addon);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch([searchVal, replaceVal]);
    };
    const getInfoFromRaw = () => {
        if (rawInfo) {
            if (typeof rawInfo === 'string') {
                return { type: InfoTypeEnums.info, text: rawInfo };
            }
            return rawInfo;
        }
        return undefined;
    };
    const validationInfo = getInfoFromRaw();
    return (React.createElement("div", { style: style, className: classNames(defaultSearchClassName, className) },
        React.createElement(Icon, { className: replaceBtnClassName, type: isShowReplace ? 'chevron-down' : 'chevron-right', onClick: onToggleReplaceBtn }),
        React.createElement(Input.Group, null,
            React.createElement(Input, { value: searchVal, className: classNames(baseInputClassName, searchTargetContainerClassName), info: validationInfo, placeholder: searchPlaceholder, onChange: (v) => handleSearchChange(v, 'search'), toolbarData: searchAddons, onToolbarClick: handleToolbarClick }),
            isShowReplace && (React.createElement(Input, { value: replaceVal, className: classNames(baseInputClassName, replaceContainerClassName), placeholder: replacePlaceholder, onChange: (v) => handleSearchChange(v, 'replace'), toolbarData: replaceAddons, onToolbarClick: handleToolbarClick })))));
}
