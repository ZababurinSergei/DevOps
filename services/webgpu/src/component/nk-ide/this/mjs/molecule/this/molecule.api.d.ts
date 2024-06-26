import 'reflect-metadata';
export * as event from './../this/common/event';
export * as react from './../this/react';
export * as component from './../this/components';
export * as monaco from './../this/monaco/api';
export * from './../this/i18n';
export * from './../this/workbench';
export * from './../this/services';
export * as model from './../this/model';
import { ILayoutService, IActivityBarService, IExplorerService, IFolderTreeService, ISearchService, ISidebarService, IMenuBarService, IStatusBarService, IEditorService, IPanelService, INotificationService, IColorThemeService, ISettingsService, IProblemsService, IEditorTreeService, BuiltinService, IExtensionService, IAuxiliaryBarService } from './../this/services';
import { ILocaleService } from './../this/i18n';
import { IMonacoService } from './monaco/monacoService';
/**
 * The locale service
 */
export declare const i18n: ILocaleService;
/**
 * The layout service
 */
export declare const layout: ILayoutService;
/**
 * The activityBar service
 */
export declare const activityBar: IActivityBarService;
export declare const auxiliaryBar: IAuxiliaryBarService;
export declare const explorer: IExplorerService;
export declare const folderTree: IFolderTreeService;
export declare const editorTree: IEditorTreeService;
export declare const search: ISearchService;
export declare const sidebar: ISidebarService;
export declare const menuBar: IMenuBarService;
export declare const editor: IEditorService;
export declare const statusBar: IStatusBarService;
export declare const panel: IPanelService;
export declare const notification: INotificationService;
export declare const problems: IProblemsService;
/**
 * The ColorTheme service
 */
export declare const colorTheme: IColorThemeService;
/**
 * The Settings service
 */
export declare const settings: ISettingsService;
export declare const builtin: BuiltinService;
/**
 * The Extension service
 */
export declare const extension: IExtensionService;
export declare const monacoService: IMonacoService;
