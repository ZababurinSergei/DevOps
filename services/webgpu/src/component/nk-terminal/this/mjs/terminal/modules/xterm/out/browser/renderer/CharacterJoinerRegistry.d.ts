import { ICellData, CharData } from 'common/Types';
import { ICharacterJoinerRegistry } from 'browser/renderer/Types';
import { AttributeData } from 'common/buffer/AttributeData';
import { IBufferService } from 'common/services/Services';
export declare class JoinedCellData extends AttributeData implements ICellData {
    private _width;
    content: number;
    fg: number;
    bg: number;
    combinedData: string;
    constructor(firstCell: ICellData, chars: string, width: number);
    isCombined(): number;
    getWidth(): number;
    getChars(): string;
    getCode(): number;
    setFromCharData(value: CharData): void;
    getAsCharData(): CharData;
}
export declare class CharacterJoinerRegistry implements ICharacterJoinerRegistry {
    private _bufferService;
    private _characterJoiners;
    private _nextCharacterJoinerId;
    private _workCell;
    constructor(_bufferService: IBufferService);
    registerCharacterJoiner(handler: (text: string) => [number, number][]): number;
    deregisterCharacterJoiner(joinerId: number): boolean;
    getJoinedCharacters(row: number): [number, number][];
    private _getJoinedRanges;
    private _stringRangesToCellRanges;
    private static _mergeRanges;
}
//# sourceMappingURL=CharacterJoinerRegistry.d.ts.map