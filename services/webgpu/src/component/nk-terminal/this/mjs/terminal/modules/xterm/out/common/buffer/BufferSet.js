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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferSet = void 0;
var Buffer_1 = require("common/buffer/Buffer");
var EventEmitter_1 = require("common/EventEmitter");
var Lifecycle_1 = require("common/Lifecycle");
var BufferSet = (function (_super) {
    __extends(BufferSet, _super);
    function BufferSet(optionsService, bufferService) {
        var _this = _super.call(this) || this;
        _this._onBufferActivate = _this.register(new EventEmitter_1.EventEmitter());
        _this._normal = new Buffer_1.Buffer(true, optionsService, bufferService);
        _this._normal.fillViewportRows();
        _this._alt = new Buffer_1.Buffer(false, optionsService, bufferService);
        _this._activeBuffer = _this._normal;
        _this.setupTabStops();
        return _this;
    }
    Object.defineProperty(BufferSet.prototype, "onBufferActivate", {
        get: function () { return this._onBufferActivate.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BufferSet.prototype, "alt", {
        get: function () {
            return this._alt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BufferSet.prototype, "active", {
        get: function () {
            return this._activeBuffer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BufferSet.prototype, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: false,
        configurable: true
    });
    BufferSet.prototype.activateNormalBuffer = function () {
        if (this._activeBuffer === this._normal) {
            return;
        }
        this._normal.x = this._alt.x;
        this._normal.y = this._alt.y;
        this._alt.clear();
        this._activeBuffer = this._normal;
        this._onBufferActivate.fire({
            activeBuffer: this._normal,
            inactiveBuffer: this._alt
        });
    };
    BufferSet.prototype.activateAltBuffer = function (fillAttr) {
        if (this._activeBuffer === this._alt) {
            return;
        }
        this._alt.fillViewportRows(fillAttr);
        this._alt.x = this._normal.x;
        this._alt.y = this._normal.y;
        this._activeBuffer = this._alt;
        this._onBufferActivate.fire({
            activeBuffer: this._alt,
            inactiveBuffer: this._normal
        });
    };
    BufferSet.prototype.resize = function (newCols, newRows) {
        this._normal.resize(newCols, newRows);
        this._alt.resize(newCols, newRows);
    };
    BufferSet.prototype.setupTabStops = function (i) {
        this._normal.setupTabStops(i);
        this._alt.setupTabStops(i);
    };
    return BufferSet;
}(Lifecycle_1.Disposable));
exports.BufferSet = BufferSet;
//# sourceMappingURL=BufferSet.js.map