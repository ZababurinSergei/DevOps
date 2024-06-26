import { ILogService, IOptionsService } from 'common/services/Services';
export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    OFF = 4
}
export declare class LogService implements ILogService {
    private readonly _optionsService;
    serviceBrand: any;
    private _logLevel;
    constructor(_optionsService: IOptionsService);
    private _updateLogLevel;
    private _evalLazyOptionalParams;
    private _log;
    debug(message: string, ...optionalParams: any[]): void;
    info(message: string, ...optionalParams: any[]): void;
    warn(message: string, ...optionalParams: any[]): void;
    error(message: string, ...optionalParams: any[]): void;
}
//# sourceMappingURL=LogService.d.ts.map