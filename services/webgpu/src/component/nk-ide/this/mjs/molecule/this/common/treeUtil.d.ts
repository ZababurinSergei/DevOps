import type { UniqueId } from './../../this/common/types';
interface IWithIdProps {
    id: UniqueId;
    children?: any[];
}
interface ITreeInterface<T> {
    /**
     * The count of tree node
     */
    count: number;
    /**
     * The Raw tree data
     */
    obj: T;
    /**
     * Returns the tree informations about the node found by id,
     * Contains
     * - the parent's id
     * - the previous node's id
     * - the next node's id
     * - and the collection of children's id
     * @param id
     */
    getHashMap(id: UniqueId): IMapNode<T> | null;
    /**
     * Returns the node found in tree by id
     * @param id
     */
    getNode(id: UniqueId): T | null;
    /**
     * Remove the node found in tree by id
     * @param id
     */
    removeNode(id: UniqueId): T | null;
    /**
     * Update the node found in tree by id
     * @param id
     * @param extra
     */
    updateNode(id: UniqueId, extra: T): T | null;
    /**
     * Insert an object whose parent node is found by parentId and position is i into the tree
     * @param obj
     * @param parentId
     * @param i
     */
    insertNode(obj: T, parentId: UniqueId, i: number): IMapNode<T> | null;
    /**
     * Insert an object before the destiny node whose id is `destId`
     * @param obj
     * @param destId
     */
    insertBefore(obj: T, destId: UniqueId): IMapNode<T> | null;
    /**
     * Insert an object after the destiny node whose id is `destId`
     * @param obj
     * @param destId
     */
    insertAfter(obj: T, destId: UniqueId): IMapNode<T> | null;
    /**
     * Prepend an object into tree
     * @param obj
     * @param destId
     */
    prepend(obj: T, destId: UniqueId): IMapNode<T> | null;
    /**
     * Append an object into tree
     * @param obj
     * @param destId
     */
    append(obj: T, destId: UniqueId): IMapNode<T> | null;
}
interface IMapNode<T> {
    id: string;
    node: T;
    parent?: string;
    children?: string[];
    prev?: string;
    next?: string;
}
/**
 * A tool for flating tree node.
 *
 * It's convenient to get the relationship between tree nodes.
 *
 * How to get the parent node by current node id
 * @example
 * ```ts
 * const tree = new TreeViewUtil(treeData); // Initialize the tree utils
 * const currentHash = tree.getHashMap(currentNodeId); // Get the current hashmap by current node's id
 * const parentNodeId = currentHash.parent; // This is the parent node's id
 * const parentNode = tree.getNode(parentNodeId); // This is the parent node
 * ```
 *
 * @aware There should be aware of that the id of tree node must be global unique
 */
export declare class TreeViewUtil<T extends IWithIdProps = any> implements ITreeInterface<T> {
    protected hashMap: Map<string, IMapNode<T>>;
    count: number;
    obj: T;
    constructor(obj: T);
    private addMap;
    private generateChildren;
    private generate;
    getHashMap: (id: UniqueId) => IMapNode<T> | null;
    private removeHashMap;
    getNode: (id: UniqueId) => T | null;
    removeNode: (id: UniqueId) => T | null;
    updateNode: (id: UniqueId, extra: Omit<T, 'id' | 'children'>) => T | null;
    private updateChildren;
    insertNode: (obj: T, parentId: UniqueId, i: number) => IMapNode<T> | null;
    insertBefore: (obj: T, destId: UniqueId) => IMapNode<T> | null;
    insertAfter: (obj: T, destId: UniqueId) => IMapNode<T> | null;
    prepend: (obj: T, destId: UniqueId) => IMapNode<T> | null;
    append: (obj: T, destId: UniqueId) => IMapNode<T> | null;
}
export {};
