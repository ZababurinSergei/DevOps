export declare function searchById(id: any): (item: any) => boolean;
/**
 * Clone a new object by an object instance
 * @param origin Original object instance
 */
export declare function cloneInstance<T>(origin: T): any;
/**
 * Merge multiple functions to one function
 * @param funcs
 */
export declare function mergeFunctions(...funcs: any[]): (...args: any[]) => void;
export declare function randomId(): number;
export declare function mergeObjects<T>(source: object, target: object): T;
/**
 * It's converts an object to a flatted object,
 * eg: { a: { b: 'test' }}, result is : { 'a.b': 'test' }
 * @param target flat target
 */
export declare function flatObject(target: object): object;
/**
 * It's converts a flatted object to a normal object,
 *  eg: { 'a.b': 'test' }, result is : { a: { b: 'test' }}
 * @param target flat target
 */
export declare function normalizeFlattedObject(target: object): object;
/**
 * Determine if a color is light or dark.
 * @param color HEX or RGB
 */
export declare function colorLightOrDark(color: string): "light" | "dark";
