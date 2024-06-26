import { useLayoutEffect } from 'react';
import create from './create';
export default function Provider({ defaultLocale, extensions, children, }) {
    useLayoutEffect(() => {
        const instance = create({
            defaultLocale,
            extensions,
        });
        instance.render(children);
    }, []);
    return children;
}
