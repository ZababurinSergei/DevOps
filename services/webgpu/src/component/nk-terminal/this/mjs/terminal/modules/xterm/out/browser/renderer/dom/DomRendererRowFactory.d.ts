import { IBufferLine } from 'common/Types';
import { IOptionsService } from 'common/services/Services';
import { IColorSet } from 'browser/Types';
export declare const BOLD_CLASS = "xterm-bold";
export declare const DIM_CLASS = "xterm-dim";
export declare const ITALIC_CLASS = "xterm-italic";
export declare const UNDERLINE_CLASS = "xterm-underline";
export declare const CURSOR_CLASS = "xterm-cursor";
export declare const CURSOR_BLINK_CLASS = "xterm-cursor-blink";
export declare const CURSOR_STYLE_BLOCK_CLASS = "xterm-cursor-block";
export declare const CURSOR_STYLE_BAR_CLASS = "xterm-cursor-bar";
export declare const CURSOR_STYLE_UNDERLINE_CLASS = "xterm-cursor-underline";
export declare class DomRendererRowFactory {
    private readonly _document;
    private readonly _optionsService;
    private _colors;
    private _workCell;
    constructor(_document: Document, _optionsService: IOptionsService, _colors: IColorSet);
    setColors(colors: IColorSet): void;
    createRow(lineData: IBufferLine, isCursorRow: boolean, cursorStyle: string | undefined, cursorX: number, cursorBlink: boolean, cellWidth: number, cols: number): DocumentFragment;
    private _applyMinimumContrast;
    private _addStyle;
}
//# sourceMappingURL=DomRendererRowFactory.d.ts.map