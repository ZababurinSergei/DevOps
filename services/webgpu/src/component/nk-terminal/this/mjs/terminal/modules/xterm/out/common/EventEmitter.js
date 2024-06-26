"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardEvent = exports.EventEmitter = void 0;
var EventEmitter = (function () {
    function EventEmitter() {
        this._listeners = [];
        this._disposed = false;
    }
    Object.defineProperty(EventEmitter.prototype, "event", {
        get: function () {
            var _this = this;
            if (!this._event) {
                this._event = function (listener) {
                    _this._listeners.push(listener);
                    var disposable = {
                        dispose: function () {
                            if (!_this._disposed) {
                                for (var i = 0; i < _this._listeners.length; i++) {
                                    if (_this._listeners[i] === listener) {
                                        _this._listeners.splice(i, 1);
                                        return;
                                    }
                                }
                            }
                        }
                    };
                    return disposable;
                };
            }
            return this._event;
        },
        enumerable: false,
        configurable: true
    });
    EventEmitter.prototype.fire = function (arg1, arg2) {
        var queue = [];
        for (var i = 0; i < this._listeners.length; i++) {
            queue.push(this._listeners[i]);
        }
        for (var i = 0; i < queue.length; i++) {
            queue[i].call(undefined, arg1, arg2);
        }
    };
    EventEmitter.prototype.dispose = function () {
        if (this._listeners) {
            this._listeners.length = 0;
        }
        this._disposed = true;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
function forwardEvent(from, to) {
    return from(function (e) { return to.fire(e); });
}
exports.forwardEvent = forwardEvent;
//# sourceMappingURL=EventEmitter.js.map