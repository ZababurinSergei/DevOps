import { ICharacterJoinerRegistry, IRenderDimensions } from 'browser/renderer/Types';
import { BaseRenderLayer } from 'browser/renderer/BaseRenderLayer';
import { IColorSet } from 'browser/Types';
import { IOptionsService, IBufferService } from 'common/services/Services';
export declare class TextRenderLayer extends BaseRenderLayer {
    private _state;
    private _characterWidth;
    private _characterFont;
    private _characterOverlapCache;
    private _characterJoinerRegistry;
    private _workCell;
    constructor(container: HTMLElement, zIndex: number, colors: IColorSet, characterJoinerRegistry: ICharacterJoinerRegistry, alpha: boolean, rendererId: number, bufferService: IBufferService, optionsService: IOptionsService);
    resize(dim: IRenderDimensions): void;
    reset(): void;
    private _forEachCell;
    private _drawBackground;
    private _drawForeground;
    onGridChanged(firstRow: number, lastRow: number): void;
    onOptionsChanged(): void;
    private _isOverlapping;
}
//# sourceMappingURL=TextRenderLayer.d.ts.map