import { IBufferService, IOptionsService } from 'common/services/Services';
import { IBufferSet, IBuffer } from 'common/buffer/Types';
import { IEvent } from 'common/EventEmitter';
import { Disposable } from 'common/Lifecycle';
export declare const MINIMUM_COLS = 2;
export declare const MINIMUM_ROWS = 1;
export declare class BufferService extends Disposable implements IBufferService {
    private _optionsService;
    serviceBrand: any;
    cols: number;
    rows: number;
    buffers: IBufferSet;
    isUserScrolling: boolean;
    private _onResize;
    get onResize(): IEvent<{
        cols: number;
        rows: number;
    }>;
    get buffer(): IBuffer;
    constructor(_optionsService: IOptionsService);
    dispose(): void;
    resize(cols: number, rows: number): void;
    reset(): void;
}
//# sourceMappingURL=BufferService.d.ts.map