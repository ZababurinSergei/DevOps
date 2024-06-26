"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisposeArrayDisposable = exports.disposeArray = exports.Disposable = void 0;
var Disposable = (function () {
    function Disposable() {
        this._disposables = [];
        this._isDisposed = false;
    }
    Disposable.prototype.dispose = function () {
        this._isDisposed = true;
        for (var _i = 0, _a = this._disposables; _i < _a.length; _i++) {
            var d = _a[_i];
            d.dispose();
        }
        this._disposables.length = 0;
    };
    Disposable.prototype.register = function (d) {
        this._disposables.push(d);
        return d;
    };
    Disposable.prototype.unregister = function (d) {
        var index = this._disposables.indexOf(d);
        if (index !== -1) {
            this._disposables.splice(index, 1);
        }
    };
    return Disposable;
}());
exports.Disposable = Disposable;
function disposeArray(disposables) {
    for (var _i = 0, disposables_1 = disposables; _i < disposables_1.length; _i++) {
        var d = disposables_1[_i];
        d.dispose();
    }
    disposables.length = 0;
}
exports.disposeArray = disposeArray;
function getDisposeArrayDisposable(array) {
    return { dispose: function () { return disposeArray(array); } };
}
exports.getDisposeArrayDisposable = getDisposeArrayDisposable;
//# sourceMappingURL=Lifecycle.js.map