var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { Controller } from './../../../this/react/controller';
import { container, singleton } from 'tsyringe';
import { BuiltinService, ExplorerService, } from './../../../this/services';
let OutlineController = class OutlineController extends Controller {
    constructor() {
        super();
        this.onClick = (event) => {
            // console.log('onClick:', panelService);
        };
        this.explorerService = container.resolve(ExplorerService);
        this.builtinService = container.resolve(BuiltinService);
    }
    initView() {
        const { builtInExplorerOutlinePanel } = this.builtinService.getModules();
        if (builtInExplorerOutlinePanel) {
            this.explorerService.addPanel(builtInExplorerOutlinePanel);
        }
    }
};
OutlineController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], OutlineController);
export { OutlineController };
