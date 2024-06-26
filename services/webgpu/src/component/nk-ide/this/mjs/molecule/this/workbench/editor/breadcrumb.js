import React from 'react';
import { memo } from 'react';
import { groupBreadcrumbClassName } from './base';
import { Breadcrumb } from './../../../this/components/breadcrumb';
function EditorBreadcrumb(props) {
    const { breadcrumbs = [] } = props;
    return (React.createElement("div", { className: groupBreadcrumbClassName },
        React.createElement(Breadcrumb, { role: "breadcrumb", routes: breadcrumbs })));
}
export default memo(EditorBreadcrumb);
