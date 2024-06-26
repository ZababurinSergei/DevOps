import React from 'react';
import { ITabProps } from './tab';
import type { UniqueId } from './../../../this/common/types';
export declare type TabsType = 'line' | 'card';
/**
 * TODO: Get rid of the ComponentProps in next version
 */
export interface ITabsProps extends React.ComponentProps<any> {
    className?: string;
    style?: React.CSSProperties;
    role?: string;
    /**
     * @deprecated For now, we don't need to control the global closable
     */
    closable?: boolean;
    /**
     * @deprecated For now, we don't need to control the global editable
     */
    editable?: boolean;
    data?: ITabProps[];
    activeTab?: UniqueId;
    /**
     * Default is line
     */
    type?: TabsType;
    onCloseTab?: (key: UniqueId) => void;
    onContextMenu?: (e: React.MouseEvent, tab: ITabProps) => void;
    onMoveTab?: (tabs: ITabProps[]) => void;
    onSelectTab?: (key: UniqueId) => void;
}
export declare const tabsClassName: string;
export declare const tabsHeader: string;
export declare function Tabs(props: ITabsProps): React.JSX.Element;
