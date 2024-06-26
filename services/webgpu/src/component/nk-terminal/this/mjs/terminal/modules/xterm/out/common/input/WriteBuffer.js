"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteBuffer = void 0;
var DISCARD_WATERMARK = 50000000;
var WRITE_TIMEOUT_MS = 12;
var WRITE_BUFFER_LENGTH_THRESHOLD = 50;
var WriteBuffer = (function () {
    function WriteBuffer(_action) {
        this._action = _action;
        this._writeBuffer = [];
        this._callbacks = [];
        this._pendingData = 0;
        this._bufferOffset = 0;
    }
    WriteBuffer.prototype.writeSync = function (data) {
        if (this._writeBuffer.length) {
            for (var i = this._bufferOffset; i < this._writeBuffer.length; ++i) {
                var data_1 = this._writeBuffer[i];
                var cb = this._callbacks[i];
                this._action(data_1);
                if (cb)
                    cb();
            }
            this._writeBuffer = [];
            this._callbacks = [];
            this._pendingData = 0;
            this._bufferOffset = 0x7FFFFFFF;
        }
        this._action(data);
    };
    WriteBuffer.prototype.write = function (data, callback) {
        var _this = this;
        if (this._pendingData > DISCARD_WATERMARK) {
            throw new Error('write data discarded, use flow control to avoid losing data');
        }
        if (!this._writeBuffer.length) {
            this._bufferOffset = 0;
            setTimeout(function () { return _this._innerWrite(); });
        }
        this._pendingData += data.length;
        this._writeBuffer.push(data);
        this._callbacks.push(callback);
    };
    WriteBuffer.prototype._innerWrite = function () {
        var _this = this;
        var startTime = Date.now();
        while (this._writeBuffer.length > this._bufferOffset) {
            var data = this._writeBuffer[this._bufferOffset];
            var cb = this._callbacks[this._bufferOffset];
            this._bufferOffset++;
            this._action(data);
            this._pendingData -= data.length;
            if (cb)
                cb();
            if (Date.now() - startTime >= WRITE_TIMEOUT_MS) {
                break;
            }
        }
        if (this._writeBuffer.length > this._bufferOffset) {
            if (this._bufferOffset > WRITE_BUFFER_LENGTH_THRESHOLD) {
                this._writeBuffer = this._writeBuffer.slice(this._bufferOffset);
                this._callbacks = this._callbacks.slice(this._bufferOffset);
                this._bufferOffset = 0;
            }
            setTimeout(function () { return _this._innerWrite(); }, 0);
        }
        else {
            this._writeBuffer = [];
            this._callbacks = [];
            this._pendingData = 0;
            this._bufferOffset = 0;
        }
    };
    return WriteBuffer;
}());
exports.WriteBuffer = WriteBuffer;
//# sourceMappingURL=WriteBuffer.js.map