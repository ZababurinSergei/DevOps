import React from 'react';
import { IModalFuncProps } from './modal';
interface ConfirmDialogProps extends IModalFuncProps {
    afterClose?: () => void;
    close: (...args: any[]) => void;
    actions?: React.ReactNode;
}
declare const ConfirmDialog: (props: ConfirmDialogProps) => React.JSX.Element;
export default ConfirmDialog;
