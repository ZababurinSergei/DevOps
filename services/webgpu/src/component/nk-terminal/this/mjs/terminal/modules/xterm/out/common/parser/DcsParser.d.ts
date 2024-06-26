import { IDisposable } from 'common/Types';
import { IDcsHandler, IParams, IDcsParser, DcsFallbackHandlerType } from 'common/parser/Types';
export declare class DcsParser implements IDcsParser {
    private _handlers;
    private _active;
    private _ident;
    private _handlerFb;
    dispose(): void;
    addHandler(ident: number, handler: IDcsHandler): IDisposable;
    setHandler(ident: number, handler: IDcsHandler): void;
    clearHandler(ident: number): void;
    setHandlerFallback(handler: DcsFallbackHandlerType): void;
    reset(): void;
    hook(ident: number, params: IParams): void;
    put(data: Uint32Array, start: number, end: number): void;
    unhook(success: boolean): void;
}
export declare class DcsHandler implements IDcsHandler {
    private _handler;
    private _data;
    private _params;
    private _hitLimit;
    constructor(_handler: (data: string, params: IParams) => any);
    hook(params: IParams): void;
    put(data: Uint32Array, start: number, end: number): void;
    unhook(success: boolean): any;
}
//# sourceMappingURL=DcsParser.d.ts.map