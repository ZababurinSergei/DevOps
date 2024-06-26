import 'reflect-metadata';
import { Controller } from './../../this/react/controller';
export interface ISettingsController extends Partial<Controller> {
}
export declare class SettingsController extends Controller implements ISettingsController {
    private readonly editorService;
    private readonly settingsService;
    private readonly localeService;
    private readonly notificationService;
    private readonly builtinService;
    constructor();
    /**
     * Delay the each Settings change event 600 milliseconds,
     * and then call the `update` and `emit` functions;
     */
    private onChangeSettings;
    initView(): void;
    private notifyLocaleChanged;
}
