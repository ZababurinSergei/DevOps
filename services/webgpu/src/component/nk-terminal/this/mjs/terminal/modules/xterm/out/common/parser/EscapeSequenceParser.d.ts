import { IParsingState, IDcsHandler, IEscapeSequenceParser, IParams, IOscHandler, IHandlerCollection, CsiHandlerType, OscFallbackHandlerType, IOscParser, EscHandlerType, IDcsParser, DcsFallbackHandlerType, IFunctionIdentifier, ExecuteFallbackHandlerType, CsiFallbackHandlerType, EscFallbackHandlerType, PrintHandlerType, PrintFallbackHandlerType, ExecuteHandlerType } from 'common/parser/Types';
import { ParserState, ParserAction } from 'common/parser/Constants';
import { Disposable } from 'common/Lifecycle';
import { IDisposable } from 'common/Types';
import { Params } from 'common/parser/Params';
export declare class TransitionTable {
    table: Uint8Array;
    constructor(length: number);
    setDefault(action: ParserAction, next: ParserState): void;
    add(code: number, state: ParserState, action: ParserAction, next: ParserState): void;
    addMany(codes: number[], state: ParserState, action: ParserAction, next: ParserState): void;
}
export declare const VT500_TRANSITION_TABLE: TransitionTable;
export declare class EscapeSequenceParser extends Disposable implements IEscapeSequenceParser {
    protected readonly _transitions: TransitionTable;
    initialState: number;
    currentState: number;
    precedingCodepoint: number;
    protected _params: Params;
    protected _collect: number;
    protected _printHandler: PrintHandlerType;
    protected _executeHandlers: {
        [flag: number]: ExecuteHandlerType;
    };
    protected _csiHandlers: IHandlerCollection<CsiHandlerType>;
    protected _escHandlers: IHandlerCollection<EscHandlerType>;
    protected _oscParser: IOscParser;
    protected _dcsParser: IDcsParser;
    protected _errorHandler: (state: IParsingState) => IParsingState;
    protected _printHandlerFb: PrintFallbackHandlerType;
    protected _executeHandlerFb: ExecuteFallbackHandlerType;
    protected _csiHandlerFb: CsiFallbackHandlerType;
    protected _escHandlerFb: EscFallbackHandlerType;
    protected _errorHandlerFb: (state: IParsingState) => IParsingState;
    constructor(_transitions?: TransitionTable);
    protected _identifier(id: IFunctionIdentifier, finalRange?: number[]): number;
    identToString(ident: number): string;
    dispose(): void;
    setPrintHandler(handler: PrintHandlerType): void;
    clearPrintHandler(): void;
    addEscHandler(id: IFunctionIdentifier, handler: EscHandlerType): IDisposable;
    setEscHandler(id: IFunctionIdentifier, handler: EscHandlerType): void;
    clearEscHandler(id: IFunctionIdentifier): void;
    setEscHandlerFallback(handler: EscFallbackHandlerType): void;
    setExecuteHandler(flag: string, handler: ExecuteHandlerType): void;
    clearExecuteHandler(flag: string): void;
    setExecuteHandlerFallback(handler: ExecuteFallbackHandlerType): void;
    addCsiHandler(id: IFunctionIdentifier, handler: CsiHandlerType): IDisposable;
    setCsiHandler(id: IFunctionIdentifier, handler: CsiHandlerType): void;
    clearCsiHandler(id: IFunctionIdentifier): void;
    setCsiHandlerFallback(callback: (ident: number, params: IParams) => void): void;
    addDcsHandler(id: IFunctionIdentifier, handler: IDcsHandler): IDisposable;
    setDcsHandler(id: IFunctionIdentifier, handler: IDcsHandler): void;
    clearDcsHandler(id: IFunctionIdentifier): void;
    setDcsHandlerFallback(handler: DcsFallbackHandlerType): void;
    addOscHandler(ident: number, handler: IOscHandler): IDisposable;
    setOscHandler(ident: number, handler: IOscHandler): void;
    clearOscHandler(ident: number): void;
    setOscHandlerFallback(handler: OscFallbackHandlerType): void;
    setErrorHandler(callback: (state: IParsingState) => IParsingState): void;
    clearErrorHandler(): void;
    reset(): void;
    parse(data: Uint32Array, length: number): void;
}
//# sourceMappingURL=EscapeSequenceParser.d.ts.map