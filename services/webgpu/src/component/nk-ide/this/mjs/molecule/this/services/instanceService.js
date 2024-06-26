import { container } from 'tsyringe';
import { defaultExtensions } from './../../this/extensions';
import { GlobalEvent } from './../../this/common/event';
import { STORE_KEY } from './../../this/i18n/localeService';
import molecule from './../../this/';
import { ActivityBarController, AuxiliaryController, EditorController, EditorTreeController, ExplorerController, ExtensionController, FolderTreeController, LayoutController, MenuBarController, NotificationController, OutlineController, PanelController, ProblemsController, SearchController, SettingsController, SidebarController, StatusBarController, } from './../../this/controller';
var InstanceHookKind;
(function (InstanceHookKind) {
    InstanceHookKind["beforeInit"] = "before.init";
    InstanceHookKind["beforeLoad"] = "before.load";
})(InstanceHookKind || (InstanceHookKind = {}));
export default class InstanceService extends GlobalEvent {
    constructor(config) {
        super();
        this._config = {
            extensions: defaultExtensions.concat(),
            defaultLocale: 'en',
        };
        this.rendered = false;
        this.initialLocaleService = (languagesExts) => {
            const locales = languagesExts.reduce((pre, cur) => {
                var _a;
                const languages = ((_a = cur.contributes) === null || _a === void 0 ? void 0 : _a.languages) || [];
                return pre.concat(languages);
            }, []);
            molecule.i18n.initialize(locales, localStorage.getItem(STORE_KEY) || this._config.defaultLocale);
        };
        this.getConfig = () => {
            return Object.assign({}, this._config);
        };
        this.render = (workbench) => {
            if (!this.rendered) {
                this.emit(InstanceHookKind.beforeInit);
                // get all locales including builtin and custom locales
                const [languages, others] = molecule.extension.splitLanguagesExts(this._config.extensions);
                this.initialLocaleService(languages);
                const controllers = [
                    ActivityBarController,
                    AuxiliaryController,
                    EditorController,
                    /**
                     * Explorer should called before EditorTreeController,
                     * @refer https://github.com/DTStack/molecule/issues/829
                     */
                    ExplorerController,
                    EditorTreeController,
                    ExtensionController,
                    FolderTreeController,
                    LayoutController,
                    MenuBarController,
                    NotificationController,
                    OutlineController,
                    PanelController,
                    ProblemsController,
                    SearchController,
                    SettingsController,
                    SidebarController,
                    StatusBarController,
                ];
                molecule.layout.onWorkbenchDidMount(() => {
                    if (!this.rendered) {
                        molecule.monacoService.initWorkspace(molecule.layout.container);
                        // resolve all controllers, and call `initView` to inject initial values into services
                        Object.keys(controllers).forEach((key) => {
                            var _a;
                            const module = controllers[key];
                            const controller = container.resolve(module);
                            (_a = controller.initView) === null || _a === void 0 ? void 0 : _a.call(controller);
                        });
                        this.emit(InstanceHookKind.beforeLoad);
                        molecule.extension.load(others);
                        this.rendered = true;
                    }
                });
            }
            return workbench;
        };
        this.onBeforeInit = (callback) => {
            this.subscribe(InstanceHookKind.beforeInit, callback);
        };
        this.onBeforeLoad = (callback) => {
            this.subscribe(InstanceHookKind.beforeLoad, callback);
        };
        if (config.defaultLocale) {
            this._config.defaultLocale = config.defaultLocale;
        }
        if (Array.isArray(config.extensions)) {
            this._config.extensions.push(...config.extensions);
        }
    }
}
