"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnicodeService = void 0;
var EventEmitter_1 = require("common/EventEmitter");
var UnicodeV6_1 = require("common/input/UnicodeV6");
var UnicodeService = (function () {
    function UnicodeService() {
        this._providers = Object.create(null);
        this._active = '';
        this._onChange = new EventEmitter_1.EventEmitter();
        var defaultProvider = new UnicodeV6_1.UnicodeV6();
        this.register(defaultProvider);
        this._active = defaultProvider.version;
        this._activeProvider = defaultProvider;
    }
    Object.defineProperty(UnicodeService.prototype, "onChange", {
        get: function () { return this._onChange.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnicodeService.prototype, "versions", {
        get: function () {
            return Object.keys(this._providers);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnicodeService.prototype, "activeVersion", {
        get: function () {
            return this._active;
        },
        set: function (version) {
            if (!this._providers[version]) {
                throw new Error("unknown Unicode version \"" + version + "\"");
            }
            this._active = version;
            this._activeProvider = this._providers[version];
            this._onChange.fire(version);
        },
        enumerable: false,
        configurable: true
    });
    UnicodeService.prototype.register = function (provider) {
        this._providers[provider.version] = provider;
    };
    UnicodeService.prototype.wcwidth = function (num) {
        return this._activeProvider.wcwidth(num);
    };
    UnicodeService.prototype.getStringCellWidth = function (s) {
        var result = 0;
        var length = s.length;
        for (var i = 0; i < length; ++i) {
            var code = s.charCodeAt(i);
            if (0xD800 <= code && code <= 0xDBFF) {
                if (++i >= length) {
                    return result + this.wcwidth(code);
                }
                var second = s.charCodeAt(i);
                if (0xDC00 <= second && second <= 0xDFFF) {
                    code = (code - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
                else {
                    result += this.wcwidth(second);
                }
            }
            result += this.wcwidth(code);
        }
        return result;
    };
    return UnicodeService;
}());
exports.UnicodeService = UnicodeService;
//# sourceMappingURL=UnicodeService.js.map