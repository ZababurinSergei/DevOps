import React from 'react';
import { tabActiveClassName, tabClassName, tabsClassName } from './base';
import { classNames } from './../../../this/common/className';
export default function AuxiliaryBarTab({ mode, data, current, onClick, }) {
    if (mode === 'default')
        return null;
    return (React.createElement("ul", { className: tabsClassName }, data === null || data === void 0 ? void 0 : data.map((item) => (React.createElement("li", { key: item.key, className: classNames(tabClassName, current === item.key && tabActiveClassName), onClick: () => onClick === null || onClick === void 0 ? void 0 : onClick(item.key) }, item.title)))));
}
