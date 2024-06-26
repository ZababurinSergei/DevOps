"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = exports.LogLevel = void 0;
var Services_1 = require("common/services/Services");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["OFF"] = 4] = "OFF";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var optionsKeyToLogLevel = {
    debug: LogLevel.DEBUG,
    info: LogLevel.INFO,
    warn: LogLevel.WARN,
    error: LogLevel.ERROR,
    off: LogLevel.OFF
};
var LOG_PREFIX = 'xterm.js: ';
var LogService = (function () {
    function LogService(_optionsService) {
        var _this = this;
        this._optionsService = _optionsService;
        this._updateLogLevel();
        this._optionsService.onOptionChange(function (key) {
            if (key === 'logLevel') {
                _this._updateLogLevel();
            }
        });
    }
    LogService.prototype._updateLogLevel = function () {
        this._logLevel = optionsKeyToLogLevel[this._optionsService.options.logLevel];
    };
    LogService.prototype._evalLazyOptionalParams = function (optionalParams) {
        for (var i = 0; i < optionalParams.length; i++) {
            if (typeof optionalParams[i] === 'function') {
                optionalParams[i] = optionalParams[i]();
            }
        }
    };
    LogService.prototype._log = function (type, message, optionalParams) {
        this._evalLazyOptionalParams(optionalParams);
        type.call.apply(type, __spreadArrays([console, LOG_PREFIX + message], optionalParams));
    };
    LogService.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this._logLevel <= LogLevel.DEBUG) {
            this._log(console.log, message, optionalParams);
        }
    };
    LogService.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this._logLevel <= LogLevel.INFO) {
            this._log(console.info, message, optionalParams);
        }
    };
    LogService.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this._logLevel <= LogLevel.WARN) {
            this._log(console.warn, message, optionalParams);
        }
    };
    LogService.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this._logLevel <= LogLevel.ERROR) {
            this._log(console.error, message, optionalParams);
        }
    };
    LogService = __decorate([
        __param(0, Services_1.IOptionsService)
    ], LogService);
    return LogService;
}());
exports.LogService = LogService;
//# sourceMappingURL=LogService.js.map