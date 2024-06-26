import cloneDeep from 'lodash/cloneDeep';
import logger from './logger';
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
export class TreeViewUtil {
    constructor(obj) {
        this.hashMap = new Map();
        this.count = 0;
        this.getHashMap = (id) => {
            return this.hashMap.get(id.toString()) || null;
        };
        this.removeHashMap = (id) => {
            var _a;
            const source = this.hashMap.get(id.toString());
            if (source) {
                this.hashMap.delete(id.toString());
                if ((_a = source.children) === null || _a === void 0 ? void 0 : _a.length) {
                    source.children.forEach((child) => {
                        this.removeHashMap(child);
                    });
                }
            }
        };
        this.getNode = (id) => {
            const hash = this.getHashMap(id);
            return (hash === null || hash === void 0 ? void 0 : hash.node) || null;
        };
        this.removeNode = (id) => {
            var _a, _b;
            const hash = this.getHashMap(id);
            if (hash) {
                const { node, parent } = hash;
                if (!parent) {
                    logger.error("You're going to remove a root node");
                    return null;
                }
                const parentHash = this.getHashMap(parent);
                const parentNode = parentHash === null || parentHash === void 0 ? void 0 : parentHash.node;
                if (parentNode) {
                    (_a = parentNode.children) === null || _a === void 0 ? void 0 : _a.splice(parentNode.children.indexOf(node), 1);
                    (_b = parentHash.children) === null || _b === void 0 ? void 0 : _b.splice(parentHash.children.indexOf(id.toString()), 1);
                    this.removeHashMap(id);
                    this.updateChildren(parentHash.children);
                    return node;
                }
            }
            return null;
        };
        this.updateNode = (id, extra) => {
            const node = this.getNode(id);
            if (node) {
                Object.assign(node, extra);
                return node;
            }
            return null;
        };
        this.insertNode = (obj, parentId, i) => {
            const parentHash = this.getHashMap(parentId);
            if (parentHash) {
                const parentNode = parentHash.node;
                const hashMap = this.generate(obj);
                hashMap.parent = parentId.toString();
                parentNode.children = parentNode.children || [];
                parentHash.children = parentHash.children || [];
                parentNode.children.splice(i, 0, obj);
                parentHash.children.splice(i, 0, hashMap.id);
                this.updateChildren(parentHash.children);
                if (parentHash.parent) {
                    const grandParent = this.getHashMap(parentHash.parent);
                    grandParent && this.updateChildren(grandParent.children);
                }
                return hashMap;
            }
            return null;
        };
        this.insertBefore = (obj, destId) => {
            const destinyHash = this.getHashMap(destId);
            if (destinyHash) {
                const parentId = destinyHash.parent;
                if (!parentId) {
                    logger.error("You're going to insert a obj before the root node");
                    return null;
                }
                const parentHash = this.getHashMap(parentId);
                if (parentHash) {
                    const index = (parentHash.children || []).indexOf(destId.toString());
                    return this.insertNode(obj, parentId, index);
                }
            }
            return null;
        };
        this.insertAfter = (obj, destId) => {
            const destinyHash = this.getHashMap(destId);
            if (destinyHash) {
                const parentId = destinyHash.parent;
                if (!parentId) {
                    logger.error("You're going to insert a obj after the root node");
                    return null;
                }
                const parentHash = this.getHashMap(parentId);
                if (parentHash) {
                    const index = (parentHash.children || []).indexOf(destId.toString());
                    return this.insertNode(obj, parentId, index + 1);
                }
            }
            return null;
        };
        this.prepend = (obj, destId) => {
            return this.insertNode(obj, destId, 0);
        };
        this.append = (obj, destId) => {
            const destinyHash = this.getHashMap(destId);
            if (destinyHash) {
                destinyHash.children = destinyHash.children || [];
                return this.insertNode(obj, destId, destinyHash.children.length);
            }
            return null;
        };
        this.obj = cloneDeep(obj);
        this.count = 1;
        this.generate(this.obj);
    }
    addMap(key, value) {
        if (this.hashMap.has(key)) {
            logger.error(`There is already a data whose key is ${key} in hashMap`);
            return;
        }
        else {
            this.hashMap.set(key, value);
            this.count += 1;
        }
    }
    generateChildren(children, parent) {
        const childrenIds = [];
        children.forEach((child) => {
            var _a;
            const mapNode = {
                id: child.id.toString(),
                node: child,
            };
            if (parent.id) {
                mapNode.parent = parent.id;
            }
            this.addMap(child.id.toString(), mapNode);
            childrenIds.push(child.id.toString());
            if ((_a = child.children) === null || _a === void 0 ? void 0 : _a.length) {
                this.generateChildren(child.children, mapNode);
            }
        });
        parent.children = childrenIds;
        childrenIds.forEach((id, i) => {
            const hash = this.hashMap.get(id);
            if (i > 0) {
                hash.prev = childrenIds[i - 1];
            }
            if (i < childrenIds.length - 1) {
                hash.next = childrenIds[i + 1];
            }
        });
    }
    // Generate hashMap by object
    generate(obj) {
        var _a;
        const rootId = obj.id.toString();
        const mapNode = { id: rootId, node: obj };
        this.addMap(rootId, mapNode);
        if ((_a = obj.children) === null || _a === void 0 ? void 0 : _a.length) {
            this.generateChildren(obj.children, mapNode);
        }
        return mapNode;
    }
    updateChildren(children = []) {
        children.forEach((id, index) => {
            const hash = this.getHashMap(id);
            if (hash) {
                hash.prev = hash.next = undefined;
                if (index > 0) {
                    hash.prev = children[index - 1];
                }
                if (index < children.length - 1) {
                    hash.next = children[index + 1];
                }
            }
        });
    }
}
