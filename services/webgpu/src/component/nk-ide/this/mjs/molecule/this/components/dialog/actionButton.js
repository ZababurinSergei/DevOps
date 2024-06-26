import React, { useRef } from 'react';
import { Button } from './../../../this/components/button';
const ActionButton = (props) => {
    const clickedRef = useRef(false);
    const { close } = props;
    const handlePromiseOnOk = (returnValueOfOnOk) => {
        if (!returnValueOfOnOk || !returnValueOfOnOk.then) {
            return;
        }
        returnValueOfOnOk.then((...args) => {
            close === null || close === void 0 ? void 0 : close(...args);
        }, (e) => {
            // eslint-disable-next-line no-console
            console.error(e);
            clickedRef.current = false;
        });
    };
    const onClick = () => {
        const { actionFn, close } = props;
        if (clickedRef.current) {
            return;
        }
        clickedRef.current = true;
        if (!actionFn) {
            close === null || close === void 0 ? void 0 : close();
            return;
        }
        let returnValueOfOnOk;
        if (actionFn.length) {
            returnValueOfOnOk = actionFn(close);
            clickedRef.current = false;
        }
        else {
            returnValueOfOnOk = actionFn();
            if (!returnValueOfOnOk) {
                close === null || close === void 0 ? void 0 : close();
                return;
            }
        }
        handlePromiseOnOk(returnValueOfOnOk);
    };
    const { children, buttonProps } = props;
    return (React.createElement(Button, Object.assign({ onClick: onClick }, buttonProps), children));
};
export default ActionButton;
