"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OscHandler = exports.OscParser = void 0;
var Constants_1 = require("common/parser/Constants");
var TextDecoder_1 = require("common/input/TextDecoder");
var OscParser = (function () {
    function OscParser() {
        this._state = 0;
        this._id = -1;
        this._handlers = Object.create(null);
        this._handlerFb = function () { };
    }
    OscParser.prototype.addHandler = function (ident, handler) {
        if (this._handlers[ident] === undefined) {
            this._handlers[ident] = [];
        }
        var handlerList = this._handlers[ident];
        handlerList.push(handler);
        return {
            dispose: function () {
                var handlerIndex = handlerList.indexOf(handler);
                if (handlerIndex !== -1) {
                    handlerList.splice(handlerIndex, 1);
                }
            }
        };
    };
    OscParser.prototype.setHandler = function (ident, handler) {
        this._handlers[ident] = [handler];
    };
    OscParser.prototype.clearHandler = function (ident) {
        if (this._handlers[ident])
            delete this._handlers[ident];
    };
    OscParser.prototype.setHandlerFallback = function (handler) {
        this._handlerFb = handler;
    };
    OscParser.prototype.dispose = function () {
        this._handlers = Object.create(null);
        this._handlerFb = function () { };
    };
    OscParser.prototype.reset = function () {
        if (this._state === 2) {
            this.end(false);
        }
        this._id = -1;
        this._state = 0;
    };
    OscParser.prototype._start = function () {
        var handlers = this._handlers[this._id];
        if (!handlers) {
            this._handlerFb(this._id, 'START');
        }
        else {
            for (var j = handlers.length - 1; j >= 0; j--) {
                handlers[j].start();
            }
        }
    };
    OscParser.prototype._put = function (data, start, end) {
        var handlers = this._handlers[this._id];
        if (!handlers) {
            this._handlerFb(this._id, 'PUT', TextDecoder_1.utf32ToString(data, start, end));
        }
        else {
            for (var j = handlers.length - 1; j >= 0; j--) {
                handlers[j].put(data, start, end);
            }
        }
    };
    OscParser.prototype._end = function (success) {
        var handlers = this._handlers[this._id];
        if (!handlers) {
            this._handlerFb(this._id, 'END', success);
        }
        else {
            var j = handlers.length - 1;
            for (; j >= 0; j--) {
                if (handlers[j].end(success) !== false) {
                    break;
                }
            }
            j--;
            for (; j >= 0; j--) {
                handlers[j].end(false);
            }
        }
    };
    OscParser.prototype.start = function () {
        this.reset();
        this._id = -1;
        this._state = 1;
    };
    OscParser.prototype.put = function (data, start, end) {
        if (this._state === 3) {
            return;
        }
        if (this._state === 1) {
            while (start < end) {
                var code = data[start++];
                if (code === 0x3b) {
                    this._state = 2;
                    this._start();
                    break;
                }
                if (code < 0x30 || 0x39 < code) {
                    this._state = 3;
                    return;
                }
                if (this._id === -1) {
                    this._id = 0;
                }
                this._id = this._id * 10 + code - 48;
            }
        }
        if (this._state === 2 && end - start > 0) {
            this._put(data, start, end);
        }
    };
    OscParser.prototype.end = function (success) {
        if (this._state === 0) {
            return;
        }
        if (this._state !== 3) {
            if (this._state === 1) {
                this._start();
            }
            this._end(success);
        }
        this._id = -1;
        this._state = 0;
    };
    return OscParser;
}());
exports.OscParser = OscParser;
var OscHandler = (function () {
    function OscHandler(_handler) {
        this._handler = _handler;
        this._data = '';
        this._hitLimit = false;
    }
    OscHandler.prototype.start = function () {
        this._data = '';
        this._hitLimit = false;
    };
    OscHandler.prototype.put = function (data, start, end) {
        if (this._hitLimit) {
            return;
        }
        this._data += TextDecoder_1.utf32ToString(data, start, end);
        if (this._data.length > Constants_1.PAYLOAD_LIMIT) {
            this._data = '';
            this._hitLimit = true;
        }
    };
    OscHandler.prototype.end = function (success) {
        var ret;
        if (this._hitLimit) {
            ret = false;
        }
        else if (success) {
            ret = this._handler(this._data);
        }
        this._data = '';
        this._hitLimit = false;
        return ret;
    };
    return OscHandler;
}());
exports.OscHandler = OscHandler;
//# sourceMappingURL=OscParser.js.map