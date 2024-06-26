import { ReactElement } from 'react';
import { GlobalEvent } from './../../this/common/event';
import { IConfigProps } from './../../this/provider/create';
interface IInstanceServiceProps {
    getConfig: () => IConfigProps;
    render: (dom: ReactElement) => ReactElement;
    onBeforeInit: (callback: () => void) => void;
    onBeforeLoad: (callback: () => void) => void;
}
export default class InstanceService extends GlobalEvent implements IInstanceServiceProps {
    private _config;
    private rendered;
    constructor(config: IConfigProps);
    private initialLocaleService;
    getConfig: () => IConfigProps;
    render: (workbench: ReactElement) => ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    onBeforeInit: (callback: () => void) => void;
    onBeforeLoad: (callback: () => void) => void;
}
export {};
