import * as ReactDOM from 'react-dom';
const reactdom = Object.assign({}, ReactDOM);
let nextReactDOMClient;
export const renderedSign = Symbol('__molecule__root');
if (ReactDOM.version.startsWith('18')) {
    nextReactDOMClient = reactdom.createRoot;
}
function toggleWarning(skip) {
    const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = reactdom;
    if (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
        typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object') {
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint =
            skip;
    }
}
export const render = (node, container) => {
    if (nextReactDOMClient) {
        toggleWarning(true);
        const root = container[renderedSign] || nextReactDOMClient(container);
        toggleWarning(false);
        root.render(node);
        container[renderedSign] = root;
        return;
    }
    reactdom.render(node, container);
};
export const unmout = (container) => {
    var _a;
    if (nextReactDOMClient) {
        (_a = container[renderedSign]) === null || _a === void 0 ? void 0 : _a.unmount();
        Reflect.deleteProperty(container, renderedSign);
        return true;
    }
    return reactdom.unmountComponentAtNode(container);
};
