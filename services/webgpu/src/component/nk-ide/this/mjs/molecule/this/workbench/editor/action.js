import React, { useRef } from 'react';
import { memo } from 'react';
import { Icon } from './../../../this/components/icon';
import { Menu } from './../../../this/components/menu';
import { DropDown } from './../../../this/components/dropdown';
import { groupActionItemDisabledClassName, groupActionsClassName, groupActionsItemClassName, } from './base';
import { classNames } from './../../../this/common/className';
import Tooltip from './../../../this/components/tooltip';
const MAX_ACTIONS_LENGTH = 6;
function splitActions(actions) {
    const outerActions = [];
    const innerActions = [];
    actions.forEach((action) => {
        if (action.place === 'outer') {
            outerActions.push(action);
        }
        else {
            innerActions.push(action);
        }
    });
    if (outerActions.length > MAX_ACTIONS_LENGTH) {
        const surplusActions = outerActions.splice(0, MAX_ACTIONS_LENGTH - outerActions.length);
        innerActions.concat(surplusActions);
    }
    return [outerActions, innerActions];
}
function EditorAction(props) {
    const { actions = [], isActiveGroup, onClickActions } = props;
    const [outer, inner] = splitActions(actions);
    const childRef = useRef(null);
    const handleOnMenuClick = (_, item) => {
        var _a;
        onClickActions(item);
        (_a = childRef.current) === null || _a === void 0 ? void 0 : _a.dispose();
    };
    const handleActionsClick = (action) => {
        onClickActions(action);
    };
    const overlay = inner.length > 0 ? (React.createElement(Menu, { style: { width: 200 }, data: inner, onClick: handleOnMenuClick })) : (React.createElement("span", { style: {
            padding: 15,
            fontSize: 14,
        } }, "No more actions"));
    return (React.createElement("div", { className: groupActionsClassName },
        isActiveGroup &&
            outer.map((action) => (React.createElement(Tooltip, { key: action.id, overlay: action.title },
                React.createElement("div", { onClick: () => !action.disabled && handleActionsClick(action), className: classNames(groupActionsItemClassName, action.disabled &&
                        groupActionItemDisabledClassName) }, action.icon ? (typeof action.icon === 'string' ? (React.createElement(Icon, { type: action.icon })) : (action.icon)) : (action.name))))),
        Boolean(inner.length) && (React.createElement(DropDown, { ref: childRef, placement: "bottom", className: groupActionsItemClassName, trigger: "click", title: "More Actions...", overlay: overlay },
            React.createElement(Icon, { type: "ellipsis" })))));
}
export default memo(EditorAction);
