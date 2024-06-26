import type { UniqueId } from './../../this/common/types';
import { ITreeNodeItemProps } from './../../this/components';
export declare enum MarkerSeverity {
    Hint = 1,
    Info = 2,
    Warning = 4,
    Error = 8
}
export declare enum ProblemsEvent {
    onSelect = "problems.onSelect"
}
export interface IRelatedInformation {
    code: string;
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    status: MarkerSeverity;
}
export interface IProblemsItem<T = any> extends ITreeNodeItemProps {
    value: IRelatedInformation;
    children: IProblemsItem[];
}
export interface IProblemsTreeNode<T = any> extends ITreeNodeItemProps {
    value?: IRelatedInformation;
    children?: IProblemsTreeNode[];
}
export interface IProblems<T = any> {
    id: UniqueId;
    name: string;
    data: IProblemsItem<T>[];
    show?: boolean;
    onSelect?: (node: IProblemsTreeNode) => void;
}
export declare class ProblemsModel<T> implements IProblems<T> {
    id: UniqueId;
    name: string;
    data: IProblemsItem<T>[];
    show: boolean;
    constructor(id?: UniqueId, name?: string, data?: IProblemsItem<T>[], show?: boolean);
}
