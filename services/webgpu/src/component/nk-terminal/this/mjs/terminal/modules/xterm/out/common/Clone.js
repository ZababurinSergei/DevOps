"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
function clone(val, depth) {
    if (depth === void 0) { depth = 5; }
    if (typeof val !== 'object') {
        return val;
    }
    var clonedObject = Array.isArray(val) ? [] : {};
    for (var key in val) {
        clonedObject[key] = depth <= 1 ? val[key] : (val[key] ? clone(val[key], depth - 1) : val[key]);
    }
    return clonedObject;
}
exports.clone = clone;
//# sourceMappingURL=Clone.js.map