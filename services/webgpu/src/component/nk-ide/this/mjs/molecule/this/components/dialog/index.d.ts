import { Modal as OriginModal, IModalProps, IModalFuncProps } from './modal';
import { ModalStaticFunctions } from './confirm';
declare type ModalType = typeof OriginModal & ModalStaticFunctions & {
    destroyAll: () => void;
};
declare const Modal: ModalType;
export declare enum ConfirmState {
    warning = "warning",
    confirm = "confirm"
}
export declare type ConfrimType = keyof typeof ConfirmState;
export { Modal };
export type { IModalFuncProps, IModalProps };
