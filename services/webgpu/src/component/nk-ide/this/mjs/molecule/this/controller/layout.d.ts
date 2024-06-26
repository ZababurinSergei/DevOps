import 'reflect-metadata';
import { Controller } from './../../this/react/controller';
export interface ILayoutController extends Partial<Controller> {
    onWorkbenchDidMount?: () => void;
    onPaneSizeChange?: (splitPanePos: number[]) => void;
    onHorizontalPaneSizeChange?: (horizontalSplitPanePos: number[]) => void;
}
export declare class LayoutController extends Controller implements ILayoutController {
    private readonly layoutService;
    constructor();
    initView(): void;
    onPaneSizeChange: (splitPanePos: number[]) => void;
    onHorizontalPaneSizeChange: (horizontalSplitPanePos: number[]) => void;
    onWorkbenchDidMount: () => void;
}
