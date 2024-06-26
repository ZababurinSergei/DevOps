"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUnicodeService = exports.IOptionsService = exports.ILogService = exports.IInstantiationService = exports.IDirtyRowService = exports.ICharsetService = exports.ICoreService = exports.ICoreMouseService = exports.IBufferService = void 0;
var ServiceRegistry_1 = require("common/services/ServiceRegistry");
exports.IBufferService = ServiceRegistry_1.createDecorator('BufferService');
exports.ICoreMouseService = ServiceRegistry_1.createDecorator('CoreMouseService');
exports.ICoreService = ServiceRegistry_1.createDecorator('CoreService');
exports.ICharsetService = ServiceRegistry_1.createDecorator('CharsetService');
exports.IDirtyRowService = ServiceRegistry_1.createDecorator('DirtyRowService');
exports.IInstantiationService = ServiceRegistry_1.createDecorator('InstantiationService');
exports.ILogService = ServiceRegistry_1.createDecorator('LogService');
exports.IOptionsService = ServiceRegistry_1.createDecorator('OptionsService');
exports.IUnicodeService = ServiceRegistry_1.createDecorator('UnicodeService');
//# sourceMappingURL=Services.js.map