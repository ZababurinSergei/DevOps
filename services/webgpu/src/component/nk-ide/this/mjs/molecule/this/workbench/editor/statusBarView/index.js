import React, { memo } from 'react';
export function EditorStatusBarView(props) {
    const { data = { ln: 0, col: 0 } } = props;
    return React.createElement("span", null, `Ln ${data.ln}, Col ${data.col}`);
}
export default memo(EditorStatusBarView);
