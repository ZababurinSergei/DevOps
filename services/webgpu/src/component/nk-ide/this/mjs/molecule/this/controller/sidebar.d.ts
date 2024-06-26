import 'reflect-metadata';
import { Controller } from './../../this/react/controller';
export interface ISideBarController extends Partial<Controller> {
}
export declare class SidebarController extends Controller implements ISideBarController {
    private readonly sidebarService;
    constructor();
    initView(): void;
    readonly onClick: (event: React.MouseEvent) => void;
}
