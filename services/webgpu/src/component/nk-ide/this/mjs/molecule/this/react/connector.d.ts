import 'reflect-metadata';
import React from 'react';
import { IComponent } from './component';
import { Controller } from './controller';
export declare type ServiceObject = {
    [index: string]: IComponent;
};
export declare type ControllerObject = {
    [index: string]: Controller;
};
export declare function connect<T = any>(Service: IComponent | ServiceObject, View: React.ComponentType<any>, Controller?: Controller | ControllerObject): React.ComponentType<T>;
