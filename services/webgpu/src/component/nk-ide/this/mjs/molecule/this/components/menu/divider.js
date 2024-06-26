import { classNames } from './../../../this/common/className';
import React from 'react';
import { defaultDividerClassName, defaultMenuItemClassName, disabledClassName, } from './base';
const Divider = () => {
    return (React.createElement("li", { className: classNames(defaultMenuItemClassName, disabledClassName), role: "separator" },
        React.createElement("a", { className: defaultDividerClassName })));
};
export { Divider };
