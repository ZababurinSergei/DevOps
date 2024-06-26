import { useContextView } from './../../../this/components/contextView';
export function useContextMenu(props) {
    const { anchor, render } = props;
    if (!anchor) {
        return undefined;
    }
    const contextView = useContextView({
        render,
    });
    const onContextMenu = (e) => {
        // ONLY works over the anchor ele
        if (e.target === e.currentTarget) {
            e.preventDefault();
            contextView.show({
                x: e.clientX,
                y: e.clientY,
            }, render);
        }
    };
    anchor.addEventListener('contextmenu', onContextMenu);
    const dispose = () => {
        contextView.hide();
        anchor.removeEventListener('contextmenu', onContextMenu);
    };
    return Object.assign(Object.assign({}, contextView), { dispose });
}
