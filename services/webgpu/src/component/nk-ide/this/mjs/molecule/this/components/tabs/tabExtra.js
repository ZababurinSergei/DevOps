import React, { useState } from 'react';
export default ({ onClick, classNames = '', renderStatus }) => {
    const [hover, setHover] = useState(false);
    const handleMouseOver = () => {
        setHover(true);
    };
    const handleMouseOut = () => {
        setHover(false);
    };
    return (React.createElement("div", { role: "button", className: classNames, onClick: onClick, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut }, renderStatus === null || renderStatus === void 0 ? void 0 : renderStatus(hover)));
};
