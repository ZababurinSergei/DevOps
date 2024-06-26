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
import { container, singleton } from 'tsyringe';
import { Component } from './../../../this/react/component';
import { AuxiliaryEventKind, AuxiliaryModel, } from './../../../this/model';
let AuxiliaryBarService = class AuxiliaryBarService extends Component {
    constructor() {
        super();
        this.getCurrentTab = () => {
            const { current, data } = this.getState();
            const tab = data === null || data === void 0 ? void 0 : data.find((item) => item.key === current);
            return tab;
        };
        this.addAuxiliaryBar = (tabs) => {
            const next = Array.isArray(tabs) ? tabs : [tabs];
            this.setState({
                data: this.state.data.concat(next),
            });
        };
        this.setActive = (current) => {
            this.setState({ current });
        };
        this.setChildren = (children) => {
            this.setState({
                children,
            });
        };
        this.setMode = (mode) => {
            if (typeof mode === 'string') {
                this.setState({
                    mode,
                });
                return mode;
            }
            const nextMode = mode(this.state.mode);
            this.setState({
                mode: nextMode,
            });
            return nextMode;
        };
        this.reset = () => {
            this.setState(container.resolve(AuxiliaryModel));
        };
        this.state = container.resolve(AuxiliaryModel);
    }
    // ====== The belows for subscribe activity bar events ======
    onTabClick(callback) {
        this.subscribe(AuxiliaryEventKind.onTabClick, callback);
    }
};
AuxiliaryBarService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], AuxiliaryBarService);
export { AuxiliaryBarService };
