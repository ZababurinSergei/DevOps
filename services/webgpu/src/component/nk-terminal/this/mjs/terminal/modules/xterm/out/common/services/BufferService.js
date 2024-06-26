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
exports.BufferService = exports.MINIMUM_ROWS = exports.MINIMUM_COLS = void 0;
var Services_1 = require("common/services/Services");
var BufferSet_1 = require("common/buffer/BufferSet");
var EventEmitter_1 = require("common/EventEmitter");
var Lifecycle_1 = require("common/Lifecycle");
exports.MINIMUM_COLS = 2;
exports.MINIMUM_ROWS = 1;
var BufferService = (function (_super) {
    __extends(BufferService, _super);
    function BufferService(_optionsService) {
        var _this = _super.call(this) || this;
        _this._optionsService = _optionsService;
        _this.isUserScrolling = false;
        _this._onResize = new EventEmitter_1.EventEmitter();
        _this.cols = Math.max(_optionsService.options.cols, exports.MINIMUM_COLS);
        _this.rows = Math.max(_optionsService.options.rows, exports.MINIMUM_ROWS);
        _this.buffers = new BufferSet_1.BufferSet(_optionsService, _this);
        return _this;
    }
    Object.defineProperty(BufferService.prototype, "onResize", {
        get: function () { return this._onResize.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BufferService.prototype, "buffer", {
        get: function () { return this.buffers.active; },
        enumerable: false,
        configurable: true
    });
    BufferService.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.buffers.dispose();
    };
    BufferService.prototype.resize = function (cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.buffers.resize(cols, rows);
        this.buffers.setupTabStops(this.cols);
        this._onResize.fire({ cols: cols, rows: rows });
    };
    BufferService.prototype.reset = function () {
        this.buffers.dispose();
        this.buffers = new BufferSet_1.BufferSet(this._optionsService, this);
        this.isUserScrolling = false;
    };
    BufferService = __decorate([
        __param(0, Services_1.IOptionsService)
    ], BufferService);
    return BufferService;
}(Lifecycle_1.Disposable));
exports.BufferService = BufferService;
//# sourceMappingURL=BufferService.js.map