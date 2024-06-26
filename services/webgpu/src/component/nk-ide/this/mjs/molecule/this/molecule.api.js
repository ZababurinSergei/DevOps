import 'reflect-metadata';
import { container } from 'tsyringe';
import * as event_1 from './../this/common/event';
export { event_1 as event };
import * as react_1 from './../this/react';
export { react_1 as react };
import * as component_1 from './../this/components';
export { component_1 as component };
import * as monaco_1 from './../this/monaco/api';
export { monaco_1 as monaco };
export * from './../this/i18n';
export * from './../this/workbench';
export * from './../this/services';
import * as model_1 from './../this/model';
export { model_1 as model };
import { LayoutService, ActivityBarService, ExplorerService, FolderTreeService, SearchService, SidebarService, MenuBarService, StatusBarService, EditorService, PanelService, NotificationService, ColorThemeService, SettingsService, ProblemsService, EditorTreeService, BuiltinService, ExtensionService, AuxiliaryBarService, } from './../this/services';
import { LocaleService } from './../this/i18n';
import { MonacoService } from './monaco/monacoService';
/**
 * The locale service
 */
export const i18n = container.resolve(LocaleService);
/**
 * The layout service
 */
export const layout = container.resolve(LayoutService);
/**
 * The activityBar service
 */
export const activityBar = container.resolve(ActivityBarService);
export const auxiliaryBar = container.resolve(AuxiliaryBarService);
export const explorer = container.resolve(ExplorerService);
export const folderTree = container.resolve(FolderTreeService);
export const editorTree = container.resolve(EditorTreeService);
export const search = container.resolve(SearchService);
export const sidebar = container.resolve(SidebarService);
export const menuBar = container.resolve(MenuBarService);
export const editor = container.resolve(EditorService);
export const statusBar = container.resolve(StatusBarService);
export const panel = container.resolve(PanelService);
export const notification = container.resolve(NotificationService);
export const problems = container.resolve(ProblemsService);
/**
 * The ColorTheme service
 */
export const colorTheme = container.resolve(ColorThemeService);
/**
 * The Settings service
 */
export const settings = container.resolve(SettingsService);
export const builtin = container.resolve(BuiltinService);
/**
 * The Extension service
 */
export const extension = container.resolve(ExtensionService);
export const monacoService = container.resolve(MonacoService);
