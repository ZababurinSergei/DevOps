import { Children, cloneElement, isValidElement } from 'react';
/**
 * Clone react children props
 * @param children React.ReactNode
 * @param props Parent props
 */
export function cloneReactChildren(children, props) {
    return Children.map(children, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, props);
        }
        return child;
    });
}
