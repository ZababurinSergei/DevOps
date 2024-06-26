import React, { memo } from 'react';
import { getBEMElement, prefixClaName } from './../../../../this/common/className';
import TreeView from './../../../../this/components/tree';
import { localize } from './../../../../this/i18n/localize';
import { Icon, Scrollbar } from './../../../../this/components';
import { MarkerSeverity } from './../../../../this/model';
const defaultClassName = prefixClaName('problems');
const treeClassName = getBEMElement(defaultClassName, 'treeview');
const treeNodeClassName = getBEMElement(treeClassName, 'treeNode');
const treeNodeBadgeClassName = getBEMElement(treeNodeClassName, 'badge');
const treeLeafClassName = getBEMElement(treeClassName, 'treeLeaf');
const treeLeafSubInfoClassName = getBEMElement(treeLeafClassName, 'subInfo');
function ProblemsPaneView(props) {
    const { data, onSelect } = props;
    if (!(data === null || data === void 0 ? void 0 : data.length)) {
        return (React.createElement("div", { style: { margin: '0 18px', userSelect: 'none' } }, localize('panel.problems.empty', 'No problems have been detected in the workspace.')));
    }
    const getIcon = (status) => {
        switch (status) {
            case MarkerSeverity.Error: {
                return React.createElement(Icon, { type: "error" });
            }
            case MarkerSeverity.Warning: {
                return React.createElement(Icon, { type: "warning" });
            }
            case MarkerSeverity.Info: {
                return React.createElement(Icon, { type: "info" });
            }
            default: {
                return '';
            }
        }
    };
    return (React.createElement(Scrollbar, null,
        React.createElement("div", { className: defaultClassName },
            React.createElement(TreeView, { className: treeClassName, data: data, renderTitle: ({ children, name, value }, _, isLeaf) => {
                    return !isLeaf ? (React.createElement("span", { className: treeNodeClassName },
                        value.code,
                        React.createElement("span", { className: treeNodeBadgeClassName }, children === null || children === void 0 ? void 0 : children.length))) : (React.createElement("span", { className: treeLeafClassName },
                        getIcon(value.status),
                        React.createElement("span", null, value.message),
                        React.createElement("span", { className: treeLeafSubInfoClassName }, value.code),
                        React.createElement("span", { className: treeLeafSubInfoClassName },
                            "[",
                            value.startLineNumber,
                            ",",
                            ' ',
                            value.startColumn,
                            "]")));
                }, onSelect: onSelect, onRightClick: (e) => e.preventDefault() }))));
}
export default memo(ProblemsPaneView);
