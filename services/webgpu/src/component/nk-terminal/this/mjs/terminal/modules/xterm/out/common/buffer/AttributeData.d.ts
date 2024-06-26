import { IAttributeData, IColorRGB, IExtendedAttrs } from 'common/Types';
import { UnderlineStyle } from 'common/buffer/Constants';
export declare class AttributeData implements IAttributeData {
    static toColorRGB(value: number): IColorRGB;
    static fromColorRGB(value: IColorRGB): number;
    clone(): IAttributeData;
    fg: number;
    bg: number;
    extended: ExtendedAttrs;
    isInverse(): number;
    isBold(): number;
    isUnderline(): number;
    isBlink(): number;
    isInvisible(): number;
    isItalic(): number;
    isDim(): number;
    getFgColorMode(): number;
    getBgColorMode(): number;
    isFgRGB(): boolean;
    isBgRGB(): boolean;
    isFgPalette(): boolean;
    isBgPalette(): boolean;
    isFgDefault(): boolean;
    isBgDefault(): boolean;
    isAttributeDefault(): boolean;
    getFgColor(): number;
    getBgColor(): number;
    hasExtendedAttrs(): number;
    updateExtended(): void;
    getUnderlineColor(): number;
    getUnderlineColorMode(): number;
    isUnderlineColorRGB(): boolean;
    isUnderlineColorPalette(): boolean;
    isUnderlineColorDefault(): boolean;
    getUnderlineStyle(): UnderlineStyle;
}
export declare class ExtendedAttrs implements IExtendedAttrs {
    underlineStyle: UnderlineStyle;
    underlineColor: number;
    constructor(underlineStyle?: UnderlineStyle, underlineColor?: number);
    clone(): IExtendedAttrs;
    isEmpty(): boolean;
}
//# sourceMappingURL=AttributeData.d.ts.map