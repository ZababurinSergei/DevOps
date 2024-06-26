"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferLine = exports.DEFAULT_ATTR_DATA = void 0;
var TextDecoder_1 = require("common/input/TextDecoder");
var Constants_1 = require("common/buffer/Constants");
var CellData_1 = require("common/buffer/CellData");
var AttributeData_1 = require("common/buffer/AttributeData");
var CELL_SIZE = 3;
exports.DEFAULT_ATTR_DATA = Object.freeze(new AttributeData_1.AttributeData());
var BufferLine = (function () {
    function BufferLine(cols, fillCellData, isWrapped) {
        if (isWrapped === void 0) { isWrapped = false; }
        this.isWrapped = isWrapped;
        this._combined = {};
        this._extendedAttrs = {};
        this._data = new Uint32Array(cols * CELL_SIZE);
        var cell = fillCellData || CellData_1.CellData.fromCharData([0, Constants_1.NULL_CELL_CHAR, Constants_1.NULL_CELL_WIDTH, Constants_1.NULL_CELL_CODE]);
        for (var i = 0; i < cols; ++i) {
            this.setCell(i, cell);
        }
        this.length = cols;
    }
    BufferLine.prototype.get = function (index) {
        var content = this._data[index * CELL_SIZE + 0];
        var cp = content & 2097151;
        return [
            this._data[index * CELL_SIZE + 1],
            (content & 2097152)
                ? this._combined[index]
                : (cp) ? TextDecoder_1.stringFromCodePoint(cp) : '',
            content >> 22,
            (content & 2097152)
                ? this._combined[index].charCodeAt(this._combined[index].length - 1)
                : cp
        ];
    };
    BufferLine.prototype.set = function (index, value) {
        this._data[index * CELL_SIZE + 1] = value[Constants_1.CHAR_DATA_ATTR_INDEX];
        if (value[Constants_1.CHAR_DATA_CHAR_INDEX].length > 1) {
            this._combined[index] = value[1];
            this._data[index * CELL_SIZE + 0] = index | 2097152 | (value[Constants_1.CHAR_DATA_WIDTH_INDEX] << 22);
        }
        else {
            this._data[index * CELL_SIZE + 0] = value[Constants_1.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | (value[Constants_1.CHAR_DATA_WIDTH_INDEX] << 22);
        }
    };
    BufferLine.prototype.getWidth = function (index) {
        return this._data[index * CELL_SIZE + 0] >> 22;
    };
    BufferLine.prototype.hasWidth = function (index) {
        return this._data[index * CELL_SIZE + 0] & 12582912;
    };
    BufferLine.prototype.getFg = function (index) {
        return this._data[index * CELL_SIZE + 1];
    };
    BufferLine.prototype.getBg = function (index) {
        return this._data[index * CELL_SIZE + 2];
    };
    BufferLine.prototype.hasContent = function (index) {
        return this._data[index * CELL_SIZE + 0] & 4194303;
    };
    BufferLine.prototype.getCodePoint = function (index) {
        var content = this._data[index * CELL_SIZE + 0];
        if (content & 2097152) {
            return this._combined[index].charCodeAt(this._combined[index].length - 1);
        }
        return content & 2097151;
    };
    BufferLine.prototype.isCombined = function (index) {
        return this._data[index * CELL_SIZE + 0] & 2097152;
    };
    BufferLine.prototype.getString = function (index) {
        var content = this._data[index * CELL_SIZE + 0];
        if (content & 2097152) {
            return this._combined[index];
        }
        if (content & 2097151) {
            return TextDecoder_1.stringFromCodePoint(content & 2097151);
        }
        return '';
    };
    BufferLine.prototype.loadCell = function (index, cell) {
        var startIndex = index * CELL_SIZE;
        cell.content = this._data[startIndex + 0];
        cell.fg = this._data[startIndex + 1];
        cell.bg = this._data[startIndex + 2];
        if (cell.content & 2097152) {
            cell.combinedData = this._combined[index];
        }
        if (cell.bg & 268435456) {
            cell.extended = this._extendedAttrs[index];
        }
        return cell;
    };
    BufferLine.prototype.setCell = function (index, cell) {
        if (cell.content & 2097152) {
            this._combined[index] = cell.combinedData;
        }
        if (cell.bg & 268435456) {
            this._extendedAttrs[index] = cell.extended;
        }
        this._data[index * CELL_SIZE + 0] = cell.content;
        this._data[index * CELL_SIZE + 1] = cell.fg;
        this._data[index * CELL_SIZE + 2] = cell.bg;
    };
    BufferLine.prototype.setCellFromCodePoint = function (index, codePoint, width, fg, bg, eAttrs) {
        if (bg & 268435456) {
            this._extendedAttrs[index] = eAttrs;
        }
        this._data[index * CELL_SIZE + 0] = codePoint | (width << 22);
        this._data[index * CELL_SIZE + 1] = fg;
        this._data[index * CELL_SIZE + 2] = bg;
    };
    BufferLine.prototype.addCodepointToCell = function (index, codePoint) {
        var content = this._data[index * CELL_SIZE + 0];
        if (content & 2097152) {
            this._combined[index] += TextDecoder_1.stringFromCodePoint(codePoint);
        }
        else {
            if (content & 2097151) {
                this._combined[index] = TextDecoder_1.stringFromCodePoint(content & 2097151) + TextDecoder_1.stringFromCodePoint(codePoint);
                content &= ~2097151;
                content |= 2097152;
            }
            else {
                content = codePoint | (1 << 22);
            }
            this._data[index * CELL_SIZE + 0] = content;
        }
    };
    BufferLine.prototype.insertCells = function (pos, n, fillCellData, eraseAttr) {
        pos %= this.length;
        if (pos && this.getWidth(pos - 1) === 2) {
            this.setCellFromCodePoint(pos - 1, 0, 1, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.fg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.bg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.extended) || new AttributeData_1.ExtendedAttrs());
        }
        if (n < this.length - pos) {
            var cell = new CellData_1.CellData();
            for (var i = this.length - pos - n - 1; i >= 0; --i) {
                this.setCell(pos + n + i, this.loadCell(pos + i, cell));
            }
            for (var i = 0; i < n; ++i) {
                this.setCell(pos + i, fillCellData);
            }
        }
        else {
            for (var i = pos; i < this.length; ++i) {
                this.setCell(i, fillCellData);
            }
        }
        if (this.getWidth(this.length - 1) === 2) {
            this.setCellFromCodePoint(this.length - 1, 0, 1, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.fg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.bg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.extended) || new AttributeData_1.ExtendedAttrs());
        }
    };
    BufferLine.prototype.deleteCells = function (pos, n, fillCellData, eraseAttr) {
        pos %= this.length;
        if (n < this.length - pos) {
            var cell = new CellData_1.CellData();
            for (var i = 0; i < this.length - pos - n; ++i) {
                this.setCell(pos + i, this.loadCell(pos + n + i, cell));
            }
            for (var i = this.length - n; i < this.length; ++i) {
                this.setCell(i, fillCellData);
            }
        }
        else {
            for (var i = pos; i < this.length; ++i) {
                this.setCell(i, fillCellData);
            }
        }
        if (pos && this.getWidth(pos - 1) === 2) {
            this.setCellFromCodePoint(pos - 1, 0, 1, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.fg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.bg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.extended) || new AttributeData_1.ExtendedAttrs());
        }
        if (this.getWidth(pos) === 0 && !this.hasContent(pos)) {
            this.setCellFromCodePoint(pos, 0, 1, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.fg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.bg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.extended) || new AttributeData_1.ExtendedAttrs());
        }
    };
    BufferLine.prototype.replaceCells = function (start, end, fillCellData, eraseAttr) {
        if (start && this.getWidth(start - 1) === 2) {
            this.setCellFromCodePoint(start - 1, 0, 1, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.fg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.bg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.extended) || new AttributeData_1.ExtendedAttrs());
        }
        if (end < this.length && this.getWidth(end - 1) === 2) {
            this.setCellFromCodePoint(end, 0, 1, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.fg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.bg) || 0, (eraseAttr === null || eraseAttr === void 0 ? void 0 : eraseAttr.extended) || new AttributeData_1.ExtendedAttrs());
        }
        while (start < end && start < this.length) {
            this.setCell(start++, fillCellData);
        }
    };
    BufferLine.prototype.resize = function (cols, fillCellData) {
        if (cols === this.length) {
            return;
        }
        if (cols > this.length) {
            var data = new Uint32Array(cols * CELL_SIZE);
            if (this.length) {
                if (cols * CELL_SIZE < this._data.length) {
                    data.set(this._data.subarray(0, cols * CELL_SIZE));
                }
                else {
                    data.set(this._data);
                }
            }
            this._data = data;
            for (var i = this.length; i < cols; ++i) {
                this.setCell(i, fillCellData);
            }
        }
        else {
            if (cols) {
                var data = new Uint32Array(cols * CELL_SIZE);
                data.set(this._data.subarray(0, cols * CELL_SIZE));
                this._data = data;
                var keys = Object.keys(this._combined);
                for (var i = 0; i < keys.length; i++) {
                    var key = parseInt(keys[i], 10);
                    if (key >= cols) {
                        delete this._combined[key];
                    }
                }
            }
            else {
                this._data = new Uint32Array(0);
                this._combined = {};
            }
        }
        this.length = cols;
    };
    BufferLine.prototype.fill = function (fillCellData) {
        this._combined = {};
        this._extendedAttrs = {};
        for (var i = 0; i < this.length; ++i) {
            this.setCell(i, fillCellData);
        }
    };
    BufferLine.prototype.copyFrom = function (line) {
        if (this.length !== line.length) {
            this._data = new Uint32Array(line._data);
        }
        else {
            this._data.set(line._data);
        }
        this.length = line.length;
        this._combined = {};
        for (var el in line._combined) {
            this._combined[el] = line._combined[el];
        }
        this._extendedAttrs = {};
        for (var el in line._extendedAttrs) {
            this._extendedAttrs[el] = line._extendedAttrs[el];
        }
        this.isWrapped = line.isWrapped;
    };
    BufferLine.prototype.clone = function () {
        var newLine = new BufferLine(0);
        newLine._data = new Uint32Array(this._data);
        newLine.length = this.length;
        for (var el in this._combined) {
            newLine._combined[el] = this._combined[el];
        }
        for (var el in this._extendedAttrs) {
            newLine._extendedAttrs[el] = this._extendedAttrs[el];
        }
        newLine.isWrapped = this.isWrapped;
        return newLine;
    };
    BufferLine.prototype.getTrimmedLength = function () {
        for (var i = this.length - 1; i >= 0; --i) {
            if ((this._data[i * CELL_SIZE + 0] & 4194303)) {
                return i + (this._data[i * CELL_SIZE + 0] >> 22);
            }
        }
        return 0;
    };
    BufferLine.prototype.copyCellsFrom = function (src, srcCol, destCol, length, applyInReverse) {
        var srcData = src._data;
        if (applyInReverse) {
            for (var cell = length - 1; cell >= 0; cell--) {
                for (var i = 0; i < CELL_SIZE; i++) {
                    this._data[(destCol + cell) * CELL_SIZE + i] = srcData[(srcCol + cell) * CELL_SIZE + i];
                }
            }
        }
        else {
            for (var cell = 0; cell < length; cell++) {
                for (var i = 0; i < CELL_SIZE; i++) {
                    this._data[(destCol + cell) * CELL_SIZE + i] = srcData[(srcCol + cell) * CELL_SIZE + i];
                }
            }
        }
        var srcCombinedKeys = Object.keys(src._combined);
        for (var i = 0; i < srcCombinedKeys.length; i++) {
            var key = parseInt(srcCombinedKeys[i], 10);
            if (key >= srcCol) {
                this._combined[key - srcCol + destCol] = src._combined[key];
            }
        }
    };
    BufferLine.prototype.translateToString = function (trimRight, startCol, endCol) {
        if (trimRight === void 0) { trimRight = false; }
        if (startCol === void 0) { startCol = 0; }
        if (endCol === void 0) { endCol = this.length; }
        if (trimRight) {
            endCol = Math.min(endCol, this.getTrimmedLength());
        }
        var result = '';
        while (startCol < endCol) {
            var content = this._data[startCol * CELL_SIZE + 0];
            var cp = content & 2097151;
            result += (content & 2097152) ? this._combined[startCol] : (cp) ? TextDecoder_1.stringFromCodePoint(cp) : Constants_1.WHITESPACE_CELL_CHAR;
            startCol += (content >> 22) || 1;
        }
        return result;
    };
    return BufferLine;
}());
exports.BufferLine = BufferLine;
//# sourceMappingURL=BufferLine.js.map