import 'reflect-metadata';
import React, { useEffect } from 'react';
import { container } from 'tsyringe';
import { classNames, getFontInMac, prefixClaName, getBEMModifier, getBEMElement, } from './../../this/common/className.js';
import { EditorView } from './../../this/workbench/editor';
import { SidebarView } from './../../this/workbench/sidebar';
import { MenuBarView } from './../../this/workbench/menuBar';
import { ActivityBarView } from './../../this/workbench/activityBar';
import { StatusBarView } from './../../this/workbench/statusBar';
import { PanelView } from './../../this/workbench/panel';
import { ID_APP } from './../../this/common/id';
import { APP_PREFIX } from './../../this/common/const';
import { connect } from './../../this/react';
import { LayoutController } from './../../this/controller/layout';
import { LayoutService } from './../../this/services';
import { MenuBarMode } from './../../this/model/workbench/layout';
import SplitPane from './../../this/components/split/SplitPane';
import { Pane } from './../../this/components/split';
import { Display } from './../../this/components';
import { AuxiliaryBar, AuxiliaryBarTab } from './auxiliaryBar';
const mainBenchClassName = prefixClaName('mainBench');
const workbenchClassName = prefixClaName('workbench');
const compositeBarClassName = prefixClaName('compositeBar');
const appClassName = classNames(APP_PREFIX, getFontInMac());
const workbenchWithHorizontalMenuBarClassName = getBEMModifier(workbenchClassName, 'with-horizontal-menuBar');
const withHiddenStatusBar = getBEMModifier(workbenchClassName, 'with-hidden-statusBar');
const displayActivityBarClassName = getBEMElement(workbenchClassName, 'display-activityBar');
const layoutController = container.resolve(LayoutController);
const layoutService = container.resolve(LayoutService);
export function WorkbenchView(props) {
    const { activityBar, auxiliaryBar, menuBar, panel, sidebar, statusBar, onPaneSizeChange, onWorkbenchDidMount, onHorizontalPaneSizeChange, splitPanePos, horizontalSplitPanePos, } = props;
    const getSizes = () => {
        if (panel.hidden) {
            return ['100%', 0];
        }
        if (panel.panelMaximized) {
            return [0, '100%'];
        }
        return horizontalSplitPanePos;
    };
    const getContentSize = () => {
        if (!sidebar.hidden && !auxiliaryBar.hidden)
            return splitPanePos;
        if (sidebar.hidden) {
            return auxiliaryBar.hidden
                ? [0, '100%', 0]
                : [0, 'auto', splitPanePos[2]];
        }
        return [splitPanePos[0], 'auto', 0];
    };
    const getContentSashes = () => {
        if (!sidebar.hidden && !auxiliaryBar.hidden)
            return true;
        if (sidebar.hidden) {
            return auxiliaryBar.hidden ? false : [false, true];
        }
        return [true, false];
    };
    const handleContentChanged = (sizes) => {
        const nextPos = [];
        nextPos[0] = sidebar.hidden ? Number(splitPanePos[0]) : sizes[0];
        nextPos[2] = auxiliaryBar.hidden ? Number(splitPanePos[2]) : sizes[2];
        nextPos[1] =
            sizes.reduce((acc, cur) => acc + cur, 0) - nextPos[0] - nextPos[2];
        onPaneSizeChange === null || onPaneSizeChange === void 0 ? void 0 : onPaneSizeChange(nextPos);
    };
    const isMenuBarVertical = !menuBar.hidden && menuBar.mode === MenuBarMode.vertical;
    const isMenuBarHorizontal = !menuBar.hidden && menuBar.mode === MenuBarMode.horizontal;
    const horizontalMenuBar = isMenuBarHorizontal
        ? workbenchWithHorizontalMenuBarClassName
        : null;
    const hideStatusBar = statusBar.hidden ? withHiddenStatusBar : null;
    const workbenchFinalClassName = classNames(workbenchClassName, horizontalMenuBar, hideStatusBar);
    useEffect(() => {
        // call onWorkbenchDidMount after the first render
        onWorkbenchDidMount === null || onWorkbenchDidMount === void 0 ? void 0 : onWorkbenchDidMount();
    }, []);
    return (React.createElement("div", { id: ID_APP, className: appClassName, tabIndex: 0 },
        React.createElement("div", { className: workbenchFinalClassName },
            React.createElement(Display, { visible: isMenuBarHorizontal },
                React.createElement(MenuBarView, { mode: MenuBarMode.horizontal })),
            React.createElement("div", { className: mainBenchClassName },
                React.createElement("div", { className: compositeBarClassName },
                    React.createElement(Display, { visible: isMenuBarVertical },
                        React.createElement(MenuBarView, { mode: MenuBarMode.vertical })),
                    React.createElement(Display, { visible: !activityBar.hidden, className: displayActivityBarClassName },
                        React.createElement(ActivityBarView, null))),
                React.createElement(SplitPane, { sizes: getContentSize(), split: "vertical", showSashes: getContentSashes(), onChange: handleContentChanged },
                    React.createElement(Pane, { minSize: 170, maxSize: "80%" },
                        React.createElement(SidebarView, null)),
                    React.createElement(SplitPane, { sizes: getSizes(), showSashes: !panel.hidden && !panel.panelMaximized, allowResize: [true, false], split: "horizontal", onChange: onHorizontalPaneSizeChange },
                        React.createElement(Pane, { minSize: "10%", maxSize: "80%" },
                            React.createElement(EditorView, null)),
                        React.createElement(PanelView, null)),
                    React.createElement(Pane, { minSize: 100, maxSize: "80%" },
                        React.createElement(AuxiliaryBar, null))),
                React.createElement(AuxiliaryBarTab, null))),
        React.createElement(Display, { visible: !statusBar.hidden },
            React.createElement(StatusBarView, null))));
}
export const Workbench = connect(layoutService, WorkbenchView, layoutController);
