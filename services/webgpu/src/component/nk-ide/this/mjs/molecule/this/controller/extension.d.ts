import 'reflect-metadata';
import { Controller } from './../../this/react/controller';
export interface IExtensionController extends Partial<Controller> {
}
export declare class ExtensionController extends Controller implements IExtensionController {
    private readonly extensionService;
    private readonly builtinService;
    constructor();
    initView(): void;
}
