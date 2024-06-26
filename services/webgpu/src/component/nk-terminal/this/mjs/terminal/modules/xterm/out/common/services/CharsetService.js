"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharsetService = void 0;
var CharsetService = (function () {
    function CharsetService() {
        this.glevel = 0;
        this._charsets = [];
    }
    CharsetService.prototype.reset = function () {
        this.charset = undefined;
        this._charsets = [];
        this.glevel = 0;
    };
    CharsetService.prototype.setgLevel = function (g) {
        this.glevel = g;
        this.charset = this._charsets[g];
    };
    CharsetService.prototype.setgCharset = function (g, charset) {
        this._charsets[g] = charset;
        if (this.glevel === g) {
            this.charset = charset;
        }
    };
    return CharsetService;
}());
exports.CharsetService = CharsetService;
//# sourceMappingURL=CharsetService.js.map