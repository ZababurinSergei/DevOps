import React, { memo } from 'react';
import Tree from './../../../../this/components/tree';
import { treeContentClassName } from './base';
const SearchTree = (props) => {
    const { data = [], onSelect, renderTitle } = props;
    return (React.createElement(Tree, { draggable: false, className: treeContentClassName, data: data, renderTitle: renderTitle, onSelect: onSelect, onRightClick: (e) => e.preventDefault() }));
};
export default memo(SearchTree);
