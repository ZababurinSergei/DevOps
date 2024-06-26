var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import logger from './../../../this/common/logger';
import 'reflect-metadata';
import { cloneDeep } from 'lodash';
import { singleton } from 'tsyringe';
import { constants, modules } from './const';
let BuiltinService = class BuiltinService {
    constructor() {
        this.builtinConstants = new Map();
        this.builtinModules = new Map();
        this.initialize();
    }
    initialize() {
        // register all built-in constants
        Object.keys(constants).forEach((key) => {
            this.addConstant({ id: key, value: constants[key] });
        });
        // register all built-in modules
        Object.keys(modules).forEach((module) => {
            this.addModules({ id: module, module: modules[module] });
        });
    }
    addConstant(constant) {
        const uuid = constant.id;
        this.builtinConstants.set(uuid, Object.assign(Object.assign({}, constant), { active: true }));
    }
    addModules(module) {
        const uuid = module.id;
        this.builtinModules.set(uuid, Object.assign(Object.assign({}, module), { active: true }));
    }
    getConstant(id) {
        return this.builtinConstants.get(id);
    }
    getConstants() {
        const res = {};
        this.builtinConstants.forEach((constant) => {
            if (constant.active) {
                res[constant.id] = constant.value;
            }
        });
        return res;
    }
    inactiveConstant(id) {
        const isExist = this.builtinConstants.has(id);
        if (!isExist) {
            logger.error(`Can't find constant which is ${id}`);
            return false;
        }
        const constant = this.builtinConstants.get(id);
        this.builtinConstants.set(constant.id, Object.assign(Object.assign({}, constant), { active: false }));
        return true;
    }
    inactiveModule(id) {
        const isExist = this.builtinModules.has(id);
        if (!isExist) {
            logger.error(`Can't find module which is ${id}`);
            return false;
        }
        const module = this.builtinModules.get(id);
        this.builtinModules.set(module.id, Object.assign(Object.assign({}, module), { active: false }));
        return true;
    }
    getModule(id) {
        const target = this.builtinModules.get(id);
        if (!target) {
            return target;
        }
        if (!target.value) {
            target.value = target.module();
        }
        const next = Object.assign({}, target);
        Reflect.deleteProperty(next, 'module');
        return cloneDeep(next);
    }
    getModules() {
        const res = {};
        this.builtinModules.forEach((biultinModule) => {
            if (biultinModule.active) {
                const isExcute = !!biultinModule.value;
                if (!isExcute) {
                    biultinModule.value = biultinModule.module();
                }
                res[biultinModule.id] = cloneDeep(biultinModule.value);
            }
        });
        return res;
    }
    reset() {
        this.builtinModules.clear();
        this.builtinConstants.clear();
        this.initialize();
    }
};
BuiltinService = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], BuiltinService);
export { BuiltinService };
export default BuiltinService;
