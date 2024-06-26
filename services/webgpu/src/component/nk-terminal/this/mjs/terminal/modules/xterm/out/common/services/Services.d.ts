import { IEvent } from 'common/EventEmitter';
import { IBuffer, IBufferSet } from 'common/buffer/Types';
import { IDecPrivateModes, ICoreMouseEvent, CoreMouseEncoding, ICoreMouseProtocol, CoreMouseEventType, ICharset, IWindowOptions, IModes } from 'common/Types';
export declare const IBufferService: IServiceIdentifier<IBufferService>;
export interface IBufferService {
    serviceBrand: undefined;
    readonly cols: number;
    readonly rows: number;
    readonly buffer: IBuffer;
    readonly buffers: IBufferSet;
    isUserScrolling: boolean;
    onResize: IEvent<{
        cols: number;
        rows: number;
    }>;
    resize(cols: number, rows: number): void;
    reset(): void;
}
export declare const ICoreMouseService: IServiceIdentifier<ICoreMouseService>;
export interface ICoreMouseService {
    activeProtocol: string;
    activeEncoding: string;
    areMouseEventsActive: boolean;
    addProtocol(name: string, protocol: ICoreMouseProtocol): void;
    addEncoding(name: string, encoding: CoreMouseEncoding): void;
    reset(): void;
    triggerMouseEvent(event: ICoreMouseEvent): boolean;
    onProtocolChange: IEvent<CoreMouseEventType>;
    explainEvents(events: CoreMouseEventType): {
        [event: string]: boolean;
    };
}
export declare const ICoreService: IServiceIdentifier<ICoreService>;
export interface ICoreService {
    serviceBrand: undefined;
    isCursorInitialized: boolean;
    isCursorHidden: boolean;
    readonly modes: IModes;
    readonly decPrivateModes: IDecPrivateModes;
    readonly onData: IEvent<string>;
    readonly onUserInput: IEvent<void>;
    readonly onBinary: IEvent<string>;
    reset(): void;
    triggerDataEvent(data: string, wasUserInput?: boolean): void;
    triggerBinaryEvent(data: string): void;
}
export declare const ICharsetService: IServiceIdentifier<ICharsetService>;
export interface ICharsetService {
    serviceBrand: undefined;
    charset: ICharset | undefined;
    readonly glevel: number;
    reset(): void;
    setgLevel(g: number): void;
    setgCharset(g: number, charset: ICharset | undefined): void;
}
export declare const IDirtyRowService: IServiceIdentifier<IDirtyRowService>;
export interface IDirtyRowService {
    serviceBrand: undefined;
    readonly start: number;
    readonly end: number;
    clearRange(): void;
    markDirty(y: number): void;
    markRangeDirty(y1: number, y2: number): void;
    markAllDirty(): void;
}
export interface IServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}
export interface IBrandedService {
    serviceBrand: undefined;
}
declare type GetLeadingNonServiceArgs<Args> = Args extends [...IBrandedService[]] ? [] : Args extends [infer A1, ...IBrandedService[]] ? [A1] : Args extends [infer A1, infer A2, ...IBrandedService[]] ? [A1, A2] : Args extends [infer A1, infer A2, infer A3, ...IBrandedService[]] ? [A1, A2, A3] : Args extends [infer A1, infer A2, infer A3, infer A4, ...IBrandedService[]] ? [A1, A2, A3, A4] : Args extends [infer A1, infer A2, infer A3, infer A4, infer A5, ...IBrandedService[]] ? [A1, A2, A3, A4, A5] : Args extends [infer A1, infer A2, infer A3, infer A4, infer A5, infer A6, ...IBrandedService[]] ? [A1, A2, A3, A4, A5, A6] : Args extends [infer A1, infer A2, infer A3, infer A4, infer A5, infer A6, infer A7, ...IBrandedService[]] ? [A1, A2, A3, A4, A5, A6, A7] : Args extends [infer A1, infer A2, infer A3, infer A4, infer A5, infer A6, infer A7, infer A8, ...IBrandedService[]] ? [A1, A2, A3, A4, A5, A6, A7, A8] : never;
export declare const IInstantiationService: IServiceIdentifier<IInstantiationService>;
export interface IInstantiationService {
    setService<T>(id: IServiceIdentifier<T>, instance: T): void;
    getService<T>(id: IServiceIdentifier<T>): T | undefined;
    createInstance<Ctor extends new (...args: any[]) => any, R extends InstanceType<Ctor>>(t: Ctor, ...args: GetLeadingNonServiceArgs<ConstructorParameters<Ctor>>): R;
}
export declare const ILogService: IServiceIdentifier<ILogService>;
export interface ILogService {
    serviceBrand: undefined;
    debug(message: any, ...optionalParams: any[]): void;
    info(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
}
export declare const IOptionsService: IServiceIdentifier<IOptionsService>;
export interface IOptionsService {
    serviceBrand: undefined;
    readonly options: ITerminalOptions;
    readonly onOptionChange: IEvent<string>;
    setOption<T>(key: string, value: T): void;
    getOption<T>(key: string): T | undefined;
}
export declare type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | number;
export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';
export declare type RendererType = 'dom' | 'canvas';
export interface IPartialTerminalOptions {
    allowTransparency?: boolean;
    bellSound?: string;
    bellStyle?: 'none' | 'sound';
    cols?: number;
    cursorBlink?: boolean;
    cursorStyle?: 'block' | 'underline' | 'bar';
    cursorWidth?: number;
    disableStdin?: boolean;
    drawBoldTextInBrightColors?: boolean;
    fastScrollModifier?: 'alt' | 'ctrl' | 'shift';
    fastScrollSensitivity?: number;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: FontWeight;
    fontWeightBold?: FontWeight;
    letterSpacing?: number;
    lineHeight?: number;
    logLevel?: LogLevel;
    macOptionIsMeta?: boolean;
    macOptionClickForcesSelection?: boolean;
    rendererType?: RendererType;
    rightClickSelectsWord?: boolean;
    rows?: number;
    screenReaderMode?: boolean;
    scrollback?: number;
    scrollSensitivity?: number;
    tabStopWidth?: number;
    theme?: ITheme;
    windowsMode?: boolean;
    wordSeparator?: string;
    windowOptions?: IWindowOptions;
}
export interface ITerminalOptions {
    allowProposedApi: boolean;
    allowTransparency: boolean;
    bellSound: string;
    bellStyle: 'none' | 'sound';
    cols: number;
    cursorBlink: boolean;
    cursorStyle: 'block' | 'underline' | 'bar';
    cursorWidth: number;
    disableStdin: boolean;
    drawBoldTextInBrightColors: boolean;
    fastScrollModifier: 'alt' | 'ctrl' | 'shift' | undefined;
    fastScrollSensitivity: number;
    fontSize: number;
    fontFamily: string;
    fontWeight: FontWeight;
    fontWeightBold: FontWeight;
    letterSpacing: number;
    lineHeight: number;
    linkTooltipHoverDuration: number;
    logLevel: LogLevel;
    macOptionIsMeta: boolean;
    macOptionClickForcesSelection: boolean;
    minimumContrastRatio: number;
    rendererType: RendererType;
    rightClickSelectsWord: boolean;
    rows: number;
    screenReaderMode: boolean;
    scrollback: number;
    scrollSensitivity: number;
    tabStopWidth: number;
    theme: ITheme;
    windowsMode: boolean;
    windowOptions: IWindowOptions;
    wordSeparator: string;
    [key: string]: any;
    cancelEvents: boolean;
    convertEol: boolean;
    termName: string;
}
export interface ITheme {
    foreground?: string;
    background?: string;
    cursor?: string;
    cursorAccent?: string;
    selection?: string;
    black?: string;
    red?: string;
    green?: string;
    yellow?: string;
    blue?: string;
    magenta?: string;
    cyan?: string;
    white?: string;
    brightBlack?: string;
    brightRed?: string;
    brightGreen?: string;
    brightYellow?: string;
    brightBlue?: string;
    brightMagenta?: string;
    brightCyan?: string;
    brightWhite?: string;
}
export declare const IUnicodeService: IServiceIdentifier<IUnicodeService>;
export interface IUnicodeService {
    serviceBrand: undefined;
    register(provider: IUnicodeVersionProvider): void;
    readonly versions: string[];
    activeVersion: string;
    readonly onChange: IEvent<string>;
    wcwidth(codepoint: number): number;
    getStringCellWidth(s: string): number;
}
export interface IUnicodeVersionProvider {
    readonly version: string;
    wcwidth(ucs: number): 0 | 1 | 2;
}
export {};
//# sourceMappingURL=Services.d.ts.map