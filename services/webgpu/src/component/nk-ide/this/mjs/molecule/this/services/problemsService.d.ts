import 'reflect-metadata';
import { IProblems, IProblemsItem, IProblemsTreeNode } from './../../this/model/problems';
import { Component } from './../../this/react';
import type { UniqueId } from './../../this/common/types';
export interface IProblemsService extends Component<IProblems> {
    /**
     * Add single or multiple items data
     * @param data
     */
    add(data: IProblemsItem | IProblemsItem[]): void;
    /**
     * Remove the specific problem items
     * @param id single or multiple ids
     */
    remove(id: UniqueId | UniqueId[]): void;
    /**
     * Reset the ProblemsService state data
     */
    reset(): void;
    /**
     * Update the specific data
     * @param data single or multiple problems
     */
    update<T>(data: IProblemsItem<T> | IProblemsItem<T>[]): void;
    /**
     * Toggle the Problems view between display or hidden
     */
    toggleProblems(): void;
    /**
     * Listen to select a problem tree node
     * @param callback
     */
    onSelect(callback: (node: IProblemsTreeNode) => void): void;
}
export declare class ProblemsService extends Component<IProblems> implements IProblemsService {
    protected state: IProblems;
    private readonly statusBarService;
    private readonly builtinService;
    constructor();
    toggleProblems(): void;
    add<T>(item: IProblemsItem<T> | IProblemsItem<T>[]): void;
    update<T>(item: IProblemsItem<T> | IProblemsItem<T>[]): void;
    remove(id: UniqueId | UniqueId[]): void;
    reset(): void;
    onSelect(callback: (node: IProblemsTreeNode) => void): void;
    private updateStatusBar;
    private updateStatus;
    private getProblemsMarkers;
}
