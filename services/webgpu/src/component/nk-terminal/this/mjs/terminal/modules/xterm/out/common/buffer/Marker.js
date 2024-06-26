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
exports.Marker = void 0;
var EventEmitter_1 = require("common/EventEmitter");
var Lifecycle_1 = require("common/Lifecycle");
var Marker = (function (_super) {
    __extends(Marker, _super);
    function Marker(line) {
        var _this = _super.call(this) || this;
        _this.line = line;
        _this._id = Marker._nextId++;
        _this.isDisposed = false;
        _this._onDispose = new EventEmitter_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(Marker.prototype, "id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Marker.prototype, "onDispose", {
        get: function () { return this._onDispose.event; },
        enumerable: false,
        configurable: true
    });
    Marker.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        this.line = -1;
        this._onDispose.fire();
    };
    Marker._nextId = 1;
    return Marker;
}(Lifecycle_1.Disposable));
exports.Marker = Marker;
//# sourceMappingURL=Marker.js.map