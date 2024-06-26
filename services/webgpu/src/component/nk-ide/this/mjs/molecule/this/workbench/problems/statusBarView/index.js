import React from 'react';
import { Icon } from './../../../../this/components/icon';
export function ProblemsStatusBarView(props) {
    const { data = { errors: 0, warnings: 0, infos: 0 } } = props;
    return (React.createElement(React.Fragment, null,
        React.createElement(Icon, { type: "error" }),
        ` ${data.errors} `,
        React.createElement(Icon, { type: "warning" }),
        ` ${data.warnings} `,
        React.createElement(Icon, { type: "info" }),
        ` ${data.infos}`));
}
export default React.memo(ProblemsStatusBarView);
