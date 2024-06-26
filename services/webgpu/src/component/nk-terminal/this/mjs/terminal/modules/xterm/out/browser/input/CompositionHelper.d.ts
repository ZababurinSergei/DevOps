import { ICharSizeService } from 'browser/services/Services';
import { IBufferService, ICoreService, IOptionsService } from 'common/services/Services';
export declare class CompositionHelper {
    private readonly _textarea;
    private readonly _compositionView;
    private readonly _bufferService;
    private readonly _optionsService;
    private readonly _charSizeService;
    private readonly _coreService;
    private _isComposing;
    get isComposing(): boolean;
    private _compositionPosition;
    private _isSendingComposition;
    constructor(_textarea: HTMLTextAreaElement, _compositionView: HTMLElement, _bufferService: IBufferService, _optionsService: IOptionsService, _charSizeService: ICharSizeService, _coreService: ICoreService);
    compositionstart(): void;
    compositionupdate(ev: CompositionEvent): void;
    compositionend(): void;
    keydown(ev: KeyboardEvent): boolean;
    private _finalizeComposition;
    private _handleAnyTextareaChanges;
    updateCompositionElements(dontRecurse?: boolean): void;
}
//# sourceMappingURL=CompositionHelper.d.ts.map