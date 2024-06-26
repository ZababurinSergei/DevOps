import React from 'react';
import Logo from './logo';
import { prefixClaName } from './../../../../this/common/className';
import { useGetKeys } from './hooks';
export default function Welcome() {
    const keys = useGetKeys();
    return (React.createElement("div", { className: prefixClaName('welcome') },
        React.createElement(Logo, { className: "logo" }),
        React.createElement("h1", { className: "title" }, "Molecule"),
        React.createElement("div", { className: "keybindings" },
            React.createElement("ul", null, keys.map((item) => {
                return (React.createElement("li", { className: "keys", key: item.id },
                    React.createElement("span", null, item.name),
                    React.createElement("span", null, item.keybindings.split('').join(' '))));
            })))));
}
