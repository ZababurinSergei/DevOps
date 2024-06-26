import React, { memo } from 'react';
import { prefixClaName } from './../../../this/common/className';
const defaultClassName = prefixClaName('settings');
export function Settings() {
    return React.createElement("div", { className: defaultClassName }, "Settings");
}
export default memo(Settings);
