import React from 'react';
import { containerClassName } from './base';
export default function AuxiliaryBar({ children }) {
    return React.createElement("div", { className: containerClassName }, children);
}
