import { Button } from './../../../../this/components';
import { localize } from './../../../../this/i18n';
import React, { useEffect, useRef } from 'react';
export function LocaleNotification({ locale }) {
    const buttonRef = useRef(null);
    const reload = () => {
        window.location.reload();
    };
    useEffect(() => {
        var _a;
        // Delay execution to ensure focus on element
        (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    return (React.createElement("div", { style: {
            lineHeight: '1.5',
        } },
        React.createElement("div", { style: {
                direction: 'ltr',
                width: 440,
                whiteSpace: 'normal',
                textAlign: 'left',
            } },
            React.createElement("p", { style: { fontWeight: 'bold' } }, localize('notification.locale.title', '')),
            React.createElement("p", null, localize('notification.locale.description', ''))),
        React.createElement("div", { style: { marginBottom: 2 } },
            React.createElement(Button, { ref: buttonRef, style: { width: 150, margin: '0 0 0 auto' }, onClick: reload }, localize('notification.locale.button', '')))));
}
export default React.memo(LocaleNotification);
