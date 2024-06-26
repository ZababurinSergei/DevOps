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
exports.EscapeSequenceParser = exports.VT500_TRANSITION_TABLE = exports.TransitionTable = void 0;
var Lifecycle_1 = require("common/Lifecycle");
var TypedArrayUtils_1 = require("common/TypedArrayUtils");
var Params_1 = require("common/parser/Params");
var OscParser_1 = require("common/parser/OscParser");
var DcsParser_1 = require("common/parser/DcsParser");
var TransitionTable = (function () {
    function TransitionTable(length) {
        this.table = new Uint8Array(length);
    }
    TransitionTable.prototype.setDefault = function (action, next) {
        TypedArrayUtils_1.fill(this.table, action << 4 | next);
    };
    TransitionTable.prototype.add = function (code, state, action, next) {
        this.table[state << 8 | code] = action << 4 | next;
    };
    TransitionTable.prototype.addMany = function (codes, state, action, next) {
        for (var i = 0; i < codes.length; i++) {
            this.table[state << 8 | codes[i]] = action << 4 | next;
        }
    };
    return TransitionTable;
}());
exports.TransitionTable = TransitionTable;
var NON_ASCII_PRINTABLE = 0xA0;
exports.VT500_TRANSITION_TABLE = (function () {
    var table = new TransitionTable(4095);
    var BYTE_VALUES = 256;
    var blueprint = Array.apply(null, Array(BYTE_VALUES)).map(function (unused, i) { return i; });
    var r = function (start, end) { return blueprint.slice(start, end); };
    var PRINTABLES = r(0x20, 0x7f);
    var EXECUTABLES = r(0x00, 0x18);
    EXECUTABLES.push(0x19);
    EXECUTABLES.push.apply(EXECUTABLES, r(0x1c, 0x20));
    var states = r(0, 13 + 1);
    var state;
    table.setDefault(1, 0);
    table.addMany(PRINTABLES, 0, 2, 0);
    for (state in states) {
        table.addMany([0x18, 0x1a, 0x99, 0x9a], state, 3, 0);
        table.addMany(r(0x80, 0x90), state, 3, 0);
        table.addMany(r(0x90, 0x98), state, 3, 0);
        table.add(0x9c, state, 0, 0);
        table.add(0x1b, state, 11, 1);
        table.add(0x9d, state, 4, 8);
        table.addMany([0x98, 0x9e, 0x9f], state, 0, 7);
        table.add(0x9b, state, 11, 3);
        table.add(0x90, state, 11, 9);
    }
    table.addMany(EXECUTABLES, 0, 3, 0);
    table.addMany(EXECUTABLES, 1, 3, 1);
    table.add(0x7f, 1, 0, 1);
    table.addMany(EXECUTABLES, 8, 0, 8);
    table.addMany(EXECUTABLES, 3, 3, 3);
    table.add(0x7f, 3, 0, 3);
    table.addMany(EXECUTABLES, 4, 3, 4);
    table.add(0x7f, 4, 0, 4);
    table.addMany(EXECUTABLES, 6, 3, 6);
    table.addMany(EXECUTABLES, 5, 3, 5);
    table.add(0x7f, 5, 0, 5);
    table.addMany(EXECUTABLES, 2, 3, 2);
    table.add(0x7f, 2, 0, 2);
    table.add(0x5d, 1, 4, 8);
    table.addMany(PRINTABLES, 8, 5, 8);
    table.add(0x7f, 8, 5, 8);
    table.addMany([0x9c, 0x1b, 0x18, 0x1a, 0x07], 8, 6, 0);
    table.addMany(r(0x1c, 0x20), 8, 0, 8);
    table.addMany([0x58, 0x5e, 0x5f], 1, 0, 7);
    table.addMany(PRINTABLES, 7, 0, 7);
    table.addMany(EXECUTABLES, 7, 0, 7);
    table.add(0x9c, 7, 0, 0);
    table.add(0x7f, 7, 0, 7);
    table.add(0x5b, 1, 11, 3);
    table.addMany(r(0x40, 0x7f), 3, 7, 0);
    table.addMany(r(0x30, 0x3c), 3, 8, 4);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], 3, 9, 4);
    table.addMany(r(0x30, 0x3c), 4, 8, 4);
    table.addMany(r(0x40, 0x7f), 4, 7, 0);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], 4, 0, 6);
    table.addMany(r(0x20, 0x40), 6, 0, 6);
    table.add(0x7f, 6, 0, 6);
    table.addMany(r(0x40, 0x7f), 6, 0, 0);
    table.addMany(r(0x20, 0x30), 3, 9, 5);
    table.addMany(r(0x20, 0x30), 5, 9, 5);
    table.addMany(r(0x30, 0x40), 5, 0, 6);
    table.addMany(r(0x40, 0x7f), 5, 7, 0);
    table.addMany(r(0x20, 0x30), 4, 9, 5);
    table.addMany(r(0x20, 0x30), 1, 9, 2);
    table.addMany(r(0x20, 0x30), 2, 9, 2);
    table.addMany(r(0x30, 0x7f), 2, 10, 0);
    table.addMany(r(0x30, 0x50), 1, 10, 0);
    table.addMany(r(0x51, 0x58), 1, 10, 0);
    table.addMany([0x59, 0x5a, 0x5c], 1, 10, 0);
    table.addMany(r(0x60, 0x7f), 1, 10, 0);
    table.add(0x50, 1, 11, 9);
    table.addMany(EXECUTABLES, 9, 0, 9);
    table.add(0x7f, 9, 0, 9);
    table.addMany(r(0x1c, 0x20), 9, 0, 9);
    table.addMany(r(0x20, 0x30), 9, 9, 12);
    table.addMany(r(0x30, 0x3c), 9, 8, 10);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], 9, 9, 10);
    table.addMany(EXECUTABLES, 11, 0, 11);
    table.addMany(r(0x20, 0x80), 11, 0, 11);
    table.addMany(r(0x1c, 0x20), 11, 0, 11);
    table.addMany(EXECUTABLES, 10, 0, 10);
    table.add(0x7f, 10, 0, 10);
    table.addMany(r(0x1c, 0x20), 10, 0, 10);
    table.addMany(r(0x30, 0x3c), 10, 8, 10);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], 10, 0, 11);
    table.addMany(r(0x20, 0x30), 10, 9, 12);
    table.addMany(EXECUTABLES, 12, 0, 12);
    table.add(0x7f, 12, 0, 12);
    table.addMany(r(0x1c, 0x20), 12, 0, 12);
    table.addMany(r(0x20, 0x30), 12, 9, 12);
    table.addMany(r(0x30, 0x40), 12, 0, 11);
    table.addMany(r(0x40, 0x7f), 12, 12, 13);
    table.addMany(r(0x40, 0x7f), 10, 12, 13);
    table.addMany(r(0x40, 0x7f), 9, 12, 13);
    table.addMany(EXECUTABLES, 13, 13, 13);
    table.addMany(PRINTABLES, 13, 13, 13);
    table.add(0x7f, 13, 0, 13);
    table.addMany([0x1b, 0x9c, 0x18, 0x1a], 13, 14, 0);
    table.add(NON_ASCII_PRINTABLE, 0, 2, 0);
    table.add(NON_ASCII_PRINTABLE, 8, 5, 8);
    table.add(NON_ASCII_PRINTABLE, 6, 0, 6);
    table.add(NON_ASCII_PRINTABLE, 11, 0, 11);
    table.add(NON_ASCII_PRINTABLE, 13, 13, 13);
    return table;
})();
var EscapeSequenceParser = (function (_super) {
    __extends(EscapeSequenceParser, _super);
    function EscapeSequenceParser(_transitions) {
        if (_transitions === void 0) { _transitions = exports.VT500_TRANSITION_TABLE; }
        var _this = _super.call(this) || this;
        _this._transitions = _transitions;
        _this.initialState = 0;
        _this.currentState = _this.initialState;
        _this._params = new Params_1.Params();
        _this._params.addParam(0);
        _this._collect = 0;
        _this.precedingCodepoint = 0;
        _this._printHandlerFb = function (data, start, end) { };
        _this._executeHandlerFb = function (code) { };
        _this._csiHandlerFb = function (ident, params) { };
        _this._escHandlerFb = function (ident) { };
        _this._errorHandlerFb = function (state) { return state; };
        _this._printHandler = _this._printHandlerFb;
        _this._executeHandlers = Object.create(null);
        _this._csiHandlers = Object.create(null);
        _this._escHandlers = Object.create(null);
        _this._oscParser = new OscParser_1.OscParser();
        _this._dcsParser = new DcsParser_1.DcsParser();
        _this._errorHandler = _this._errorHandlerFb;
        _this.setEscHandler({ final: '\\' }, function () { });
        return _this;
    }
    EscapeSequenceParser.prototype._identifier = function (id, finalRange) {
        if (finalRange === void 0) { finalRange = [0x40, 0x7e]; }
        var res = 0;
        if (id.prefix) {
            if (id.prefix.length > 1) {
                throw new Error('only one byte as prefix supported');
            }
            res = id.prefix.charCodeAt(0);
            if (res && 0x3c > res || res > 0x3f) {
                throw new Error('prefix must be in range 0x3c .. 0x3f');
            }
        }
        if (id.intermediates) {
            if (id.intermediates.length > 2) {
                throw new Error('only two bytes as intermediates are supported');
            }
            for (var i = 0; i < id.intermediates.length; ++i) {
                var intermediate = id.intermediates.charCodeAt(i);
                if (0x20 > intermediate || intermediate > 0x2f) {
                    throw new Error('intermediate must be in range 0x20 .. 0x2f');
                }
                res <<= 8;
                res |= intermediate;
            }
        }
        if (id.final.length !== 1) {
            throw new Error('final must be a single byte');
        }
        var finalCode = id.final.charCodeAt(0);
        if (finalRange[0] > finalCode || finalCode > finalRange[1]) {
            throw new Error("final must be in range " + finalRange[0] + " .. " + finalRange[1]);
        }
        res <<= 8;
        res |= finalCode;
        return res;
    };
    EscapeSequenceParser.prototype.identToString = function (ident) {
        var res = [];
        while (ident) {
            res.push(String.fromCharCode(ident & 0xFF));
            ident >>= 8;
        }
        return res.reverse().join('');
    };
    EscapeSequenceParser.prototype.dispose = function () {
        this._csiHandlers = Object.create(null);
        this._executeHandlers = Object.create(null);
        this._escHandlers = Object.create(null);
        this._oscParser.dispose();
        this._dcsParser.dispose();
    };
    EscapeSequenceParser.prototype.setPrintHandler = function (handler) {
        this._printHandler = handler;
    };
    EscapeSequenceParser.prototype.clearPrintHandler = function () {
        this._printHandler = this._printHandlerFb;
    };
    EscapeSequenceParser.prototype.addEscHandler = function (id, handler) {
        var ident = this._identifier(id, [0x30, 0x7e]);
        if (this._escHandlers[ident] === undefined) {
            this._escHandlers[ident] = [];
        }
        var handlerList = this._escHandlers[ident];
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
    EscapeSequenceParser.prototype.setEscHandler = function (id, handler) {
        this._escHandlers[this._identifier(id, [0x30, 0x7e])] = [handler];
    };
    EscapeSequenceParser.prototype.clearEscHandler = function (id) {
        if (this._escHandlers[this._identifier(id, [0x30, 0x7e])])
            delete this._escHandlers[this._identifier(id, [0x30, 0x7e])];
    };
    EscapeSequenceParser.prototype.setEscHandlerFallback = function (handler) {
        this._escHandlerFb = handler;
    };
    EscapeSequenceParser.prototype.setExecuteHandler = function (flag, handler) {
        this._executeHandlers[flag.charCodeAt(0)] = handler;
    };
    EscapeSequenceParser.prototype.clearExecuteHandler = function (flag) {
        if (this._executeHandlers[flag.charCodeAt(0)])
            delete this._executeHandlers[flag.charCodeAt(0)];
    };
    EscapeSequenceParser.prototype.setExecuteHandlerFallback = function (handler) {
        this._executeHandlerFb = handler;
    };
    EscapeSequenceParser.prototype.addCsiHandler = function (id, handler) {
        var ident = this._identifier(id);
        if (this._csiHandlers[ident] === undefined) {
            this._csiHandlers[ident] = [];
        }
        var handlerList = this._csiHandlers[ident];
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
    EscapeSequenceParser.prototype.setCsiHandler = function (id, handler) {
        this._csiHandlers[this._identifier(id)] = [handler];
    };
    EscapeSequenceParser.prototype.clearCsiHandler = function (id) {
        if (this._csiHandlers[this._identifier(id)])
            delete this._csiHandlers[this._identifier(id)];
    };
    EscapeSequenceParser.prototype.setCsiHandlerFallback = function (callback) {
        this._csiHandlerFb = callback;
    };
    EscapeSequenceParser.prototype.addDcsHandler = function (id, handler) {
        return this._dcsParser.addHandler(this._identifier(id), handler);
    };
    EscapeSequenceParser.prototype.setDcsHandler = function (id, handler) {
        this._dcsParser.setHandler(this._identifier(id), handler);
    };
    EscapeSequenceParser.prototype.clearDcsHandler = function (id) {
        this._dcsParser.clearHandler(this._identifier(id));
    };
    EscapeSequenceParser.prototype.setDcsHandlerFallback = function (handler) {
        this._dcsParser.setHandlerFallback(handler);
    };
    EscapeSequenceParser.prototype.addOscHandler = function (ident, handler) {
        return this._oscParser.addHandler(ident, handler);
    };
    EscapeSequenceParser.prototype.setOscHandler = function (ident, handler) {
        this._oscParser.setHandler(ident, handler);
    };
    EscapeSequenceParser.prototype.clearOscHandler = function (ident) {
        this._oscParser.clearHandler(ident);
    };
    EscapeSequenceParser.prototype.setOscHandlerFallback = function (handler) {
        this._oscParser.setHandlerFallback(handler);
    };
    EscapeSequenceParser.prototype.setErrorHandler = function (callback) {
        this._errorHandler = callback;
    };
    EscapeSequenceParser.prototype.clearErrorHandler = function () {
        this._errorHandler = this._errorHandlerFb;
    };
    EscapeSequenceParser.prototype.reset = function () {
        this.currentState = this.initialState;
        this._oscParser.reset();
        this._dcsParser.reset();
        this._params.reset();
        this._params.addParam(0);
        this._collect = 0;
        this.precedingCodepoint = 0;
    };
    EscapeSequenceParser.prototype.parse = function (data, length) {
        var code = 0;
        var transition = 0;
        var currentState = this.currentState;
        var osc = this._oscParser;
        var dcs = this._dcsParser;
        var collect = this._collect;
        var params = this._params;
        var table = this._transitions.table;
        for (var i = 0; i < length; ++i) {
            code = data[i];
            transition = table[currentState << 8 | (code < 0xa0 ? code : NON_ASCII_PRINTABLE)];
            switch (transition >> 4) {
                case 2:
                    for (var j_1 = i + 1;; ++j_1) {
                        if (j_1 >= length || (code = data[j_1]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j_1);
                            i = j_1 - 1;
                            break;
                        }
                        if (++j_1 >= length || (code = data[j_1]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j_1);
                            i = j_1 - 1;
                            break;
                        }
                        if (++j_1 >= length || (code = data[j_1]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j_1);
                            i = j_1 - 1;
                            break;
                        }
                        if (++j_1 >= length || (code = data[j_1]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j_1);
                            i = j_1 - 1;
                            break;
                        }
                    }
                    break;
                case 3:
                    if (this._executeHandlers[code])
                        this._executeHandlers[code]();
                    else
                        this._executeHandlerFb(code);
                    this.precedingCodepoint = 0;
                    break;
                case 0:
                    break;
                case 1:
                    var inject = this._errorHandler({
                        position: i,
                        code: code,
                        currentState: currentState,
                        collect: collect,
                        params: params,
                        abort: false
                    });
                    if (inject.abort)
                        return;
                    break;
                case 7:
                    var handlers = this._csiHandlers[collect << 8 | code];
                    var j = handlers ? handlers.length - 1 : -1;
                    for (; j >= 0; j--) {
                        if (handlers[j](params) !== false) {
                            break;
                        }
                    }
                    if (j < 0) {
                        this._csiHandlerFb(collect << 8 | code, params);
                    }
                    this.precedingCodepoint = 0;
                    break;
                case 8:
                    do {
                        switch (code) {
                            case 0x3b:
                                params.addParam(0);
                                break;
                            case 0x3a:
                                params.addSubParam(-1);
                                break;
                            default:
                                params.addDigit(code - 48);
                        }
                    } while (++i < length && (code = data[i]) > 0x2f && code < 0x3c);
                    i--;
                    break;
                case 9:
                    collect <<= 8;
                    collect |= code;
                    break;
                case 10:
                    var handlersEsc = this._escHandlers[collect << 8 | code];
                    var jj = handlersEsc ? handlersEsc.length - 1 : -1;
                    for (; jj >= 0; jj--) {
                        if (handlersEsc[jj]() !== false) {
                            break;
                        }
                    }
                    if (jj < 0) {
                        this._escHandlerFb(collect << 8 | code);
                    }
                    this.precedingCodepoint = 0;
                    break;
                case 11:
                    params.reset();
                    params.addParam(0);
                    collect = 0;
                    break;
                case 12:
                    dcs.hook(collect << 8 | code, params);
                    break;
                case 13:
                    for (var j_2 = i + 1;; ++j_2) {
                        if (j_2 >= length || (code = data[j_2]) === 0x18 || code === 0x1a || code === 0x1b || (code > 0x7f && code < NON_ASCII_PRINTABLE)) {
                            dcs.put(data, i, j_2);
                            i = j_2 - 1;
                            break;
                        }
                    }
                    break;
                case 14:
                    dcs.unhook(code !== 0x18 && code !== 0x1a);
                    if (code === 0x1b)
                        transition |= 1;
                    params.reset();
                    params.addParam(0);
                    collect = 0;
                    this.precedingCodepoint = 0;
                    break;
                case 4:
                    osc.start();
                    break;
                case 5:
                    for (var j_3 = i + 1;; j_3++) {
                        if (j_3 >= length || (code = data[j_3]) < 0x20 || (code > 0x7f && code <= 0x9f)) {
                            osc.put(data, i, j_3);
                            i = j_3 - 1;
                            break;
                        }
                    }
                    break;
                case 6:
                    osc.end(code !== 0x18 && code !== 0x1a);
                    if (code === 0x1b)
                        transition |= 1;
                    params.reset();
                    params.addParam(0);
                    collect = 0;
                    this.precedingCodepoint = 0;
                    break;
            }
            currentState = transition & 15;
        }
        this._collect = collect;
        this.currentState = currentState;
    };
    return EscapeSequenceParser;
}(Lifecycle_1.Disposable));
exports.EscapeSequenceParser = EscapeSequenceParser;
//# sourceMappingURL=EscapeSequenceParser.js.map