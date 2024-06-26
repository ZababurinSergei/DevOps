import { Modal as OriginModal, destroyFns, } from './modal';
import confirm, { withWarn, withConfirm, } from './confirm';
function modalWarn(props) {
    return confirm(withWarn(props));
}
const Modal = OriginModal;
export var ConfirmState;
(function (ConfirmState) {
    ConfirmState["warning"] = "warning";
    ConfirmState["confirm"] = "confirm";
})(ConfirmState || (ConfirmState = {}));
Modal.warning = modalWarn;
Modal.warn = modalWarn;
Modal.confirm = function confirmFn(props) {
    return confirm(withConfirm(props));
};
Modal.destroyAll = function destroyAllFn() {
    while (destroyFns.length) {
        const close = destroyFns.pop();
        if (close) {
            close();
        }
    }
};
export { Modal };
