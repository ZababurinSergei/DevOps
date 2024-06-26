import { IOscHandler, OscFallbackHandlerType, IOscParser } from 'common/parser/Types';
import { IDisposable } from 'common/Types';
export declare class OscParser implements IOscParser {
    private _state;
    private _id;
    private _handlers;
    private _handlerFb;
    addHandler(ident: number, handler: IOscHandler): IDisposable;
    setHandler(ident: number, handler: IOscHandler): void;
    clearHandler(ident: number): void;
    setHandlerFallback(handler: OscFallbackHandlerType): void;
    dispose(): void;
    reset(): void;
    private _start;
    private _put;
    private _end;
    start(): void;
    put(data: Uint32Array, start: number, end: number): void;
    end(success: boolean): void;
}
export declare class OscHandler implements IOscHandler {
    private _handler;
    private _data;
    private _hitLimit;
    constructor(_handler: (data: string) => any);
    start(): void;
    put(data: Uint32Array, start: number, end: number): void;
    end(success: boolean): any;
}
//# sourceMappingURL=OscParser.d.ts.map