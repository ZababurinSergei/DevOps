import { getBEMElement, prefixClaName } from './../../../this/common/className';
export const statusBarClassName = prefixClaName('statusBar');
export const leftItemsClassName = getBEMElement(statusBarClassName, 'left-items');
export const rightItemsClassName = getBEMElement(statusBarClassName, 'right-items');
export const itemClassName = getBEMElement(statusBarClassName, 'item');
export function sortByIndex(a, b) {
    return a.sortIndex !== undefined && b.sortIndex !== undefined
        ? a.sortIndex - b.sortIndex
        : 0;
}
