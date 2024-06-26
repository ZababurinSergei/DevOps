"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcsHandler = exports.DcsParser = void 0;
var TextDecoder_1 = require("common/input/TextDecoder");
var Params_1 = require("common/parser/Params");
var Constants_1 = require("common/parser/Constants");
var EMPTY_HANDLERS = [];
var DcsParser = (function () {
    function DcsParser() {
        this._handlers = Object.create(null);
        this._active = EMPTY_HANDLERS;
        this._ident = 0;
        this._handlerFb = function () { };
    }
    DcsParser.prototype.dispose = function () {
        this._handlers = Object.create(null);
        this._handlerFb = function () { };
    };
    DcsParser.prototype.addHandler = function (ident, handler) {
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
    DcsParser.prototype.setHandler = function (ident, handler) {
        this._handlers[ident] = [handler];
    };
    DcsParser.prototype.clearHandler = function (ident) {
        if (this._handlers[ident])
            delete this._handlers[ident];
    };
    DcsParser.prototype.setHandlerFallback = function (handler) {
        this._handlerFb = handler;
    };
    DcsParser.prototype.reset = function () {
        if (this._active.length) {
            this.unhook(false);
        }
        this._active = EMPTY_HANDLERS;
        this._ident = 0;
    };
    DcsParser.prototype.hook = function (ident, params) {
        this.reset();
        this._ident = ident;
        this._active = this._handlers[ident] || EMPTY_HANDLERS;
        if (!this._active.length) {
            this._handlerFb(this._ident, 'HOOK', params);
        }
        else {
            for (var j = this._active.length - 1; j >= 0; j--) {
                this._active[j].hook(params);
            }
        }
    };
    DcsParser.prototype.put = function (data, start, end) {
        if (!this._active.length) {
            this._handlerFb(this._ident, 'PUT', TextDecoder_1.utf32ToString(data, start, end));
        }
        else {
            for (var j = this._active.length - 1; j >= 0; j--) {
                this._active[j].put(data, start, end);
            }
        }
    };
    DcsParser.prototype.unhook = function (success) {
        if (!this._active.length) {
            this._handlerFb(this._ident, 'UNHOOK', success);
        }
        else {
            var j = this._active.length - 1;
            for (; j >= 0; j--) {
                if (this._active[j].unhook(success) !== false) {
                    break;
                }
            }
            j--;
            for (; j >= 0; j--) {
                this._active[j].unhook(false);
            }
        }
        this._active = EMPTY_HANDLERS;
        this._ident = 0;
    };
    return DcsParser;
}());
exports.DcsParser = DcsParser;
var DcsHandler = (function () {
    function DcsHandler(_handler) {
        this._handler = _handler;
        this._data = '';
        this._hitLimit = false;
    }
    DcsHandler.prototype.hook = function (params) {
        this._params = params.clone();
        this._data = '';
        this._hitLimit = false;
    };
    DcsHandler.prototype.put = function (data, start, end) {
        if (this._hitLimit) {
            return;
        }
        this._data += TextDecoder_1.utf32ToString(data, start, end);
        if (this._data.length > Constants_1.PAYLOAD_LIMIT) {
            this._data = '';
            this._hitLimit = true;
        }
    };
    DcsHandler.prototype.unhook = function (success) {
        var ret;
        if (this._hitLimit) {
            ret = false;
        }
        else if (success) {
            ret = this._handler(this._data, this._params || new Params_1.Params());
        }
        this._params = undefined;
        this._data = '';
        this._hitLimit = false;
        return ret;
    };
    return DcsHandler;
}());
exports.DcsHandler = DcsHandler;
//# sourceMappingURL=DcsParser.js.map