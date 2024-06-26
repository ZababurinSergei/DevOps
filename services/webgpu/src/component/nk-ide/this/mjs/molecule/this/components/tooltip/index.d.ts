import React from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import type { TooltipProps } from 'rc-tooltip/lib/Tooltip';
export interface IToolTipProps extends TooltipProps {
}
declare const Tooltip: ({ overlay, children, placement, trigger, overlayClassName, mouseEnterDelay, ...rest }: IToolTipProps) => React.JSX.Element | null;
export default Tooltip;
