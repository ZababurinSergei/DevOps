"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomRendererRowFactory = exports.CURSOR_STYLE_UNDERLINE_CLASS = exports.CURSOR_STYLE_BAR_CLASS = exports.CURSOR_STYLE_BLOCK_CLASS = exports.CURSOR_BLINK_CLASS = exports.CURSOR_CLASS = exports.UNDERLINE_CLASS = exports.ITALIC_CLASS = exports.DIM_CLASS = exports.BOLD_CLASS = void 0;
var Constants_1 = require("browser/renderer/atlas/Constants");
var Constants_2 = require("common/buffer/Constants");
var CellData_1 = require("common/buffer/CellData");
var Color_1 = require("browser/Color");
exports.BOLD_CLASS = 'xterm-bold';
exports.DIM_CLASS = 'xterm-dim';
exports.ITALIC_CLASS = 'xterm-italic';
exports.UNDERLINE_CLASS = 'xterm-underline';
exports.CURSOR_CLASS = 'xterm-cursor';
exports.CURSOR_BLINK_CLASS = 'xterm-cursor-blink';
exports.CURSOR_STYLE_BLOCK_CLASS = 'xterm-cursor-block';
exports.CURSOR_STYLE_BAR_CLASS = 'xterm-cursor-bar';
exports.CURSOR_STYLE_UNDERLINE_CLASS = 'xterm-cursor-underline';
var DomRendererRowFactory = (function () {
    function DomRendererRowFactory(_document, _optionsService, _colors) {
        this._document = _document;
        this._optionsService = _optionsService;
        this._colors = _colors;
        this._workCell = new CellData_1.CellData();
    }
    DomRendererRowFactory.prototype.setColors = function (colors) {
        this._colors = colors;
    };
    DomRendererRowFactory.prototype.createRow = function (lineData, isCursorRow, cursorStyle, cursorX, cursorBlink, cellWidth, cols) {
        var fragment = this._document.createDocumentFragment();
        var lineLength = 0;
        for (var x = Math.min(lineData.length, cols) - 1; x >= 0; x--) {
            if (lineData.loadCell(x, this._workCell).getCode() !== Constants_2.NULL_CELL_CODE || (isCursorRow && x === cursorX)) {
                lineLength = x + 1;
                break;
            }
        }
        for (var x = 0; x < lineLength; x++) {
            lineData.loadCell(x, this._workCell);
            var width = this._workCell.getWidth();
            if (width === 0) {
                continue;
            }
            var charElement = this._document.createElement('span');
            if (width > 1) {
                charElement.style.width = cellWidth * width + "px";
            }
            if (isCursorRow && x === cursorX) {
                charElement.classList.add(exports.CURSOR_CLASS);
                if (cursorBlink) {
                    charElement.classList.add(exports.CURSOR_BLINK_CLASS);
                }
                switch (cursorStyle) {
                    case 'bar':
                        charElement.classList.add(exports.CURSOR_STYLE_BAR_CLASS);
                        break;
                    case 'underline':
                        charElement.classList.add(exports.CURSOR_STYLE_UNDERLINE_CLASS);
                        break;
                    default:
                        charElement.classList.add(exports.CURSOR_STYLE_BLOCK_CLASS);
                        break;
                }
            }
            if (this._workCell.isBold()) {
                charElement.classList.add(exports.BOLD_CLASS);
            }
            if (this._workCell.isItalic()) {
                charElement.classList.add(exports.ITALIC_CLASS);
            }
            if (this._workCell.isDim()) {
                charElement.classList.add(exports.DIM_CLASS);
            }
            if (this._workCell.isUnderline()) {
                charElement.classList.add(exports.UNDERLINE_CLASS);
            }
            if (this._workCell.isInvisible()) {
                charElement.textContent = Constants_2.WHITESPACE_CELL_CHAR;
            }
            else {
                charElement.textContent = this._workCell.getChars() || Constants_2.WHITESPACE_CELL_CHAR;
            }
            var fg = this._workCell.getFgColor();
            var fgColorMode = this._workCell.getFgColorMode();
            var bg = this._workCell.getBgColor();
            var bgColorMode = this._workCell.getBgColorMode();
            var isInverse = !!this._workCell.isInverse();
            if (isInverse) {
                var temp = fg;
                fg = bg;
                bg = temp;
                var temp2 = fgColorMode;
                fgColorMode = bgColorMode;
                bgColorMode = temp2;
            }
            switch (fgColorMode) {
                case 16777216:
                case 33554432:
                    if (this._workCell.isBold() && fg < 8 && this._optionsService.options.drawBoldTextInBrightColors) {
                        fg += 8;
                    }
                    if (!this._applyMinimumContrast(charElement, this._colors.background, this._colors.ansi[fg])) {
                        charElement.classList.add("xterm-fg-" + fg);
                    }
                    break;
                case 50331648:
                    var color_1 = Color_1.rgba.toColor((fg >> 16) & 0xFF, (fg >> 8) & 0xFF, (fg) & 0xFF);
                    if (!this._applyMinimumContrast(charElement, this._colors.background, color_1)) {
                        this._addStyle(charElement, "color:#" + padStart(fg.toString(16), '0', 6));
                    }
                    break;
                case 0:
                default:
                    if (!this._applyMinimumContrast(charElement, this._colors.background, this._colors.foreground)) {
                        if (isInverse) {
                            charElement.classList.add("xterm-fg-" + Constants_1.INVERTED_DEFAULT_COLOR);
                        }
                    }
            }
            switch (bgColorMode) {
                case 16777216:
                case 33554432:
                    charElement.classList.add("xterm-bg-" + bg);
                    break;
                case 50331648:
                    this._addStyle(charElement, "background-color:#" + padStart(bg.toString(16), '0', 6));
                    break;
                case 0:
                default:
                    if (isInverse) {
                        charElement.classList.add("xterm-bg-" + Constants_1.INVERTED_DEFAULT_COLOR);
                    }
            }
            fragment.appendChild(charElement);
        }
        return fragment;
    };
    DomRendererRowFactory.prototype._applyMinimumContrast = function (element, bg, fg) {
        if (this._optionsService.options.minimumContrastRatio === 1) {
            return false;
        }
        var adjustedColor = this._colors.contrastCache.getColor(this._workCell.bg, this._workCell.fg);
        if (adjustedColor === undefined) {
            adjustedColor = Color_1.color.ensureContrastRatio(bg, fg, this._optionsService.options.minimumContrastRatio);
            this._colors.contrastCache.setColor(this._workCell.bg, this._workCell.fg, adjustedColor !== null && adjustedColor !== void 0 ? adjustedColor : null);
        }
        if (adjustedColor) {
            this._addStyle(element, "color:" + adjustedColor.css);
            return true;
        }
        return false;
    };
    DomRendererRowFactory.prototype._addStyle = function (element, style) {
        element.setAttribute('style', "" + (element.getAttribute('style') || '') + style + ";");
    };
    return DomRendererRowFactory;
}());
exports.DomRendererRowFactory = DomRendererRowFactory;
function padStart(text, padChar, length) {
    while (text.length < length) {
        text = padChar + text;
    }
    return text;
}
//# sourceMappingURL=DomRendererRowFactory.js.map