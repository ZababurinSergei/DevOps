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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreMouseService = void 0;
var Services_1 = require("common/services/Services");
var EventEmitter_1 = require("common/EventEmitter");
var DEFAULT_PROTOCOLS = {
    NONE: {
        events: 0,
        restrict: function () { return false; }
    },
    X10: {
        events: 1,
        restrict: function (e) {
            if (e.button === 4 || e.action !== 1) {
                return false;
            }
            e.ctrl = false;
            e.alt = false;
            e.shift = false;
            return true;
        }
    },
    VT200: {
        events: 1 | 2 | 16,
        restrict: function (e) {
            if (e.action === 32) {
                return false;
            }
            return true;
        }
    },
    DRAG: {
        events: 1 | 2 | 16 | 4,
        restrict: function (e) {
            if (e.action === 32 && e.button === 3) {
                return false;
            }
            return true;
        }
    },
    ANY: {
        events: 1 | 2 | 16
            | 4 | 8,
        restrict: function (e) { return true; }
    }
};
function eventCode(e, isSGR) {
    var code = (e.ctrl ? 16 : 0) | (e.shift ? 4 : 0) | (e.alt ? 8 : 0);
    if (e.button === 4) {
        code |= 64;
        code |= e.action;
    }
    else {
        code |= e.button & 3;
        if (e.button & 4) {
            code |= 64;
        }
        if (e.button & 8) {
            code |= 128;
        }
        if (e.action === 32) {
            code |= 32;
        }
        else if (e.action === 0 && !isSGR) {
            code |= 3;
        }
    }
    return code;
}
var S = String.fromCharCode;
var DEFAULT_ENCODINGS = {
    DEFAULT: function (e) {
        var params = [eventCode(e, false) + 32, e.col + 32, e.row + 32];
        if (params[0] > 255 || params[1] > 255 || params[2] > 255) {
            return '';
        }
        return "\u001B[M" + S(params[0]) + S(params[1]) + S(params[2]);
    },
    SGR: function (e) {
        var final = (e.action === 0 && e.button !== 4) ? 'm' : 'M';
        return "\u001B[<" + eventCode(e, true) + ";" + e.col + ";" + e.row + final;
    }
};
var CoreMouseService = (function () {
    function CoreMouseService(_bufferService, _coreService) {
        this._bufferService = _bufferService;
        this._coreService = _coreService;
        this._protocols = {};
        this._encodings = {};
        this._activeProtocol = '';
        this._activeEncoding = '';
        this._onProtocolChange = new EventEmitter_1.EventEmitter();
        this._lastEvent = null;
        for (var _i = 0, _a = Object.keys(DEFAULT_PROTOCOLS); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this.addProtocol(name_1, DEFAULT_PROTOCOLS[name_1]);
        }
        for (var _b = 0, _c = Object.keys(DEFAULT_ENCODINGS); _b < _c.length; _b++) {
            var name_2 = _c[_b];
            this.addEncoding(name_2, DEFAULT_ENCODINGS[name_2]);
        }
        this.reset();
    }
    CoreMouseService.prototype.addProtocol = function (name, protocol) {
        this._protocols[name] = protocol;
    };
    CoreMouseService.prototype.addEncoding = function (name, encoding) {
        this._encodings[name] = encoding;
    };
    Object.defineProperty(CoreMouseService.prototype, "activeProtocol", {
        get: function () {
            return this._activeProtocol;
        },
        set: function (name) {
            if (!this._protocols[name]) {
                throw new Error("unknown protocol \"" + name + "\"");
            }
            this._activeProtocol = name;
            this._onProtocolChange.fire(this._protocols[name].events);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreMouseService.prototype, "areMouseEventsActive", {
        get: function () {
            return this._protocols[this._activeProtocol].events !== 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreMouseService.prototype, "activeEncoding", {
        get: function () {
            return this._activeEncoding;
        },
        set: function (name) {
            if (!this._encodings[name]) {
                throw new Error("unknown encoding \"" + name + "\"");
            }
            this._activeEncoding = name;
        },
        enumerable: false,
        configurable: true
    });
    CoreMouseService.prototype.reset = function () {
        this.activeProtocol = 'NONE';
        this.activeEncoding = 'DEFAULT';
        this._lastEvent = null;
    };
    Object.defineProperty(CoreMouseService.prototype, "onProtocolChange", {
        get: function () {
            return this._onProtocolChange.event;
        },
        enumerable: false,
        configurable: true
    });
    CoreMouseService.prototype.triggerMouseEvent = function (e) {
        if (e.col < 0 || e.col >= this._bufferService.cols
            || e.row < 0 || e.row >= this._bufferService.rows) {
            return false;
        }
        if (e.button === 4 && e.action === 32) {
            return false;
        }
        if (e.button === 3 && e.action !== 32) {
            return false;
        }
        if (e.button !== 4 && (e.action === 2 || e.action === 3)) {
            return false;
        }
        e.col++;
        e.row++;
        if (e.action === 32 && this._lastEvent && this._compareEvents(this._lastEvent, e)) {
            return false;
        }
        if (!this._protocols[this._activeProtocol].restrict(e)) {
            return false;
        }
        var report = this._encodings[this._activeEncoding](e);
        if (report) {
            if (this._activeEncoding === 'DEFAULT') {
                this._coreService.triggerBinaryEvent(report);
            }
            else {
                this._coreService.triggerDataEvent(report, true);
            }
        }
        this._lastEvent = e;
        return true;
    };
    CoreMouseService.prototype.explainEvents = function (events) {
        return {
            down: !!(events & 1),
            up: !!(events & 2),
            drag: !!(events & 4),
            move: !!(events & 8),
            wheel: !!(events & 16)
        };
    };
    CoreMouseService.prototype._compareEvents = function (e1, e2) {
        if (e1.col !== e2.col)
            return false;
        if (e1.row !== e2.row)
            return false;
        if (e1.button !== e2.button)
            return false;
        if (e1.action !== e2.action)
            return false;
        if (e1.ctrl !== e2.ctrl)
            return false;
        if (e1.alt !== e2.alt)
            return false;
        if (e1.shift !== e2.shift)
            return false;
        return true;
    };
    CoreMouseService = __decorate([
        __param(0, Services_1.IBufferService),
        __param(1, Services_1.ICoreService)
    ], CoreMouseService);
    return CoreMouseService;
}());
exports.CoreMouseService = CoreMouseService;
//# sourceMappingURL=CoreMouseService.js.map