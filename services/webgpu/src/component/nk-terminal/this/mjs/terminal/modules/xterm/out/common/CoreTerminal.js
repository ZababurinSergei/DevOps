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
exports.CoreTerminal = void 0;
var Lifecycle_1 = require("common/Lifecycle");
var Services_1 = require("common/services/Services");
var InstantiationService_1 = require("common/services/InstantiationService");
var LogService_1 = require("common/services/LogService");
var BufferService_1 = require("common/services/BufferService");
var OptionsService_1 = require("common/services/OptionsService");
var CoreService_1 = require("common/services/CoreService");
var EventEmitter_1 = require("common/EventEmitter");
var CoreMouseService_1 = require("common/services/CoreMouseService");
var DirtyRowService_1 = require("common/services/DirtyRowService");
var UnicodeService_1 = require("common/services/UnicodeService");
var CharsetService_1 = require("common/services/CharsetService");
var WindowsMode_1 = require("common/WindowsMode");
var InputHandler_1 = require("common/InputHandler");
var WriteBuffer_1 = require("common/input/WriteBuffer");
var CoreTerminal = (function (_super) {
    __extends(CoreTerminal, _super);
    function CoreTerminal(options) {
        var _this = _super.call(this) || this;
        _this._onBinary = new EventEmitter_1.EventEmitter();
        _this._onData = new EventEmitter_1.EventEmitter();
        _this._onLineFeed = new EventEmitter_1.EventEmitter();
        _this._onResize = new EventEmitter_1.EventEmitter();
        _this._onScroll = new EventEmitter_1.EventEmitter();
        _this._instantiationService = new InstantiationService_1.InstantiationService();
        _this.optionsService = new OptionsService_1.OptionsService(options);
        _this._instantiationService.setService(Services_1.IOptionsService, _this.optionsService);
        _this._bufferService = _this.register(_this._instantiationService.createInstance(BufferService_1.BufferService));
        _this._instantiationService.setService(Services_1.IBufferService, _this._bufferService);
        _this._logService = _this._instantiationService.createInstance(LogService_1.LogService);
        _this._instantiationService.setService(Services_1.ILogService, _this._logService);
        _this._coreService = _this.register(_this._instantiationService.createInstance(CoreService_1.CoreService, function () { return _this.scrollToBottom(); }));
        _this._instantiationService.setService(Services_1.ICoreService, _this._coreService);
        _this._coreMouseService = _this._instantiationService.createInstance(CoreMouseService_1.CoreMouseService);
        _this._instantiationService.setService(Services_1.ICoreMouseService, _this._coreMouseService);
        _this._dirtyRowService = _this._instantiationService.createInstance(DirtyRowService_1.DirtyRowService);
        _this._instantiationService.setService(Services_1.IDirtyRowService, _this._dirtyRowService);
        _this.unicodeService = _this._instantiationService.createInstance(UnicodeService_1.UnicodeService);
        _this._instantiationService.setService(Services_1.IUnicodeService, _this.unicodeService);
        _this._charsetService = _this._instantiationService.createInstance(CharsetService_1.CharsetService);
        _this._instantiationService.setService(Services_1.ICharsetService, _this._charsetService);
        _this._inputHandler = new InputHandler_1.InputHandler(_this._bufferService, _this._charsetService, _this._coreService, _this._dirtyRowService, _this._logService, _this.optionsService, _this._coreMouseService, _this.unicodeService);
        _this.register(EventEmitter_1.forwardEvent(_this._inputHandler.onLineFeed, _this._onLineFeed));
        _this.register(_this._inputHandler);
        _this.register(EventEmitter_1.forwardEvent(_this._bufferService.onResize, _this._onResize));
        _this.register(EventEmitter_1.forwardEvent(_this._coreService.onData, _this._onData));
        _this.register(EventEmitter_1.forwardEvent(_this._coreService.onBinary, _this._onBinary));
        _this.register(_this.optionsService.onOptionChange(function (key) { return _this._updateOptions(key); }));
        _this._writeBuffer = new WriteBuffer_1.WriteBuffer(function (data) { return _this._inputHandler.parse(data); });
        return _this;
    }
    Object.defineProperty(CoreTerminal.prototype, "onBinary", {
        get: function () { return this._onBinary.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreTerminal.prototype, "onData", {
        get: function () { return this._onData.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreTerminal.prototype, "onLineFeed", {
        get: function () { return this._onLineFeed.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreTerminal.prototype, "onResize", {
        get: function () { return this._onResize.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreTerminal.prototype, "onScroll", {
        get: function () { return this._onScroll.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreTerminal.prototype, "cols", {
        get: function () { return this._bufferService.cols; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreTerminal.prototype, "rows", {
        get: function () { return this._bufferService.rows; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreTerminal.prototype, "buffers", {
        get: function () { return this._bufferService.buffers; },
        enumerable: false,
        configurable: true
    });
    CoreTerminal.prototype.dispose = function () {
        var _a;
        if (this._isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        (_a = this._windowsMode) === null || _a === void 0 ? void 0 : _a.dispose();
        this._windowsMode = undefined;
    };
    CoreTerminal.prototype.write = function (data, callback) {
        this._writeBuffer.write(data, callback);
    };
    CoreTerminal.prototype.writeSync = function (data) {
        this._writeBuffer.writeSync(data);
    };
    CoreTerminal.prototype.resize = function (x, y) {
        if (isNaN(x) || isNaN(y)) {
            return;
        }
        x = Math.max(x, BufferService_1.MINIMUM_COLS);
        y = Math.max(y, BufferService_1.MINIMUM_ROWS);
        this._bufferService.resize(x, y);
    };
    CoreTerminal.prototype.scroll = function (eraseAttr, isWrapped) {
        if (isWrapped === void 0) { isWrapped = false; }
        var buffer = this._bufferService.buffer;
        var newLine;
        newLine = this._cachedBlankLine;
        if (!newLine || newLine.length !== this.cols || newLine.getFg(0) !== eraseAttr.fg || newLine.getBg(0) !== eraseAttr.bg) {
            newLine = buffer.getBlankLine(eraseAttr, isWrapped);
            this._cachedBlankLine = newLine;
        }
        newLine.isWrapped = isWrapped;
        var topRow = buffer.ybase + buffer.scrollTop;
        var bottomRow = buffer.ybase + buffer.scrollBottom;
        if (buffer.scrollTop === 0) {
            var willBufferBeTrimmed = buffer.lines.isFull;
            if (bottomRow === buffer.lines.length - 1) {
                if (willBufferBeTrimmed) {
                    buffer.lines.recycle().copyFrom(newLine);
                }
                else {
                    buffer.lines.push(newLine.clone());
                }
            }
            else {
                buffer.lines.splice(bottomRow + 1, 0, newLine.clone());
            }
            if (!willBufferBeTrimmed) {
                buffer.ybase++;
                if (!this._bufferService.isUserScrolling) {
                    buffer.ydisp++;
                }
            }
            else {
                if (this._bufferService.isUserScrolling) {
                    buffer.ydisp = Math.max(buffer.ydisp - 1, 0);
                }
            }
        }
        else {
            var scrollRegionHeight = bottomRow - topRow + 1;
            buffer.lines.shiftElements(topRow + 1, scrollRegionHeight - 1, -1);
            buffer.lines.set(bottomRow, newLine.clone());
        }
        if (!this._bufferService.isUserScrolling) {
            buffer.ydisp = buffer.ybase;
        }
        this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
        this._onScroll.fire(buffer.ydisp);
    };
    CoreTerminal.prototype.scrollLines = function (disp, suppressScrollEvent) {
        var buffer = this._bufferService.buffer;
        if (disp < 0) {
            if (buffer.ydisp === 0) {
                return;
            }
            this._bufferService.isUserScrolling = true;
        }
        else if (disp + buffer.ydisp >= buffer.ybase) {
            this._bufferService.isUserScrolling = false;
        }
        var oldYdisp = buffer.ydisp;
        buffer.ydisp = Math.max(Math.min(buffer.ydisp + disp, buffer.ybase), 0);
        if (oldYdisp === buffer.ydisp) {
            return;
        }
        if (!suppressScrollEvent) {
            this._onScroll.fire(buffer.ydisp);
        }
    };
    CoreTerminal.prototype.scrollPages = function (pageCount) {
        this.scrollLines(pageCount * (this.rows - 1));
    };
    CoreTerminal.prototype.scrollToTop = function () {
        this.scrollLines(-this._bufferService.buffer.ydisp);
    };
    CoreTerminal.prototype.scrollToBottom = function () {
        this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
    };
    CoreTerminal.prototype.scrollToLine = function (line) {
        var scrollAmount = line - this._bufferService.buffer.ydisp;
        if (scrollAmount !== 0) {
            this.scrollLines(scrollAmount);
        }
    };
    CoreTerminal.prototype.addEscHandler = function (id, callback) {
        return this._inputHandler.addEscHandler(id, callback);
    };
    CoreTerminal.prototype.addDcsHandler = function (id, callback) {
        return this._inputHandler.addDcsHandler(id, callback);
    };
    CoreTerminal.prototype.addCsiHandler = function (id, callback) {
        return this._inputHandler.addCsiHandler(id, callback);
    };
    CoreTerminal.prototype.addOscHandler = function (ident, callback) {
        return this._inputHandler.addOscHandler(ident, callback);
    };
    CoreTerminal.prototype._setup = function () {
        if (this.optionsService.options.windowsMode) {
            this._enableWindowsMode();
        }
    };
    CoreTerminal.prototype.reset = function () {
        this._inputHandler.reset();
        this._bufferService.reset();
        this._charsetService.reset();
        this._coreService.reset();
        this._coreMouseService.reset();
    };
    CoreTerminal.prototype._updateOptions = function (key) {
        var _a;
        switch (key) {
            case 'scrollback':
                this.buffers.resize(this.cols, this.rows);
                break;
            case 'windowsMode':
                if (this.optionsService.options.windowsMode) {
                    this._enableWindowsMode();
                }
                else {
                    (_a = this._windowsMode) === null || _a === void 0 ? void 0 : _a.dispose();
                    this._windowsMode = undefined;
                }
                break;
        }
    };
    CoreTerminal.prototype._enableWindowsMode = function () {
        var _this = this;
        if (!this._windowsMode) {
            var disposables_1 = [];
            disposables_1.push(this.onLineFeed(WindowsMode_1.updateWindowsModeWrappedState.bind(null, this._bufferService)));
            disposables_1.push(this.addCsiHandler({ final: 'H' }, function () {
                WindowsMode_1.updateWindowsModeWrappedState(_this._bufferService);
                return false;
            }));
            this._windowsMode = {
                dispose: function () {
                    for (var _i = 0, disposables_2 = disposables_1; _i < disposables_2.length; _i++) {
                        var d = disposables_2[_i];
                        d.dispose();
                    }
                }
            };
        }
    };
    return CoreTerminal;
}(Lifecycle_1.Disposable));
exports.CoreTerminal = CoreTerminal;
//# sourceMappingURL=CoreTerminal.js.map