"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsService = exports.DEFAULT_OPTIONS = exports.DEFAULT_BELL_SOUND = void 0;
var EventEmitter_1 = require("common/EventEmitter");
var Platform_1 = require("common/Platform");
var Clone_1 = require("common/Clone");
exports.DEFAULT_BELL_SOUND = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjMyLjEwNAAAAAAAAAAAAAAA//tQxAADB8AhSmxhIIEVCSiJrDCQBTcu3UrAIwUdkRgQbFAZC1CQEwTJ9mjRvBA4UOLD8nKVOWfh+UlK3z/177OXrfOdKl7pyn3Xf//WreyTRUoAWgBgkOAGbZHBgG1OF6zM82DWbZaUmMBptgQhGjsyYqc9ae9XFz280948NMBWInljyzsNRFLPWdnZGWrddDsjK1unuSrVN9jJsK8KuQtQCtMBjCEtImISdNKJOopIpBFpNSMbIHCSRpRR5iakjTiyzLhchUUBwCgyKiweBv/7UsQbg8isVNoMPMjAAAA0gAAABEVFGmgqK////9bP/6XCykxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
exports.DEFAULT_OPTIONS = Object.freeze({
    cols: 80,
    rows: 24,
    cursorBlink: false,
    cursorStyle: 'block',
    cursorWidth: 1,
    bellSound: exports.DEFAULT_BELL_SOUND,
    bellStyle: 'none',
    drawBoldTextInBrightColors: true,
    fastScrollModifier: 'alt',
    fastScrollSensitivity: 5,
    fontFamily: 'courier-new, courier, monospace',
    fontSize: 15,
    fontWeight: 'normal',
    fontWeightBold: 'bold',
    lineHeight: 1.0,
    linkTooltipHoverDuration: 500,
    letterSpacing: 0,
    logLevel: 'info',
    scrollback: 1000,
    scrollSensitivity: 1,
    screenReaderMode: false,
    macOptionIsMeta: false,
    macOptionClickForcesSelection: false,
    minimumContrastRatio: 1,
    disableStdin: false,
    allowProposedApi: true,
    allowTransparency: false,
    tabStopWidth: 8,
    theme: {},
    rightClickSelectsWord: Platform_1.isMac,
    rendererType: 'canvas',
    windowOptions: {},
    windowsMode: false,
    wordSeparator: ' ()[]{}\',"`',
    convertEol: false,
    termName: 'xterm',
    cancelEvents: false
});
var FONT_WEIGHT_OPTIONS = ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
var CONSTRUCTOR_ONLY_OPTIONS = ['cols', 'rows'];
var OptionsService = (function () {
    function OptionsService(options) {
        this._onOptionChange = new EventEmitter_1.EventEmitter();
        this.options = Clone_1.clone(exports.DEFAULT_OPTIONS);
        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
            var k = _a[_i];
            if (k in this.options) {
                try {
                    var newValue = options[k];
                    this.options[k] = this._sanitizeAndValidateOption(k, newValue);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    }
    Object.defineProperty(OptionsService.prototype, "onOptionChange", {
        get: function () { return this._onOptionChange.event; },
        enumerable: false,
        configurable: true
    });
    OptionsService.prototype.setOption = function (key, value) {
        if (!(key in exports.DEFAULT_OPTIONS)) {
            throw new Error('No option with key "' + key + '"');
        }
        if (CONSTRUCTOR_ONLY_OPTIONS.indexOf(key) !== -1) {
            throw new Error("Option \"" + key + "\" can only be set in the constructor");
        }
        if (this.options[key] === value) {
            return;
        }
        value = this._sanitizeAndValidateOption(key, value);
        if (this.options[key] === value) {
            return;
        }
        this.options[key] = value;
        this._onOptionChange.fire(key);
    };
    OptionsService.prototype._sanitizeAndValidateOption = function (key, value) {
        switch (key) {
            case 'bellStyle':
            case 'cursorStyle':
            case 'rendererType':
            case 'wordSeparator':
                if (!value) {
                    value = exports.DEFAULT_OPTIONS[key];
                }
                break;
            case 'fontWeight':
            case 'fontWeightBold':
                if (typeof value === 'number' && 1 <= value && value <= 1000) {
                    break;
                }
                value = FONT_WEIGHT_OPTIONS.indexOf(value) !== -1 ? value : exports.DEFAULT_OPTIONS[key];
                break;
            case 'cursorWidth':
                value = Math.floor(value);
            case 'lineHeight':
            case 'tabStopWidth':
                if (value < 1) {
                    throw new Error(key + " cannot be less than 1, value: " + value);
                }
                break;
            case 'minimumContrastRatio':
                value = Math.max(1, Math.min(21, Math.round(value * 10) / 10));
                break;
            case 'scrollback':
                value = Math.min(value, 4294967295);
                if (value < 0) {
                    throw new Error(key + " cannot be less than 0, value: " + value);
                }
                break;
            case 'fastScrollSensitivity':
            case 'scrollSensitivity':
                if (value <= 0) {
                    throw new Error(key + " cannot be less than or equal to 0, value: " + value);
                }
                break;
        }
        return value;
    };
    OptionsService.prototype.getOption = function (key) {
        if (!(key in exports.DEFAULT_OPTIONS)) {
            throw new Error("No option with key \"" + key + "\"");
        }
        return this.options[key];
    };
    return OptionsService;
}());
exports.OptionsService = OptionsService;
//# sourceMappingURL=OptionsService.js.map