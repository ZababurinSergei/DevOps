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
exports.InputHandler = exports.WindowsOptionsReportType = void 0;
var EscapeSequences_1 = require("common/data/EscapeSequences");
var Charsets_1 = require("common/data/Charsets");
var EscapeSequenceParser_1 = require("common/parser/EscapeSequenceParser");
var Lifecycle_1 = require("common/Lifecycle");
var TypedArrayUtils_1 = require("common/TypedArrayUtils");
var TextDecoder_1 = require("common/input/TextDecoder");
var BufferLine_1 = require("common/buffer/BufferLine");
var EventEmitter_1 = require("common/EventEmitter");
var Constants_1 = require("common/buffer/Constants");
var CellData_1 = require("common/buffer/CellData");
var AttributeData_1 = require("common/buffer/AttributeData");
var OscParser_1 = require("common/parser/OscParser");
var DcsParser_1 = require("common/parser/DcsParser");
var GLEVEL = { '(': 0, ')': 1, '*': 2, '+': 3, '-': 1, '.': 2 };
var MAX_PARSEBUFFER_LENGTH = 131072;
var STACK_LIMIT = 10;
function paramToWindowOption(n, opts) {
    if (n > 24) {
        return opts.setWinLines || false;
    }
    switch (n) {
        case 1: return !!opts.restoreWin;
        case 2: return !!opts.minimizeWin;
        case 3: return !!opts.setWinPosition;
        case 4: return !!opts.setWinSizePixels;
        case 5: return !!opts.raiseWin;
        case 6: return !!opts.lowerWin;
        case 7: return !!opts.refreshWin;
        case 8: return !!opts.setWinSizeChars;
        case 9: return !!opts.maximizeWin;
        case 10: return !!opts.fullscreenWin;
        case 11: return !!opts.getWinState;
        case 13: return !!opts.getWinPosition;
        case 14: return !!opts.getWinSizePixels;
        case 15: return !!opts.getScreenSizePixels;
        case 16: return !!opts.getCellSizePixels;
        case 18: return !!opts.getWinSizeChars;
        case 19: return !!opts.getScreenSizeChars;
        case 20: return !!opts.getIconTitle;
        case 21: return !!opts.getWinTitle;
        case 22: return !!opts.pushTitle;
        case 23: return !!opts.popTitle;
        case 24: return !!opts.setWinLines;
    }
    return false;
}
var WindowsOptionsReportType;
(function (WindowsOptionsReportType) {
    WindowsOptionsReportType[WindowsOptionsReportType["GET_WIN_SIZE_PIXELS"] = 0] = "GET_WIN_SIZE_PIXELS";
    WindowsOptionsReportType[WindowsOptionsReportType["GET_CELL_SIZE_PIXELS"] = 1] = "GET_CELL_SIZE_PIXELS";
})(WindowsOptionsReportType = exports.WindowsOptionsReportType || (exports.WindowsOptionsReportType = {}));
var DECRQSS = (function () {
    function DECRQSS(_bufferService, _coreService, _logService, _optionsService) {
        this._bufferService = _bufferService;
        this._coreService = _coreService;
        this._logService = _logService;
        this._optionsService = _optionsService;
        this._data = new Uint32Array(0);
    }
    DECRQSS.prototype.hook = function (params) {
        this._data = new Uint32Array(0);
    };
    DECRQSS.prototype.put = function (data, start, end) {
        this._data = TypedArrayUtils_1.concat(this._data, data.subarray(start, end));
    };
    DECRQSS.prototype.unhook = function (success) {
        if (!success) {
            this._data = new Uint32Array(0);
            return;
        }
        var data = TextDecoder_1.utf32ToString(this._data);
        this._data = new Uint32Array(0);
        switch (data) {
            case '"q':
                return this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "P1$r0\"q" + EscapeSequences_1.C0.ESC + "\\");
            case '"p':
                return this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "P1$r61;1\"p" + EscapeSequences_1.C0.ESC + "\\");
            case 'r':
                var pt = '' + (this._bufferService.buffer.scrollTop + 1) +
                    ';' + (this._bufferService.buffer.scrollBottom + 1) + 'r';
                return this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "P1$r" + pt + EscapeSequences_1.C0.ESC + "\\");
            case 'm':
                return this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "P1$r0m" + EscapeSequences_1.C0.ESC + "\\");
            case ' q':
                var STYLES = { 'block': 2, 'underline': 4, 'bar': 6 };
                var style = STYLES[this._optionsService.options.cursorStyle];
                style -= this._optionsService.options.cursorBlink ? 1 : 0;
                return this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "P1$r" + style + " q" + EscapeSequences_1.C0.ESC + "\\");
            default:
                this._logService.debug('Unknown DCS $q %s', data);
                this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "P0$r" + EscapeSequences_1.C0.ESC + "\\");
        }
    };
    return DECRQSS;
}());
var InputHandler = (function (_super) {
    __extends(InputHandler, _super);
    function InputHandler(_bufferService, _charsetService, _coreService, _dirtyRowService, _logService, _optionsService, _coreMouseService, _unicodeService, _parser) {
        if (_parser === void 0) { _parser = new EscapeSequenceParser_1.EscapeSequenceParser(); }
        var _this = _super.call(this) || this;
        _this._bufferService = _bufferService;
        _this._charsetService = _charsetService;
        _this._coreService = _coreService;
        _this._dirtyRowService = _dirtyRowService;
        _this._logService = _logService;
        _this._optionsService = _optionsService;
        _this._coreMouseService = _coreMouseService;
        _this._unicodeService = _unicodeService;
        _this._parser = _parser;
        _this._parseBuffer = new Uint32Array(4096);
        _this._stringDecoder = new TextDecoder_1.StringToUtf32();
        _this._utf8Decoder = new TextDecoder_1.Utf8ToUtf32();
        _this._workCell = new CellData_1.CellData();
        _this._windowTitle = '';
        _this._iconName = '';
        _this._windowTitleStack = [];
        _this._iconNameStack = [];
        _this._curAttrData = BufferLine_1.DEFAULT_ATTR_DATA.clone();
        _this._eraseAttrDataInternal = BufferLine_1.DEFAULT_ATTR_DATA.clone();
        _this._onRequestBell = new EventEmitter_1.EventEmitter();
        _this._onRequestRefreshRows = new EventEmitter_1.EventEmitter();
        _this._onRequestReset = new EventEmitter_1.EventEmitter();
        _this._onRequestScroll = new EventEmitter_1.EventEmitter();
        _this._onRequestSyncScrollBar = new EventEmitter_1.EventEmitter();
        _this._onRequestWindowsOptionsReport = new EventEmitter_1.EventEmitter();
        _this._onA11yChar = new EventEmitter_1.EventEmitter();
        _this._onA11yTab = new EventEmitter_1.EventEmitter();
        _this._onCursorMove = new EventEmitter_1.EventEmitter();
        _this._onLineFeed = new EventEmitter_1.EventEmitter();
        _this._onScroll = new EventEmitter_1.EventEmitter();
        _this._onTitleChange = new EventEmitter_1.EventEmitter();
        _this.register(_this._parser);
        _this._parser.setCsiHandlerFallback(function (ident, params) {
            _this._logService.debug('Unknown CSI code: ', { identifier: _this._parser.identToString(ident), params: params.toArray() });
        });
        _this._parser.setEscHandlerFallback(function (ident) {
            _this._logService.debug('Unknown ESC code: ', { identifier: _this._parser.identToString(ident) });
        });
        _this._parser.setExecuteHandlerFallback(function (code) {
            _this._logService.debug('Unknown EXECUTE code: ', { code: code });
        });
        _this._parser.setOscHandlerFallback(function (identifier, action, data) {
            _this._logService.debug('Unknown OSC code: ', { identifier: identifier, action: action, data: data });
        });
        _this._parser.setDcsHandlerFallback(function (ident, action, payload) {
            if (action === 'HOOK') {
                payload = payload.toArray();
            }
            _this._logService.debug('Unknown DCS code: ', { identifier: _this._parser.identToString(ident), action: action, payload: payload });
        });
        _this._parser.setPrintHandler(function (data, start, end) { return _this.print(data, start, end); });
        _this._parser.setCsiHandler({ final: '@' }, function (params) { return _this.insertChars(params); });
        _this._parser.setCsiHandler({ intermediates: ' ', final: '@' }, function (params) { return _this.scrollLeft(params); });
        _this._parser.setCsiHandler({ final: 'A' }, function (params) { return _this.cursorUp(params); });
        _this._parser.setCsiHandler({ intermediates: ' ', final: 'A' }, function (params) { return _this.scrollRight(params); });
        _this._parser.setCsiHandler({ final: 'B' }, function (params) { return _this.cursorDown(params); });
        _this._parser.setCsiHandler({ final: 'C' }, function (params) { return _this.cursorForward(params); });
        _this._parser.setCsiHandler({ final: 'D' }, function (params) { return _this.cursorBackward(params); });
        _this._parser.setCsiHandler({ final: 'E' }, function (params) { return _this.cursorNextLine(params); });
        _this._parser.setCsiHandler({ final: 'F' }, function (params) { return _this.cursorPrecedingLine(params); });
        _this._parser.setCsiHandler({ final: 'G' }, function (params) { return _this.cursorCharAbsolute(params); });
        _this._parser.setCsiHandler({ final: 'H' }, function (params) { return _this.cursorPosition(params); });
        _this._parser.setCsiHandler({ final: 'I' }, function (params) { return _this.cursorForwardTab(params); });
        _this._parser.setCsiHandler({ final: 'J' }, function (params) { return _this.eraseInDisplay(params); });
        _this._parser.setCsiHandler({ prefix: '?', final: 'J' }, function (params) { return _this.eraseInDisplay(params); });
        _this._parser.setCsiHandler({ final: 'K' }, function (params) { return _this.eraseInLine(params); });
        _this._parser.setCsiHandler({ prefix: '?', final: 'K' }, function (params) { return _this.eraseInLine(params); });
        _this._parser.setCsiHandler({ final: 'L' }, function (params) { return _this.insertLines(params); });
        _this._parser.setCsiHandler({ final: 'M' }, function (params) { return _this.deleteLines(params); });
        _this._parser.setCsiHandler({ final: 'P' }, function (params) { return _this.deleteChars(params); });
        _this._parser.setCsiHandler({ final: 'S' }, function (params) { return _this.scrollUp(params); });
        _this._parser.setCsiHandler({ final: 'T' }, function (params) { return _this.scrollDown(params); });
        _this._parser.setCsiHandler({ final: 'X' }, function (params) { return _this.eraseChars(params); });
        _this._parser.setCsiHandler({ final: 'Z' }, function (params) { return _this.cursorBackwardTab(params); });
        _this._parser.setCsiHandler({ final: '`' }, function (params) { return _this.charPosAbsolute(params); });
        _this._parser.setCsiHandler({ final: 'a' }, function (params) { return _this.hPositionRelative(params); });
        _this._parser.setCsiHandler({ final: 'b' }, function (params) { return _this.repeatPrecedingCharacter(params); });
        _this._parser.setCsiHandler({ final: 'c' }, function (params) { return _this.sendDeviceAttributesPrimary(params); });
        _this._parser.setCsiHandler({ prefix: '>', final: 'c' }, function (params) { return _this.sendDeviceAttributesSecondary(params); });
        _this._parser.setCsiHandler({ final: 'd' }, function (params) { return _this.linePosAbsolute(params); });
        _this._parser.setCsiHandler({ final: 'e' }, function (params) { return _this.vPositionRelative(params); });
        _this._parser.setCsiHandler({ final: 'f' }, function (params) { return _this.hVPosition(params); });
        _this._parser.setCsiHandler({ final: 'g' }, function (params) { return _this.tabClear(params); });
        _this._parser.setCsiHandler({ final: 'h' }, function (params) { return _this.setMode(params); });
        _this._parser.setCsiHandler({ prefix: '?', final: 'h' }, function (params) { return _this.setModePrivate(params); });
        _this._parser.setCsiHandler({ final: 'l' }, function (params) { return _this.resetMode(params); });
        _this._parser.setCsiHandler({ prefix: '?', final: 'l' }, function (params) { return _this.resetModePrivate(params); });
        _this._parser.setCsiHandler({ final: 'm' }, function (params) { return _this.charAttributes(params); });
        _this._parser.setCsiHandler({ final: 'n' }, function (params) { return _this.deviceStatus(params); });
        _this._parser.setCsiHandler({ prefix: '?', final: 'n' }, function (params) { return _this.deviceStatusPrivate(params); });
        _this._parser.setCsiHandler({ intermediates: '!', final: 'p' }, function (params) { return _this.softReset(params); });
        _this._parser.setCsiHandler({ intermediates: ' ', final: 'q' }, function (params) { return _this.setCursorStyle(params); });
        _this._parser.setCsiHandler({ final: 'r' }, function (params) { return _this.setScrollRegion(params); });
        _this._parser.setCsiHandler({ final: 's' }, function (params) { return _this.saveCursor(params); });
        _this._parser.setCsiHandler({ final: 't' }, function (params) { return _this.windowOptions(params); });
        _this._parser.setCsiHandler({ final: 'u' }, function (params) { return _this.restoreCursor(params); });
        _this._parser.setCsiHandler({ intermediates: '\'', final: '}' }, function (params) { return _this.insertColumns(params); });
        _this._parser.setCsiHandler({ intermediates: '\'', final: '~' }, function (params) { return _this.deleteColumns(params); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.BEL, function () { return _this.bell(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.LF, function () { return _this.lineFeed(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.VT, function () { return _this.lineFeed(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.FF, function () { return _this.lineFeed(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.CR, function () { return _this.carriageReturn(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.BS, function () { return _this.backspace(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.HT, function () { return _this.tab(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.SO, function () { return _this.shiftOut(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C0.SI, function () { return _this.shiftIn(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C1.IND, function () { return _this.index(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C1.NEL, function () { return _this.nextLine(); });
        _this._parser.setExecuteHandler(EscapeSequences_1.C1.HTS, function () { return _this.tabSet(); });
        _this._parser.setOscHandler(0, new OscParser_1.OscHandler(function (data) { _this.setTitle(data); _this.setIconName(data); }));
        _this._parser.setOscHandler(1, new OscParser_1.OscHandler(function (data) { return _this.setIconName(data); }));
        _this._parser.setOscHandler(2, new OscParser_1.OscHandler(function (data) { return _this.setTitle(data); }));
        _this._parser.setEscHandler({ final: '7' }, function () { return _this.saveCursor(); });
        _this._parser.setEscHandler({ final: '8' }, function () { return _this.restoreCursor(); });
        _this._parser.setEscHandler({ final: 'D' }, function () { return _this.index(); });
        _this._parser.setEscHandler({ final: 'E' }, function () { return _this.nextLine(); });
        _this._parser.setEscHandler({ final: 'H' }, function () { return _this.tabSet(); });
        _this._parser.setEscHandler({ final: 'M' }, function () { return _this.reverseIndex(); });
        _this._parser.setEscHandler({ final: '=' }, function () { return _this.keypadApplicationMode(); });
        _this._parser.setEscHandler({ final: '>' }, function () { return _this.keypadNumericMode(); });
        _this._parser.setEscHandler({ final: 'c' }, function () { return _this.fullReset(); });
        _this._parser.setEscHandler({ final: 'n' }, function () { return _this.setgLevel(2); });
        _this._parser.setEscHandler({ final: 'o' }, function () { return _this.setgLevel(3); });
        _this._parser.setEscHandler({ final: '|' }, function () { return _this.setgLevel(3); });
        _this._parser.setEscHandler({ final: '}' }, function () { return _this.setgLevel(2); });
        _this._parser.setEscHandler({ final: '~' }, function () { return _this.setgLevel(1); });
        _this._parser.setEscHandler({ intermediates: '%', final: '@' }, function () { return _this.selectDefaultCharset(); });
        _this._parser.setEscHandler({ intermediates: '%', final: 'G' }, function () { return _this.selectDefaultCharset(); });
        var _loop_1 = function (flag) {
            this_1._parser.setEscHandler({ intermediates: '(', final: flag }, function () { return _this.selectCharset('(' + flag); });
            this_1._parser.setEscHandler({ intermediates: ')', final: flag }, function () { return _this.selectCharset(')' + flag); });
            this_1._parser.setEscHandler({ intermediates: '*', final: flag }, function () { return _this.selectCharset('*' + flag); });
            this_1._parser.setEscHandler({ intermediates: '+', final: flag }, function () { return _this.selectCharset('+' + flag); });
            this_1._parser.setEscHandler({ intermediates: '-', final: flag }, function () { return _this.selectCharset('-' + flag); });
            this_1._parser.setEscHandler({ intermediates: '.', final: flag }, function () { return _this.selectCharset('.' + flag); });
            this_1._parser.setEscHandler({ intermediates: '/', final: flag }, function () { return _this.selectCharset('/' + flag); });
        };
        var this_1 = this;
        for (var flag in Charsets_1.CHARSETS) {
            _loop_1(flag);
        }
        _this._parser.setEscHandler({ intermediates: '#', final: '8' }, function () { return _this.screenAlignmentPattern(); });
        _this._parser.setErrorHandler(function (state) {
            _this._logService.error('Parsing error: ', state);
            return state;
        });
        _this._parser.setDcsHandler({ intermediates: '$', final: 'q' }, new DECRQSS(_this._bufferService, _this._coreService, _this._logService, _this._optionsService));
        return _this;
    }
    Object.defineProperty(InputHandler.prototype, "onRequestBell", {
        get: function () { return this._onRequestBell.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onRequestRefreshRows", {
        get: function () { return this._onRequestRefreshRows.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onRequestReset", {
        get: function () { return this._onRequestReset.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onRequestScroll", {
        get: function () { return this._onRequestScroll.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onRequestSyncScrollBar", {
        get: function () { return this._onRequestSyncScrollBar.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onRequestWindowsOptionsReport", {
        get: function () { return this._onRequestWindowsOptionsReport.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onA11yChar", {
        get: function () { return this._onA11yChar.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onA11yTab", {
        get: function () { return this._onA11yTab.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onCursorMove", {
        get: function () { return this._onCursorMove.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onLineFeed", {
        get: function () { return this._onLineFeed.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onScroll", {
        get: function () { return this._onScroll.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "onTitleChange", {
        get: function () { return this._onTitleChange.event; },
        enumerable: false,
        configurable: true
    });
    InputHandler.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    InputHandler.prototype.parse = function (data) {
        var buffer = this._bufferService.buffer;
        var cursorStartX = buffer.x;
        var cursorStartY = buffer.y;
        this._logService.debug('parsing data', data);
        if (this._parseBuffer.length < data.length) {
            if (this._parseBuffer.length < MAX_PARSEBUFFER_LENGTH) {
                this._parseBuffer = new Uint32Array(Math.min(data.length, MAX_PARSEBUFFER_LENGTH));
            }
        }
        this._dirtyRowService.clearRange();
        if (data.length > MAX_PARSEBUFFER_LENGTH) {
            for (var i = 0; i < data.length; i += MAX_PARSEBUFFER_LENGTH) {
                var end = i + MAX_PARSEBUFFER_LENGTH < data.length ? i + MAX_PARSEBUFFER_LENGTH : data.length;
                var len = (typeof data === 'string')
                    ? this._stringDecoder.decode(data.substring(i, end), this._parseBuffer)
                    : this._utf8Decoder.decode(data.subarray(i, end), this._parseBuffer);
                this._parser.parse(this._parseBuffer, len);
            }
        }
        else {
            var len = (typeof data === 'string')
                ? this._stringDecoder.decode(data, this._parseBuffer)
                : this._utf8Decoder.decode(data, this._parseBuffer);
            this._parser.parse(this._parseBuffer, len);
        }
        buffer = this._bufferService.buffer;
        if (buffer.x !== cursorStartX || buffer.y !== cursorStartY) {
            this._onCursorMove.fire();
        }
        this._onRequestRefreshRows.fire(this._dirtyRowService.start, this._dirtyRowService.end);
    };
    InputHandler.prototype.print = function (data, start, end) {
        var code;
        var chWidth;
        var buffer = this._bufferService.buffer;
        var charset = this._charsetService.charset;
        var screenReaderMode = this._optionsService.options.screenReaderMode;
        var cols = this._bufferService.cols;
        var wraparoundMode = this._coreService.decPrivateModes.wraparound;
        var insertMode = this._coreService.modes.insertMode;
        var curAttr = this._curAttrData;
        var bufferRow = buffer.lines.get(buffer.ybase + buffer.y);
        this._dirtyRowService.markDirty(buffer.y);
        if (buffer.x && end - start > 0 && bufferRow.getWidth(buffer.x - 1) === 2) {
            bufferRow.setCellFromCodePoint(buffer.x - 1, 0, 1, curAttr.fg, curAttr.bg, curAttr.extended);
        }
        for (var pos = start; pos < end; ++pos) {
            code = data[pos];
            chWidth = this._unicodeService.wcwidth(code);
            if (code < 127 && charset) {
                var ch = charset[String.fromCharCode(code)];
                if (ch) {
                    code = ch.charCodeAt(0);
                }
            }
            if (screenReaderMode) {
                this._onA11yChar.fire(TextDecoder_1.stringFromCodePoint(code));
            }
            if (!chWidth && buffer.x) {
                if (!bufferRow.getWidth(buffer.x - 1)) {
                    bufferRow.addCodepointToCell(buffer.x - 2, code);
                }
                else {
                    bufferRow.addCodepointToCell(buffer.x - 1, code);
                }
                continue;
            }
            if (buffer.x + chWidth - 1 >= cols) {
                if (wraparoundMode) {
                    while (buffer.x < cols) {
                        bufferRow.setCellFromCodePoint(buffer.x++, 0, 1, curAttr.fg, curAttr.bg, curAttr.extended);
                    }
                    buffer.x = 0;
                    buffer.y++;
                    if (buffer.y === buffer.scrollBottom + 1) {
                        buffer.y--;
                        this._onRequestScroll.fire(this._eraseAttrData(), true);
                    }
                    else {
                        if (buffer.y >= this._bufferService.rows) {
                            buffer.y = this._bufferService.rows - 1;
                        }
                        buffer.lines.get(buffer.ybase + buffer.y).isWrapped = true;
                    }
                    bufferRow = buffer.lines.get(buffer.ybase + buffer.y);
                }
                else {
                    buffer.x = cols - 1;
                    if (chWidth === 2) {
                        continue;
                    }
                }
            }
            if (insertMode) {
                bufferRow.insertCells(buffer.x, chWidth, buffer.getNullCell(curAttr), curAttr);
                if (bufferRow.getWidth(cols - 1) === 2) {
                    bufferRow.setCellFromCodePoint(cols - 1, Constants_1.NULL_CELL_CODE, Constants_1.NULL_CELL_WIDTH, curAttr.fg, curAttr.bg, curAttr.extended);
                }
            }
            bufferRow.setCellFromCodePoint(buffer.x++, code, chWidth, curAttr.fg, curAttr.bg, curAttr.extended);
            if (chWidth > 0) {
                while (--chWidth) {
                    bufferRow.setCellFromCodePoint(buffer.x++, 0, 0, curAttr.fg, curAttr.bg, curAttr.extended);
                }
            }
        }
        if (end - start > 0) {
            bufferRow.loadCell(buffer.x - 1, this._workCell);
            if (this._workCell.getWidth() === 2 || this._workCell.getCode() > 0xFFFF) {
                this._parser.precedingCodepoint = 0;
            }
            else if (this._workCell.isCombined()) {
                this._parser.precedingCodepoint = this._workCell.getChars().charCodeAt(0);
            }
            else {
                this._parser.precedingCodepoint = this._workCell.content;
            }
        }
        if (buffer.x < cols && end - start > 0 && bufferRow.getWidth(buffer.x) === 0 && !bufferRow.hasContent(buffer.x)) {
            bufferRow.setCellFromCodePoint(buffer.x, 0, 1, curAttr.fg, curAttr.bg, curAttr.extended);
        }
        this._dirtyRowService.markDirty(buffer.y);
    };
    InputHandler.prototype.addCsiHandler = function (id, callback) {
        var _this = this;
        if (id.final === 't' && !id.prefix && !id.intermediates) {
            return this._parser.addCsiHandler(id, function (params) {
                if (!paramToWindowOption(params.params[0], _this._optionsService.options.windowOptions)) {
                    return true;
                }
                return callback(params);
            });
        }
        return this._parser.addCsiHandler(id, callback);
    };
    InputHandler.prototype.addDcsHandler = function (id, callback) {
        return this._parser.addDcsHandler(id, new DcsParser_1.DcsHandler(callback));
    };
    InputHandler.prototype.addEscHandler = function (id, callback) {
        return this._parser.addEscHandler(id, callback);
    };
    InputHandler.prototype.addOscHandler = function (ident, callback) {
        return this._parser.addOscHandler(ident, new OscParser_1.OscHandler(callback));
    };
    InputHandler.prototype.bell = function () {
        this._onRequestBell.fire();
    };
    InputHandler.prototype.lineFeed = function () {
        var buffer = this._bufferService.buffer;
        this._dirtyRowService.markDirty(buffer.y);
        if (this._optionsService.options.convertEol) {
            buffer.x = 0;
        }
        buffer.y++;
        if (buffer.y === buffer.scrollBottom + 1) {
            buffer.y--;
            this._onRequestScroll.fire(this._eraseAttrData());
        }
        else if (buffer.y >= this._bufferService.rows) {
            buffer.y = this._bufferService.rows - 1;
        }
        if (buffer.x >= this._bufferService.cols) {
            buffer.x--;
        }
        this._dirtyRowService.markDirty(buffer.y);
        this._onLineFeed.fire();
    };
    InputHandler.prototype.carriageReturn = function () {
        this._bufferService.buffer.x = 0;
    };
    InputHandler.prototype.backspace = function () {
        var _a;
        var buffer = this._bufferService.buffer;
        if (!this._coreService.decPrivateModes.reverseWraparound) {
            this._restrictCursor();
            if (buffer.x > 0) {
                buffer.x--;
            }
            return;
        }
        this._restrictCursor(this._bufferService.cols);
        if (buffer.x > 0) {
            buffer.x--;
        }
        else {
            if (buffer.x === 0
                && buffer.y > buffer.scrollTop
                && buffer.y <= buffer.scrollBottom
                && ((_a = buffer.lines.get(buffer.ybase + buffer.y)) === null || _a === void 0 ? void 0 : _a.isWrapped)) {
                buffer.lines.get(buffer.ybase + buffer.y).isWrapped = false;
                buffer.y--;
                buffer.x = this._bufferService.cols - 1;
                var line = buffer.lines.get(buffer.ybase + buffer.y);
                if (line.hasWidth(buffer.x) && !line.hasContent(buffer.x)) {
                    buffer.x--;
                }
            }
        }
        this._restrictCursor();
    };
    InputHandler.prototype.tab = function () {
        if (this._bufferService.buffer.x >= this._bufferService.cols) {
            return;
        }
        var originalX = this._bufferService.buffer.x;
        this._bufferService.buffer.x = this._bufferService.buffer.nextStop();
        if (this._optionsService.options.screenReaderMode) {
            this._onA11yTab.fire(this._bufferService.buffer.x - originalX);
        }
    };
    InputHandler.prototype.shiftOut = function () {
        this._charsetService.setgLevel(1);
    };
    InputHandler.prototype.shiftIn = function () {
        this._charsetService.setgLevel(0);
    };
    InputHandler.prototype._restrictCursor = function (maxCol) {
        if (maxCol === void 0) { maxCol = this._bufferService.cols - 1; }
        this._bufferService.buffer.x = Math.min(maxCol, Math.max(0, this._bufferService.buffer.x));
        this._bufferService.buffer.y = this._coreService.decPrivateModes.origin
            ? Math.min(this._bufferService.buffer.scrollBottom, Math.max(this._bufferService.buffer.scrollTop, this._bufferService.buffer.y))
            : Math.min(this._bufferService.rows - 1, Math.max(0, this._bufferService.buffer.y));
        this._dirtyRowService.markDirty(this._bufferService.buffer.y);
    };
    InputHandler.prototype._setCursor = function (x, y) {
        this._dirtyRowService.markDirty(this._bufferService.buffer.y);
        if (this._coreService.decPrivateModes.origin) {
            this._bufferService.buffer.x = x;
            this._bufferService.buffer.y = this._bufferService.buffer.scrollTop + y;
        }
        else {
            this._bufferService.buffer.x = x;
            this._bufferService.buffer.y = y;
        }
        this._restrictCursor();
        this._dirtyRowService.markDirty(this._bufferService.buffer.y);
    };
    InputHandler.prototype._moveCursor = function (x, y) {
        this._restrictCursor();
        this._setCursor(this._bufferService.buffer.x + x, this._bufferService.buffer.y + y);
    };
    InputHandler.prototype.cursorUp = function (params) {
        var diffToTop = this._bufferService.buffer.y - this._bufferService.buffer.scrollTop;
        if (diffToTop >= 0) {
            this._moveCursor(0, -Math.min(diffToTop, params.params[0] || 1));
        }
        else {
            this._moveCursor(0, -(params.params[0] || 1));
        }
    };
    InputHandler.prototype.cursorDown = function (params) {
        var diffToBottom = this._bufferService.buffer.scrollBottom - this._bufferService.buffer.y;
        if (diffToBottom >= 0) {
            this._moveCursor(0, Math.min(diffToBottom, params.params[0] || 1));
        }
        else {
            this._moveCursor(0, params.params[0] || 1);
        }
    };
    InputHandler.prototype.cursorForward = function (params) {
        this._moveCursor(params.params[0] || 1, 0);
    };
    InputHandler.prototype.cursorBackward = function (params) {
        this._moveCursor(-(params.params[0] || 1), 0);
    };
    InputHandler.prototype.cursorNextLine = function (params) {
        this.cursorDown(params);
        this._bufferService.buffer.x = 0;
    };
    InputHandler.prototype.cursorPrecedingLine = function (params) {
        this.cursorUp(params);
        this._bufferService.buffer.x = 0;
    };
    InputHandler.prototype.cursorCharAbsolute = function (params) {
        this._setCursor((params.params[0] || 1) - 1, this._bufferService.buffer.y);
    };
    InputHandler.prototype.cursorPosition = function (params) {
        this._setCursor((params.length >= 2) ? (params.params[1] || 1) - 1 : 0, (params.params[0] || 1) - 1);
    };
    InputHandler.prototype.charPosAbsolute = function (params) {
        this._setCursor((params.params[0] || 1) - 1, this._bufferService.buffer.y);
    };
    InputHandler.prototype.hPositionRelative = function (params) {
        this._moveCursor(params.params[0] || 1, 0);
    };
    InputHandler.prototype.linePosAbsolute = function (params) {
        this._setCursor(this._bufferService.buffer.x, (params.params[0] || 1) - 1);
    };
    InputHandler.prototype.vPositionRelative = function (params) {
        this._moveCursor(0, params.params[0] || 1);
    };
    InputHandler.prototype.hVPosition = function (params) {
        this.cursorPosition(params);
    };
    InputHandler.prototype.tabClear = function (params) {
        var param = params.params[0];
        if (param === 0) {
            delete this._bufferService.buffer.tabs[this._bufferService.buffer.x];
        }
        else if (param === 3) {
            this._bufferService.buffer.tabs = {};
        }
    };
    InputHandler.prototype.cursorForwardTab = function (params) {
        if (this._bufferService.buffer.x >= this._bufferService.cols) {
            return;
        }
        var param = params.params[0] || 1;
        while (param--) {
            this._bufferService.buffer.x = this._bufferService.buffer.nextStop();
        }
    };
    InputHandler.prototype.cursorBackwardTab = function (params) {
        if (this._bufferService.buffer.x >= this._bufferService.cols) {
            return;
        }
        var param = params.params[0] || 1;
        var buffer = this._bufferService.buffer;
        while (param--) {
            buffer.x = buffer.prevStop();
        }
    };
    InputHandler.prototype._eraseInBufferLine = function (y, start, end, clearWrap) {
        if (clearWrap === void 0) { clearWrap = false; }
        var line = this._bufferService.buffer.lines.get(this._bufferService.buffer.ybase + y);
        line.replaceCells(start, end, this._bufferService.buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
        if (clearWrap) {
            line.isWrapped = false;
        }
    };
    InputHandler.prototype._resetBufferLine = function (y) {
        var line = this._bufferService.buffer.lines.get(this._bufferService.buffer.ybase + y);
        line.fill(this._bufferService.buffer.getNullCell(this._eraseAttrData()));
        line.isWrapped = false;
    };
    InputHandler.prototype.eraseInDisplay = function (params) {
        this._restrictCursor();
        var j;
        switch (params.params[0]) {
            case 0:
                j = this._bufferService.buffer.y;
                this._dirtyRowService.markDirty(j);
                this._eraseInBufferLine(j++, this._bufferService.buffer.x, this._bufferService.cols, this._bufferService.buffer.x === 0);
                for (; j < this._bufferService.rows; j++) {
                    this._resetBufferLine(j);
                }
                this._dirtyRowService.markDirty(j);
                break;
            case 1:
                j = this._bufferService.buffer.y;
                this._dirtyRowService.markDirty(j);
                this._eraseInBufferLine(j, 0, this._bufferService.buffer.x + 1, true);
                if (this._bufferService.buffer.x + 1 >= this._bufferService.cols) {
                    this._bufferService.buffer.lines.get(j + 1).isWrapped = false;
                }
                while (j--) {
                    this._resetBufferLine(j);
                }
                this._dirtyRowService.markDirty(0);
                break;
            case 2:
                j = this._bufferService.rows;
                this._dirtyRowService.markDirty(j - 1);
                while (j--) {
                    this._resetBufferLine(j);
                }
                this._dirtyRowService.markDirty(0);
                break;
            case 3:
                var scrollBackSize = this._bufferService.buffer.lines.length - this._bufferService.rows;
                if (scrollBackSize > 0) {
                    this._bufferService.buffer.lines.trimStart(scrollBackSize);
                    this._bufferService.buffer.ybase = Math.max(this._bufferService.buffer.ybase - scrollBackSize, 0);
                    this._bufferService.buffer.ydisp = Math.max(this._bufferService.buffer.ydisp - scrollBackSize, 0);
                    this._onScroll.fire(0);
                }
                break;
        }
    };
    InputHandler.prototype.eraseInLine = function (params) {
        this._restrictCursor();
        switch (params.params[0]) {
            case 0:
                this._eraseInBufferLine(this._bufferService.buffer.y, this._bufferService.buffer.x, this._bufferService.cols);
                break;
            case 1:
                this._eraseInBufferLine(this._bufferService.buffer.y, 0, this._bufferService.buffer.x + 1);
                break;
            case 2:
                this._eraseInBufferLine(this._bufferService.buffer.y, 0, this._bufferService.cols);
                break;
        }
        this._dirtyRowService.markDirty(this._bufferService.buffer.y);
    };
    InputHandler.prototype.insertLines = function (params) {
        this._restrictCursor();
        var param = params.params[0] || 1;
        var buffer = this._bufferService.buffer;
        if (buffer.y > buffer.scrollBottom || buffer.y < buffer.scrollTop) {
            return;
        }
        var row = buffer.ybase + buffer.y;
        var scrollBottomRowsOffset = this._bufferService.rows - 1 - buffer.scrollBottom;
        var scrollBottomAbsolute = this._bufferService.rows - 1 + buffer.ybase - scrollBottomRowsOffset + 1;
        while (param--) {
            buffer.lines.splice(scrollBottomAbsolute - 1, 1);
            buffer.lines.splice(row, 0, buffer.getBlankLine(this._eraseAttrData()));
        }
        this._dirtyRowService.markRangeDirty(buffer.y, buffer.scrollBottom);
        buffer.x = 0;
    };
    InputHandler.prototype.deleteLines = function (params) {
        this._restrictCursor();
        var param = params.params[0] || 1;
        var buffer = this._bufferService.buffer;
        if (buffer.y > buffer.scrollBottom || buffer.y < buffer.scrollTop) {
            return;
        }
        var row = buffer.ybase + buffer.y;
        var j;
        j = this._bufferService.rows - 1 - buffer.scrollBottom;
        j = this._bufferService.rows - 1 + buffer.ybase - j;
        while (param--) {
            buffer.lines.splice(row, 1);
            buffer.lines.splice(j, 0, buffer.getBlankLine(this._eraseAttrData()));
        }
        this._dirtyRowService.markRangeDirty(buffer.y, buffer.scrollBottom);
        buffer.x = 0;
    };
    InputHandler.prototype.insertChars = function (params) {
        this._restrictCursor();
        var line = this._bufferService.buffer.lines.get(this._bufferService.buffer.ybase + this._bufferService.buffer.y);
        if (line) {
            line.insertCells(this._bufferService.buffer.x, params.params[0] || 1, this._bufferService.buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
            this._dirtyRowService.markDirty(this._bufferService.buffer.y);
        }
    };
    InputHandler.prototype.deleteChars = function (params) {
        this._restrictCursor();
        var line = this._bufferService.buffer.lines.get(this._bufferService.buffer.ybase + this._bufferService.buffer.y);
        if (line) {
            line.deleteCells(this._bufferService.buffer.x, params.params[0] || 1, this._bufferService.buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
            this._dirtyRowService.markDirty(this._bufferService.buffer.y);
        }
    };
    InputHandler.prototype.scrollUp = function (params) {
        var param = params.params[0] || 1;
        var buffer = this._bufferService.buffer;
        while (param--) {
            buffer.lines.splice(buffer.ybase + buffer.scrollTop, 1);
            buffer.lines.splice(buffer.ybase + buffer.scrollBottom, 0, buffer.getBlankLine(this._eraseAttrData()));
        }
        this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
    };
    InputHandler.prototype.scrollDown = function (params) {
        var param = params.params[0] || 1;
        var buffer = this._bufferService.buffer;
        while (param--) {
            buffer.lines.splice(buffer.ybase + buffer.scrollBottom, 1);
            buffer.lines.splice(buffer.ybase + buffer.scrollTop, 0, buffer.getBlankLine(BufferLine_1.DEFAULT_ATTR_DATA));
        }
        this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
    };
    InputHandler.prototype.scrollLeft = function (params) {
        var buffer = this._bufferService.buffer;
        if (buffer.y > buffer.scrollBottom || buffer.y < buffer.scrollTop) {
            return;
        }
        var param = params.params[0] || 1;
        for (var y = buffer.scrollTop; y <= buffer.scrollBottom; ++y) {
            var line = buffer.lines.get(buffer.ybase + y);
            line.deleteCells(0, param, buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
            line.isWrapped = false;
        }
        this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
    };
    InputHandler.prototype.scrollRight = function (params) {
        var buffer = this._bufferService.buffer;
        if (buffer.y > buffer.scrollBottom || buffer.y < buffer.scrollTop) {
            return;
        }
        var param = params.params[0] || 1;
        for (var y = buffer.scrollTop; y <= buffer.scrollBottom; ++y) {
            var line = buffer.lines.get(buffer.ybase + y);
            line.insertCells(0, param, buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
            line.isWrapped = false;
        }
        this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
    };
    InputHandler.prototype.insertColumns = function (params) {
        var buffer = this._bufferService.buffer;
        if (buffer.y > buffer.scrollBottom || buffer.y < buffer.scrollTop) {
            return;
        }
        var param = params.params[0] || 1;
        for (var y = buffer.scrollTop; y <= buffer.scrollBottom; ++y) {
            var line = this._bufferService.buffer.lines.get(buffer.ybase + y);
            line.insertCells(buffer.x, param, buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
            line.isWrapped = false;
        }
        this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
    };
    InputHandler.prototype.deleteColumns = function (params) {
        var buffer = this._bufferService.buffer;
        if (buffer.y > buffer.scrollBottom || buffer.y < buffer.scrollTop) {
            return;
        }
        var param = params.params[0] || 1;
        for (var y = buffer.scrollTop; y <= buffer.scrollBottom; ++y) {
            var line = buffer.lines.get(buffer.ybase + y);
            line.deleteCells(buffer.x, param, buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
            line.isWrapped = false;
        }
        this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
    };
    InputHandler.prototype.eraseChars = function (params) {
        this._restrictCursor();
        var line = this._bufferService.buffer.lines.get(this._bufferService.buffer.ybase + this._bufferService.buffer.y);
        if (line) {
            line.replaceCells(this._bufferService.buffer.x, this._bufferService.buffer.x + (params.params[0] || 1), this._bufferService.buffer.getNullCell(this._eraseAttrData()), this._eraseAttrData());
            this._dirtyRowService.markDirty(this._bufferService.buffer.y);
        }
    };
    InputHandler.prototype.repeatPrecedingCharacter = function (params) {
        if (!this._parser.precedingCodepoint) {
            return;
        }
        var length = params.params[0] || 1;
        var data = new Uint32Array(length);
        for (var i = 0; i < length; ++i) {
            data[i] = this._parser.precedingCodepoint;
        }
        this.print(data, 0, data.length);
    };
    InputHandler.prototype.sendDeviceAttributesPrimary = function (params) {
        if (params.params[0] > 0) {
            return;
        }
        if (this._is('xterm') || this._is('rxvt-unicode') || this._is('screen')) {
            this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[?1;2c');
        }
        else if (this._is('linux')) {
            this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[?6c');
        }
    };
    InputHandler.prototype.sendDeviceAttributesSecondary = function (params) {
        if (params.params[0] > 0) {
            return;
        }
        if (this._is('xterm')) {
            this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[>0;276;0c');
        }
        else if (this._is('rxvt-unicode')) {
            this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[>85;95;0c');
        }
        else if (this._is('linux')) {
            this._coreService.triggerDataEvent(params.params[0] + 'c');
        }
        else if (this._is('screen')) {
            this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[>83;40003;0c');
        }
    };
    InputHandler.prototype._is = function (term) {
        return (this._optionsService.options.termName + '').indexOf(term) === 0;
    };
    InputHandler.prototype.setMode = function (params) {
        for (var i = 0; i < params.length; i++) {
            switch (params.params[i]) {
                case 4:
                    this._coreService.modes.insertMode = true;
                    break;
                case 20:
                    break;
            }
        }
    };
    InputHandler.prototype.setModePrivate = function (params) {
        for (var i = 0; i < params.length; i++) {
            switch (params.params[i]) {
                case 1:
                    this._coreService.decPrivateModes.applicationCursorKeys = true;
                    break;
                case 2:
                    this._charsetService.setgCharset(0, Charsets_1.DEFAULT_CHARSET);
                    this._charsetService.setgCharset(1, Charsets_1.DEFAULT_CHARSET);
                    this._charsetService.setgCharset(2, Charsets_1.DEFAULT_CHARSET);
                    this._charsetService.setgCharset(3, Charsets_1.DEFAULT_CHARSET);
                    break;
                case 3:
                    if (this._optionsService.options.windowOptions.setWinLines) {
                        this._bufferService.resize(132, this._bufferService.rows);
                        this._onRequestReset.fire();
                    }
                    break;
                case 6:
                    this._coreService.decPrivateModes.origin = true;
                    this._setCursor(0, 0);
                    break;
                case 7:
                    this._coreService.decPrivateModes.wraparound = true;
                    break;
                case 12:
                    break;
                case 45:
                    this._coreService.decPrivateModes.reverseWraparound = true;
                    break;
                case 66:
                    this._logService.debug('Serial port requested application keypad.');
                    this._coreService.decPrivateModes.applicationKeypad = true;
                    this._onRequestSyncScrollBar.fire();
                    break;
                case 9:
                    this._coreMouseService.activeProtocol = 'X10';
                    break;
                case 1000:
                    this._coreMouseService.activeProtocol = 'VT200';
                    break;
                case 1002:
                    this._coreMouseService.activeProtocol = 'DRAG';
                    break;
                case 1003:
                    this._coreMouseService.activeProtocol = 'ANY';
                    break;
                case 1004:
                    this._coreService.decPrivateModes.sendFocus = true;
                    break;
                case 1005:
                    this._logService.debug('DECSET 1005 not supported (see #2507)');
                    break;
                case 1006:
                    this._coreMouseService.activeEncoding = 'SGR';
                    break;
                case 1015:
                    this._logService.debug('DECSET 1015 not supported (see #2507)');
                    break;
                case 25:
                    this._coreService.isCursorHidden = false;
                    break;
                case 1048:
                    this.saveCursor();
                    break;
                case 1049:
                    this.saveCursor();
                case 47:
                case 1047:
                    this._bufferService.buffers.activateAltBuffer(this._eraseAttrData());
                    this._coreService.isCursorInitialized = true;
                    this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1);
                    this._onRequestSyncScrollBar.fire();
                    break;
                case 2004:
                    this._coreService.decPrivateModes.bracketedPasteMode = true;
                    break;
            }
        }
    };
    InputHandler.prototype.resetMode = function (params) {
        for (var i = 0; i < params.length; i++) {
            switch (params.params[i]) {
                case 4:
                    this._coreService.modes.insertMode = false;
                    break;
                case 20:
                    break;
            }
        }
    };
    InputHandler.prototype.resetModePrivate = function (params) {
        for (var i = 0; i < params.length; i++) {
            switch (params.params[i]) {
                case 1:
                    this._coreService.decPrivateModes.applicationCursorKeys = false;
                    break;
                case 3:
                    if (this._optionsService.options.windowOptions.setWinLines) {
                        this._bufferService.resize(80, this._bufferService.rows);
                        this._onRequestReset.fire();
                    }
                    break;
                case 6:
                    this._coreService.decPrivateModes.origin = false;
                    this._setCursor(0, 0);
                    break;
                case 7:
                    this._coreService.decPrivateModes.wraparound = false;
                    break;
                case 12:
                    break;
                case 45:
                    this._coreService.decPrivateModes.reverseWraparound = false;
                    break;
                case 66:
                    this._logService.debug('Switching back to normal keypad.');
                    this._coreService.decPrivateModes.applicationKeypad = false;
                    this._onRequestSyncScrollBar.fire();
                    break;
                case 9:
                case 1000:
                case 1002:
                case 1003:
                    this._coreMouseService.activeProtocol = 'NONE';
                    break;
                case 1004:
                    this._coreService.decPrivateModes.sendFocus = false;
                    break;
                case 1005:
                    this._logService.debug('DECRST 1005 not supported (see #2507)');
                    break;
                case 1006:
                    this._coreMouseService.activeEncoding = 'DEFAULT';
                    break;
                case 1015:
                    this._logService.debug('DECRST 1015 not supported (see #2507)');
                    break;
                case 25:
                    this._coreService.isCursorHidden = true;
                    break;
                case 1048:
                    this.restoreCursor();
                    break;
                case 1049:
                case 47:
                case 1047:
                    this._bufferService.buffers.activateNormalBuffer();
                    if (params.params[i] === 1049) {
                        this.restoreCursor();
                    }
                    this._coreService.isCursorInitialized = true;
                    this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1);
                    this._onRequestSyncScrollBar.fire();
                    break;
                case 2004:
                    this._coreService.decPrivateModes.bracketedPasteMode = false;
                    break;
            }
        }
    };
    InputHandler.prototype._updateAttrColor = function (color, mode, c1, c2, c3) {
        if (mode === 2) {
            color |= 50331648;
            color &= ~16777215;
            color |= AttributeData_1.AttributeData.fromColorRGB([c1, c2, c3]);
        }
        else if (mode === 5) {
            color &= ~(50331648 | 255);
            color |= 33554432 | (c1 & 0xff);
        }
        return color;
    };
    InputHandler.prototype._extractColor = function (params, pos, attr) {
        var accu = [0, 0, -1, 0, 0, 0];
        var cSpace = 0;
        var advance = 0;
        do {
            accu[advance + cSpace] = params.params[pos + advance];
            if (params.hasSubParams(pos + advance)) {
                var subparams = params.getSubParams(pos + advance);
                var i = 0;
                do {
                    if (accu[1] === 5) {
                        cSpace = 1;
                    }
                    accu[advance + i + 1 + cSpace] = subparams[i];
                } while (++i < subparams.length && i + advance + 1 + cSpace < accu.length);
                break;
            }
            if ((accu[1] === 5 && advance + cSpace >= 2)
                || (accu[1] === 2 && advance + cSpace >= 5)) {
                break;
            }
            if (accu[1]) {
                cSpace = 1;
            }
        } while (++advance + pos < params.length && advance + cSpace < accu.length);
        for (var i = 2; i < accu.length; ++i) {
            if (accu[i] === -1) {
                accu[i] = 0;
            }
        }
        switch (accu[0]) {
            case 38:
                attr.fg = this._updateAttrColor(attr.fg, accu[1], accu[3], accu[4], accu[5]);
                break;
            case 48:
                attr.bg = this._updateAttrColor(attr.bg, accu[1], accu[3], accu[4], accu[5]);
                break;
            case 58:
                attr.extended = attr.extended.clone();
                attr.extended.underlineColor = this._updateAttrColor(attr.extended.underlineColor, accu[1], accu[3], accu[4], accu[5]);
        }
        return advance;
    };
    InputHandler.prototype._processUnderline = function (style, attr) {
        attr.extended = attr.extended.clone();
        if (!~style || style > 5) {
            style = 1;
        }
        attr.extended.underlineStyle = style;
        attr.fg |= 268435456;
        if (style === 0) {
            attr.fg &= ~268435456;
        }
        attr.updateExtended();
    };
    InputHandler.prototype.charAttributes = function (params) {
        if (params.length === 1 && params.params[0] === 0) {
            this._curAttrData.fg = BufferLine_1.DEFAULT_ATTR_DATA.fg;
            this._curAttrData.bg = BufferLine_1.DEFAULT_ATTR_DATA.bg;
            return;
        }
        var l = params.length;
        var p;
        var attr = this._curAttrData;
        for (var i = 0; i < l; i++) {
            p = params.params[i];
            if (p >= 30 && p <= 37) {
                attr.fg &= ~(50331648 | 255);
                attr.fg |= 16777216 | (p - 30);
            }
            else if (p >= 40 && p <= 47) {
                attr.bg &= ~(50331648 | 255);
                attr.bg |= 16777216 | (p - 40);
            }
            else if (p >= 90 && p <= 97) {
                attr.fg &= ~(50331648 | 255);
                attr.fg |= 16777216 | (p - 90) | 8;
            }
            else if (p >= 100 && p <= 107) {
                attr.bg &= ~(50331648 | 255);
                attr.bg |= 16777216 | (p - 100) | 8;
            }
            else if (p === 0) {
                attr.fg = BufferLine_1.DEFAULT_ATTR_DATA.fg;
                attr.bg = BufferLine_1.DEFAULT_ATTR_DATA.bg;
            }
            else if (p === 1) {
                attr.fg |= 134217728;
            }
            else if (p === 3) {
                attr.bg |= 67108864;
            }
            else if (p === 4) {
                attr.fg |= 268435456;
                this._processUnderline(params.hasSubParams(i) ? params.getSubParams(i)[0] : 1, attr);
            }
            else if (p === 5) {
                attr.fg |= 536870912;
            }
            else if (p === 7) {
                attr.fg |= 67108864;
            }
            else if (p === 8) {
                attr.fg |= 1073741824;
            }
            else if (p === 2) {
                attr.bg |= 134217728;
            }
            else if (p === 21) {
                this._processUnderline(2, attr);
            }
            else if (p === 22) {
                attr.fg &= ~134217728;
                attr.bg &= ~134217728;
            }
            else if (p === 23) {
                attr.bg &= ~67108864;
            }
            else if (p === 24) {
                attr.fg &= ~268435456;
            }
            else if (p === 25) {
                attr.fg &= ~536870912;
            }
            else if (p === 27) {
                attr.fg &= ~67108864;
            }
            else if (p === 28) {
                attr.fg &= ~1073741824;
            }
            else if (p === 39) {
                attr.fg &= ~(50331648 | 16777215);
                attr.fg |= BufferLine_1.DEFAULT_ATTR_DATA.fg & (255 | 16777215);
            }
            else if (p === 49) {
                attr.bg &= ~(50331648 | 16777215);
                attr.bg |= BufferLine_1.DEFAULT_ATTR_DATA.bg & (255 | 16777215);
            }
            else if (p === 38 || p === 48 || p === 58) {
                i += this._extractColor(params, i, attr);
            }
            else if (p === 59) {
                attr.extended = attr.extended.clone();
                attr.extended.underlineColor = -1;
                attr.updateExtended();
            }
            else if (p === 100) {
                attr.fg &= ~(50331648 | 16777215);
                attr.fg |= BufferLine_1.DEFAULT_ATTR_DATA.fg & (255 | 16777215);
                attr.bg &= ~(50331648 | 16777215);
                attr.bg |= BufferLine_1.DEFAULT_ATTR_DATA.bg & (255 | 16777215);
            }
            else {
                this._logService.debug('Unknown SGR attribute: %d.', p);
            }
        }
    };
    InputHandler.prototype.deviceStatus = function (params) {
        switch (params.params[0]) {
            case 5:
                this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "[0n");
                break;
            case 6:
                var y = this._bufferService.buffer.y + 1;
                var x = this._bufferService.buffer.x + 1;
                this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "[" + y + ";" + x + "R");
                break;
        }
    };
    InputHandler.prototype.deviceStatusPrivate = function (params) {
        switch (params.params[0]) {
            case 6:
                var y = this._bufferService.buffer.y + 1;
                var x = this._bufferService.buffer.x + 1;
                this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "[?" + y + ";" + x + "R");
                break;
            case 15:
                break;
            case 25:
                break;
            case 26:
                break;
            case 53:
                break;
        }
    };
    InputHandler.prototype.softReset = function (params) {
        this._coreService.isCursorHidden = false;
        this._onRequestSyncScrollBar.fire();
        this._bufferService.buffer.scrollTop = 0;
        this._bufferService.buffer.scrollBottom = this._bufferService.rows - 1;
        this._curAttrData = BufferLine_1.DEFAULT_ATTR_DATA.clone();
        this._coreService.reset();
        this._charsetService.reset();
        this._bufferService.buffer.savedX = 0;
        this._bufferService.buffer.savedY = this._bufferService.buffer.ybase;
        this._bufferService.buffer.savedCurAttrData.fg = this._curAttrData.fg;
        this._bufferService.buffer.savedCurAttrData.bg = this._curAttrData.bg;
        this._bufferService.buffer.savedCharset = this._charsetService.charset;
        this._coreService.decPrivateModes.origin = false;
    };
    InputHandler.prototype.setCursorStyle = function (params) {
        var param = params.params[0] || 1;
        switch (param) {
            case 1:
            case 2:
                this._optionsService.options.cursorStyle = 'block';
                break;
            case 3:
            case 4:
                this._optionsService.options.cursorStyle = 'underline';
                break;
            case 5:
            case 6:
                this._optionsService.options.cursorStyle = 'bar';
                break;
        }
        var isBlinking = param % 2 === 1;
        this._optionsService.options.cursorBlink = isBlinking;
    };
    InputHandler.prototype.setScrollRegion = function (params) {
        var top = params.params[0] || 1;
        var bottom;
        if (params.length < 2 || (bottom = params.params[1]) > this._bufferService.rows || bottom === 0) {
            bottom = this._bufferService.rows;
        }
        if (bottom > top) {
            this._bufferService.buffer.scrollTop = top - 1;
            this._bufferService.buffer.scrollBottom = bottom - 1;
            this._setCursor(0, 0);
        }
    };
    InputHandler.prototype.windowOptions = function (params) {
        if (!paramToWindowOption(params.params[0], this._optionsService.options.windowOptions)) {
            return;
        }
        var second = (params.length > 1) ? params.params[1] : 0;
        switch (params.params[0]) {
            case 14:
                if (second !== 2) {
                    this._onRequestWindowsOptionsReport.fire(WindowsOptionsReportType.GET_WIN_SIZE_PIXELS);
                }
                break;
            case 16:
                this._onRequestWindowsOptionsReport.fire(WindowsOptionsReportType.GET_CELL_SIZE_PIXELS);
                break;
            case 18:
                if (this._bufferService) {
                    this._coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + "[8;" + this._bufferService.rows + ";" + this._bufferService.cols + "t");
                }
                break;
            case 22:
                if (second === 0 || second === 2) {
                    this._windowTitleStack.push(this._windowTitle);
                    if (this._windowTitleStack.length > STACK_LIMIT) {
                        this._windowTitleStack.shift();
                    }
                }
                if (second === 0 || second === 1) {
                    this._iconNameStack.push(this._iconName);
                    if (this._iconNameStack.length > STACK_LIMIT) {
                        this._iconNameStack.shift();
                    }
                }
                break;
            case 23:
                if (second === 0 || second === 2) {
                    if (this._windowTitleStack.length) {
                        this.setTitle(this._windowTitleStack.pop());
                    }
                }
                if (second === 0 || second === 1) {
                    if (this._iconNameStack.length) {
                        this.setIconName(this._iconNameStack.pop());
                    }
                }
                break;
        }
    };
    InputHandler.prototype.saveCursor = function (params) {
        this._bufferService.buffer.savedX = this._bufferService.buffer.x;
        this._bufferService.buffer.savedY = this._bufferService.buffer.ybase + this._bufferService.buffer.y;
        this._bufferService.buffer.savedCurAttrData.fg = this._curAttrData.fg;
        this._bufferService.buffer.savedCurAttrData.bg = this._curAttrData.bg;
        this._bufferService.buffer.savedCharset = this._charsetService.charset;
    };
    InputHandler.prototype.restoreCursor = function (params) {
        this._bufferService.buffer.x = this._bufferService.buffer.savedX || 0;
        this._bufferService.buffer.y = Math.max(this._bufferService.buffer.savedY - this._bufferService.buffer.ybase, 0);
        this._curAttrData.fg = this._bufferService.buffer.savedCurAttrData.fg;
        this._curAttrData.bg = this._bufferService.buffer.savedCurAttrData.bg;
        this._charsetService.charset = this._savedCharset;
        if (this._bufferService.buffer.savedCharset) {
            this._charsetService.charset = this._bufferService.buffer.savedCharset;
        }
        this._restrictCursor();
    };
    InputHandler.prototype.setTitle = function (data) {
        this._windowTitle = data;
        this._onTitleChange.fire(data);
    };
    InputHandler.prototype.setIconName = function (data) {
        this._iconName = data;
    };
    InputHandler.prototype.nextLine = function () {
        this._bufferService.buffer.x = 0;
        this.index();
    };
    InputHandler.prototype.keypadApplicationMode = function () {
        this._logService.debug('Serial port requested application keypad.');
        this._coreService.decPrivateModes.applicationKeypad = true;
        this._onRequestSyncScrollBar.fire();
    };
    InputHandler.prototype.keypadNumericMode = function () {
        this._logService.debug('Switching back to normal keypad.');
        this._coreService.decPrivateModes.applicationKeypad = false;
        this._onRequestSyncScrollBar.fire();
    };
    InputHandler.prototype.selectDefaultCharset = function () {
        this._charsetService.setgLevel(0);
        this._charsetService.setgCharset(0, Charsets_1.DEFAULT_CHARSET);
    };
    InputHandler.prototype.selectCharset = function (collectAndFlag) {
        if (collectAndFlag.length !== 2) {
            this.selectDefaultCharset();
            return;
        }
        if (collectAndFlag[0] === '/') {
            return;
        }
        this._charsetService.setgCharset(GLEVEL[collectAndFlag[0]], Charsets_1.CHARSETS[collectAndFlag[1]] || Charsets_1.DEFAULT_CHARSET);
        return;
    };
    InputHandler.prototype.index = function () {
        this._restrictCursor();
        var buffer = this._bufferService.buffer;
        this._bufferService.buffer.y++;
        if (buffer.y === buffer.scrollBottom + 1) {
            buffer.y--;
            this._onRequestScroll.fire(this._eraseAttrData());
        }
        else if (buffer.y >= this._bufferService.rows) {
            buffer.y = this._bufferService.rows - 1;
        }
        this._restrictCursor();
    };
    InputHandler.prototype.tabSet = function () {
        this._bufferService.buffer.tabs[this._bufferService.buffer.x] = true;
    };
    InputHandler.prototype.reverseIndex = function () {
        this._restrictCursor();
        var buffer = this._bufferService.buffer;
        if (buffer.y === buffer.scrollTop) {
            var scrollRegionHeight = buffer.scrollBottom - buffer.scrollTop;
            buffer.lines.shiftElements(buffer.ybase + buffer.y, scrollRegionHeight, 1);
            buffer.lines.set(buffer.ybase + buffer.y, buffer.getBlankLine(this._eraseAttrData()));
            this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
        }
        else {
            buffer.y--;
            this._restrictCursor();
        }
    };
    InputHandler.prototype.fullReset = function () {
        this._parser.reset();
        this._onRequestReset.fire();
    };
    InputHandler.prototype.reset = function () {
        this._curAttrData = BufferLine_1.DEFAULT_ATTR_DATA.clone();
        this._eraseAttrDataInternal = BufferLine_1.DEFAULT_ATTR_DATA.clone();
    };
    InputHandler.prototype._eraseAttrData = function () {
        this._eraseAttrDataInternal.bg &= ~(50331648 | 0xFFFFFF);
        this._eraseAttrDataInternal.bg |= this._curAttrData.bg & ~0xFC000000;
        return this._eraseAttrDataInternal;
    };
    InputHandler.prototype.setgLevel = function (level) {
        this._charsetService.setgLevel(level);
    };
    InputHandler.prototype.screenAlignmentPattern = function () {
        var cell = new CellData_1.CellData();
        cell.content = 1 << 22 | 'E'.charCodeAt(0);
        cell.fg = this._curAttrData.fg;
        cell.bg = this._curAttrData.bg;
        var buffer = this._bufferService.buffer;
        this._setCursor(0, 0);
        for (var yOffset = 0; yOffset < this._bufferService.rows; ++yOffset) {
            var row = buffer.ybase + buffer.y + yOffset;
            var line = buffer.lines.get(row);
            if (line) {
                line.fill(cell);
                line.isWrapped = false;
            }
        }
        this._dirtyRowService.markAllDirty();
        this._setCursor(0, 0);
    };
    return InputHandler;
}(Lifecycle_1.Disposable));
exports.InputHandler = InputHandler;
//# sourceMappingURL=InputHandler.js.map