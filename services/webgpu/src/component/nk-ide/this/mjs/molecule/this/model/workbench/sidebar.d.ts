/// <reference types="react" />
import type { UniqueId } from './../../../this/common/types';
export interface ISidebarPane {
    id: UniqueId;
    title?: string;
    render?: () => React.ReactNode;
}
export interface ISidebar {
    current: UniqueId;
    panes: ISidebarPane[];
}
export declare class SidebarModel implements ISidebar {
    current: UniqueId;
    panes: ISidebarPane[];
    constructor(panes?: ISidebarPane[], selected?: UniqueId);
}
