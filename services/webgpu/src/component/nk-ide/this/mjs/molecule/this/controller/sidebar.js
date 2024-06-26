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
import { Controller } from './../../this/react/controller';
import { container, singleton } from 'tsyringe';
import { SidebarService } from './../../this/services';
let SidebarController = class SidebarController extends Controller {
    constructor() {
        super();
        this.onClick = (event) => {
            console.log('onClick:', this.sidebarService);
        };
        this.sidebarService = container.resolve(SidebarService);
    }
    initView() { }
};
SidebarController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], SidebarController);
export { SidebarController };
