"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreService = void 0;
var Services_1 = require("common/services/Services");
var EventEmitter_1 = require("common/EventEmitter");
var Clone_1 = require("common/Clone");
var Lifecycle_1 = require("common/Lifecycle");
var DEFAULT_MODES = Object.freeze({
    insertMode: false
});
var DEFAULT_DEC_PRIVATE_MODES = Object.freeze({
    applicationCursorKeys: false,
    applicationKeypad: false,
    bracketedPasteMode: false,
    origin: false,
    reverseWraparound: false,
    sendFocus: false,
    wraparound: true
});
var CoreService = (function (_super) {
    __extends(CoreService, _super);
    function CoreService(scrollToBottom, _bufferService, _logService, _optionsService) {
        var _this = _super.call(this) || this;
        _this._bufferService = _bufferService;
        _this._logService = _logService;
        _this._optionsService = _optionsService;
        _this.isCursorInitialized = false;
        _this.isCursorHidden = false;
        _this._onData = _this.register(new EventEmitter_1.EventEmitter());
        _this._onUserInput = _this.register(new EventEmitter_1.EventEmitter());
        _this._onBinary = _this.register(new EventEmitter_1.EventEmitter());
        _this._scrollToBottom = scrollToBottom;
        _this.register({ dispose: function () { return _this._scrollToBottom = undefined; } });
        _this.modes = Clone_1.clone(DEFAULT_MODES);
        _this.decPrivateModes = Clone_1.clone(DEFAULT_DEC_PRIVATE_MODES);
        return _this;
    }
    Object.defineProperty(CoreService.prototype, "onData", {
        get: function () { return this._onData.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreService.prototype, "onUserInput", {
        get: function () { return this._onUserInput.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreService.prototype, "onBinary", {
        get: function () { return this._onBinary.event; },
        enumerable: false,
        configurable: true
    });
    CoreService.prototype.reset = function () {
        this.modes = Clone_1.clone(DEFAULT_MODES);
        this.decPrivateModes = Clone_1.clone(DEFAULT_DEC_PRIVATE_MODES);
    };
    CoreService.prototype.triggerDataEvent = function (data, wasUserInput) {
        if (wasUserInput === void 0) { wasUserInput = false; }
        if (this._optionsService.options.disableStdin) {
            return;
        }
        var buffer = this._bufferService.buffer;
        if (buffer.ybase !== buffer.ydisp) {
            this._scrollToBottom();
        }
        if (wasUserInput) {
            this._onUserInput.fire();
        }
        this._logService.debug("sending data \"" + data + "\"", function () { return data.split('').map(function (e) { return e.charCodeAt(0); }); });
        this._onData.fire(data);
    };
    CoreService.prototype.triggerBinaryEvent = function (data) {
        if (this._optionsService.options.disableStdin) {
            return;
        }
        this._logService.debug("sending binary \"" + data + "\"", function () { return data.split('').map(function (e) { return e.charCodeAt(0); }); });
        this._onBinary.fire(data);
    };
    CoreService = __decorate([
        __param(1, Services_1.IBufferService),
        __param(2, Services_1.ILogService),
        __param(3, Services_1.IOptionsService)
    ], CoreService);
    return CoreService;
}(Lifecycle_1.Disposable));
exports.CoreService = CoreService;
//# sourceMappingURL=CoreService.js.map