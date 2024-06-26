/// <reference types="react" />
export declare type HTMLElementType = HTMLElement | null;
export declare type TriggerEvent = 'click' | 'contextmenu' | 'hover';
/**
 * specify `rightBottom` means align to the bottom and keep in right
 */
export declare type PlacementType = 'top' | 'right' | 'bottom' | 'left' | 'rightBottom';
export declare const select: {
    <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    <K_1 extends keyof SVGElementTagNameMap>(selectors: K_1): SVGElementTagNameMap[K_1] | null;
    <E extends Element = Element>(selectors: string): E | null;
};
export declare const selectAll: {
    <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    <K_1 extends keyof SVGElementTagNameMap>(selectors: K_1): NodeListOf<SVGElementTagNameMap[K_1]>;
    <E extends Element = Element>(selectors: string): NodeListOf<E>;
};
export interface IPosition {
    x: number;
    y: number;
}
/**
 * Get Document Rectangle info
 */
export declare function getDocumentRect(): {
    height: number;
    width: number;
    clientWidth: number;
    clientHeight: number;
};
/**
 * Returns the position of element relative to element position
 * @param element target element
 * @param relativePos the relative element position
 */
export declare function getRelativePosition(element: HTMLElement, relativePos: IPosition): {
    x: number;
    y: number;
};
export declare function getEventPosition(e: React.MouseEvent): {
    x: number;
    y: number;
};
export declare function findParentByClassName<T>(element: any, className: any): T | null;
export declare function triggerEvent(trigger: TriggerEvent): "onClick" | "onMouseOver" | "onContextMenu";
/**
 * Get the element position by placement and DOMRect
 * @param placement top | right | bottom | left
 * @param domRect Dom rect info, normally get it from getBoundingClientRect function
 */
export declare function getPositionByPlacement(placement: PlacementType, domRect: DOMRect): IPosition;
export declare function getAttr(domElement: HTMLElement, attr: any): string;
/**
 * Get an element the center coords
 * @param element HTMLElement
 * @returns
 */
export declare function getElementClientCenter(element: HTMLElement): {
    x: number;
    y: number;
};
/**
 * Get the data-* attributions from props
 * @param props
 * @returns
 */
export declare function getDataAttributionsFromProps(props: Record<string, any>): Record<string, any>;
