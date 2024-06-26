"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstantiationService = exports.ServiceCollection = void 0;
var Services_1 = require("common/services/Services");
var ServiceRegistry_1 = require("common/services/ServiceRegistry");
var ServiceCollection = (function () {
    function ServiceCollection() {
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        this._entries = new Map();
        for (var _a = 0, entries_1 = entries; _a < entries_1.length; _a++) {
            var _b = entries_1[_a], id = _b[0], service = _b[1];
            this.set(id, service);
        }
    }
    ServiceCollection.prototype.set = function (id, instance) {
        var result = this._entries.get(id);
        this._entries.set(id, instance);
        return result;
    };
    ServiceCollection.prototype.forEach = function (callback) {
        this._entries.forEach(function (value, key) { return callback(key, value); });
    };
    ServiceCollection.prototype.has = function (id) {
        return this._entries.has(id);
    };
    ServiceCollection.prototype.get = function (id) {
        return this._entries.get(id);
    };
    return ServiceCollection;
}());
exports.ServiceCollection = ServiceCollection;
var InstantiationService = (function () {
    function InstantiationService() {
        this._services = new ServiceCollection();
        this._services.set(Services_1.IInstantiationService, this);
    }
    InstantiationService.prototype.setService = function (id, instance) {
        this._services.set(id, instance);
    };
    InstantiationService.prototype.getService = function (id) {
        return this._services.get(id);
    };
    InstantiationService.prototype.createInstance = function (ctor) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var serviceDependencies = ServiceRegistry_1.getServiceDependencies(ctor).sort(function (a, b) { return a.index - b.index; });
        var serviceArgs = [];
        for (var _a = 0, serviceDependencies_1 = serviceDependencies; _a < serviceDependencies_1.length; _a++) {
            var dependency = serviceDependencies_1[_a];
            var service = this._services.get(dependency.id);
            if (!service) {
                throw new Error("[createInstance] " + ctor.name + " depends on UNKNOWN service " + dependency.id + ".");
            }
            serviceArgs.push(service);
        }
        var firstServiceArgPos = serviceDependencies.length > 0 ? serviceDependencies[0].index : args.length;
        if (args.length !== firstServiceArgPos) {
            throw new Error("[createInstance] First service dependency of " + ctor.name + " at position " + (firstServiceArgPos + 1) + " conflicts with " + args.length + " static arguments");
        }
        return new (ctor.bind.apply(ctor, __spreadArrays([void 0], __spreadArrays(args, serviceArgs))))();
    };
    return InstantiationService;
}());
exports.InstantiationService = InstantiationService;
//# sourceMappingURL=InstantiationService.js.map