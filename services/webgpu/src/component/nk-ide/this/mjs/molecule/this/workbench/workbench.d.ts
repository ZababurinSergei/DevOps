import 'reflect-metadata';
import React from 'react';
import { ILayoutController } from './../../this/controller/layout';
import { ILayout } from './../../this/model/workbench/layout';
import { IWorkbench } from './../../this/model';
export declare function WorkbenchView(props: IWorkbench & ILayout & ILayoutController): React.JSX.Element;
export declare const Workbench: React.ComponentType<any>;
