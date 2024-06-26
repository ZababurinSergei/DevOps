import React from 'react';
export default function Pane({ children, style, className, role, title, }) {
    return (React.createElement("div", { role: role, title: title, className: className, style: style }, children));
}
