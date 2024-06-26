var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useCallback, useRef, useImperativeHandle, forwardRef, } from 'react';
import { classNames } from './../../../this/common/className';
import { debounce } from 'lodash';
import { mergeFunctions } from './../../../this/common/utils';
import { cloneReactChildren } from './../../../this/react';
import { em2Px } from './../../../this/common/css';
import { getRelativePosition, triggerEvent } from './../../../this/common/dom';
import { activeClassName, defaultMenuClassName, defaultSubMenuClassName, horizontalMenuClassName, verticalMenuClassName, } from './base';
import { Divider } from './divider';
import { MenuItem } from './menuItem';
import { isHorizontal, MenuMode, SubMenu } from './subMenu';
const visibleMenuItem = (item) => {
    if (!item)
        return;
    if (item === null || item === void 0 ? void 0 : item.dataset.submenu) {
        const subMenu = Array.prototype.find.call(item.children, (dom) => dom.nodeName === 'UL');
        subMenu.style.opacity = '1';
        subMenu.style.pointerEvents = 'auto';
        item.classList.add(activeClassName);
    }
};
const setPositionForSubMenu = (item, subMenu, isAlignHorizontal = false) => {
    if (!item || !subMenu)
        return;
    const domRect = item.getBoundingClientRect();
    const pos = getRelativePosition(subMenu, domRect);
    if (isAlignHorizontal)
        pos.y = pos.y + domRect.height;
    else {
        pos.x = pos.x + domRect.width;
        // The vertical menu default has padding 0.5em so that need reduce the padding
        const fontSize = getComputedStyle(subMenu).getPropertyValue('font-size');
        const paddingTop = em2Px(0.5, parseInt(fontSize.replace(/px/g, '')));
        pos.y = pos.y - paddingTop;
    }
    subMenu.style.top = `${pos.y}px`;
    subMenu.style.left = `${pos.x}px`;
};
function MenuComp(props, ref) {
    const { className, mode = MenuMode.Vertical, data = [], children, onClick, trigger = 'hover', title } = props, restProps = __rest(props, ["className", "mode", "data", "children", "onClick", "trigger", "title"]);
    const menuRef = useRef(null);
    const isMouseInMenu = useRef(false);
    let content = cloneReactChildren(children, { onClick });
    // Only when the trigger is hover need to set the delay
    const delay = trigger === 'hover' ? 200 : 0;
    const modeClassName = mode === MenuMode.Horizontal
        ? horizontalMenuClassName
        : verticalMenuClassName;
    const claNames = classNames(defaultMenuClassName, modeClassName, className);
    if (data.length > 0) {
        const renderMenusByData = (menus) => {
            return menus.map((item) => {
                if (item.type === 'divider')
                    return React.createElement(Divider, { key: item.id });
                const handleClick = mergeFunctions(onClick, item.onClick);
                if (item.data && item.data.length > 0) {
                    return (React.createElement(SubMenu, Object.assign({ key: item.id, mode: item.mode || mode }, item, { onClick: handleClick }), renderMenusByData(item.data)));
                }
                return (React.createElement(MenuItem, Object.assign({}, item, { key: item.id, onClick: handleClick }), item.name));
            });
        };
        content = renderMenusByData(data);
    }
    const initialMenuStyle = () => {
        var _a, _b;
        (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('ul').forEach((ul) => {
            ul.style.opacity = '0';
            ul.style.pointerEvents = 'none';
        });
        (_b = menuRef.current) === null || _b === void 0 ? void 0 : _b.querySelectorAll(`li.${activeClassName}`).forEach((li) => {
            li.classList.remove(activeClassName);
        });
    };
    const detectDomElementByEvent = debounce((e) => {
        // ensure only when mouse in menu can the submenu toggle visibility
        if (isMouseInMenu.current) {
            const doms = document.elementsFromPoint(e.pageX, e.pageY);
            const ulDom = doms.find((dom) => dom.nodeName === 'UL');
            const liDom = doms.find((dom) => dom.nodeName === 'LI');
            // clear current ul children style
            if (ulDom) {
                ulDom.querySelectorAll('ul').forEach((ul) => {
                    ul.style.opacity = '0';
                    ul.style.pointerEvents = 'none';
                });
                ulDom
                    .querySelectorAll(`li.${activeClassName}`)
                    .forEach((li) => {
                    li.classList.remove(activeClassName);
                });
            }
            visibleMenuItem(liDom);
            const subMenu = (liDom === null || liDom === void 0 ? void 0 : liDom.querySelector('ul')) || undefined;
            const subMenuMode = (liDom === null || liDom === void 0 ? void 0 : liDom.dataset.mode) || mode;
            setPositionForSubMenu(liDom, subMenu, isHorizontal(subMenuMode));
        }
    }, delay);
    const handleTriggerEvent = (e) => {
        e.preventDefault();
        e.persist();
        e.stopPropagation();
        isMouseInMenu.current = true;
        detectDomElementByEvent(e);
    };
    const handleMouseOut = () => {
        isMouseInMenu.current = false;
    };
    const getEventListener = () => {
        // sub menu do not listen any event
        if (claNames === null || claNames === void 0 ? void 0 : claNames.includes(defaultSubMenuClassName))
            return {};
        return {
            onContextMenu: (e) => {
                e.preventDefault();
                e.persist();
                e.stopPropagation();
            },
            onClick: (e) => {
                e.preventDefault();
                e.persist();
                e.stopPropagation();
            },
            [triggerEvent(trigger)]: handleTriggerEvent,
            onMouseOut: handleMouseOut,
        };
    };
    const hideAfterLeftWindow = useCallback(() => {
        if (document.hidden) {
            initialMenuStyle();
        }
    }, []);
    useEffect(() => {
        window.addEventListener('contextmenu', initialMenuStyle);
        window.addEventListener('click', initialMenuStyle);
        window.addEventListener('visibilitychange', hideAfterLeftWindow);
        return () => {
            document.removeEventListener('contextmenu', initialMenuStyle);
            window.removeEventListener('click', initialMenuStyle);
            window.removeEventListener('visibilitychange', hideAfterLeftWindow);
        };
    }, []);
    useImperativeHandle(ref, () => ({
        dispose: () => {
            initialMenuStyle();
        },
    }));
    return (React.createElement("ul", Object.assign({ className: claNames, ref: menuRef }, (typeof title === 'string' ? { title } : {}), getEventListener(), restProps), content));
}
export const Menu = forwardRef(MenuComp);
