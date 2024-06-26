export declare class WriteBuffer {
    private _action;
    private _writeBuffer;
    private _callbacks;
    private _pendingData;
    private _bufferOffset;
    constructor(_action: (data: string | Uint8Array) => void);
    writeSync(data: string | Uint8Array): void;
    write(data: string | Uint8Array, callback?: () => void): void;
    protected _innerWrite(): void;
}
//# sourceMappingURL=WriteBuffer.d.ts.map