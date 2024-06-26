import React, { useState, useRef, useEffect } from 'react';
import { getBEMElement, prefixClaName, getBEMModifier, } from './../../../this/common/className';
import { Menu, MenuMode } from './../../../this/components/menu';
import Logo from './logo';
export const defaultClassName = prefixClaName('menuBar');
export const actionClassName = getBEMElement(defaultClassName, 'action');
export const horizontalClassName = getBEMModifier(defaultClassName, 'horizontal');
export const logoClassName = getBEMElement(horizontalClassName, 'logo');
export const logoContentClassName = getBEMElement(logoClassName, 'content');
export function HorizontalView(props) {
    const { data, onClick, logo } = props;
    const menuRef = useRef(null);
    const [autoDisplayMenu, setAutoDisplayMenu] = useState(false);
    const checkIsRootLiElem = (e) => {
        var _a;
        const target = e.target;
        const liElem = target.closest('li');
        const menuBarElem = (_a = liElem === null || liElem === void 0 ? void 0 : liElem.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        const isRootLiElem = !!menuBarElem &&
            menuBarElem.classList.contains(horizontalClassName);
        return isRootLiElem;
    };
    useEffect(() => {
        const menuBarElem = document.getElementsByClassName(horizontalClassName)[0];
        const handleClickMenuBar = (e) => {
            var _a, _b;
            const isRootLiElem = checkIsRootLiElem(e);
            const target = e.target;
            if (isRootLiElem) {
                if (autoDisplayMenu) {
                    (_b = (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
                }
                // Delay the execution of setAutoDisplayMenu to ensure that the menu can be displayed.
                setTimeout(() => setAutoDisplayMenu(!autoDisplayMenu));
            }
            else {
                const liElem = target.closest('li');
                const isNormalLiElem = liElem &&
                    menuBarElem.contains(liElem) &&
                    !(liElem === null || liElem === void 0 ? void 0 : liElem.dataset.submenu);
                if (!liElem || isNormalLiElem) {
                    setAutoDisplayMenu(false);
                }
            }
        };
        const clearAutoDisplay = (e) => {
            if (!autoDisplayMenu)
                return;
            const target = e.target;
            if (!menuBarElem.contains(target)) {
                setAutoDisplayMenu(false);
            }
        };
        document.addEventListener('click', clearAutoDisplay);
        menuBarElem === null || menuBarElem === void 0 ? void 0 : menuBarElem.addEventListener('click', handleClickMenuBar);
        return () => {
            document.removeEventListener('click', clearAutoDisplay);
            menuBarElem === null || menuBarElem === void 0 ? void 0 : menuBarElem.removeEventListener('click', handleClickMenuBar);
        };
    }, [autoDisplayMenu]);
    const trigger = autoDisplayMenu ? 'hover' : 'click';
    const handleClickMenu = (e, item) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e, item);
        menuRef.current.dispose();
    };
    return (React.createElement("div", { className: horizontalClassName },
        React.createElement("div", { className: logoClassName }, logo || React.createElement(Logo, { className: logoContentClassName })),
        React.createElement(Menu, { ref: menuRef, role: "menu", mode: MenuMode.Horizontal, trigger: trigger, onClick: handleClickMenu, style: { width: '100%' }, data: data })));
}
