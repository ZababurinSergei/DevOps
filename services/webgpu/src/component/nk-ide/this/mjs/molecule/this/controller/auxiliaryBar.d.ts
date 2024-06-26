import 'reflect-metadata';
import { Controller } from './../../this/react/controller';
import type { UniqueId } from './../../this/common/types';
export interface IAuxiliaryController {
    onClick?: (key: UniqueId) => void;
}
export declare class AuxiliaryController extends Controller implements IAuxiliaryController {
    private readonly auxiliaryService;
    constructor();
    initView: () => void;
    onClick: (key: UniqueId) => void;
}
