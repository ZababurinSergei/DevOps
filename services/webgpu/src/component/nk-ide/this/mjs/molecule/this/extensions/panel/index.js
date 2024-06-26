import molecule from './../../../this/';
export const ExtendsPanel = {
    id: 'ExtendsPanel',
    name: 'Extends Panel',
    activate(extensionCtx) {
        molecule.panel.onTabClose((key) => {
            const { data = [], current } = molecule.panel.getState();
            if ((current === null || current === void 0 ? void 0 : current.id) === key) {
                const index = data.findIndex((item) => item.id === key);
                const next = index === data.length - 1 ? data.length - 2 : index + 1;
                const nextPanel = data[next];
                if (nextPanel) {
                    molecule.panel.open(nextPanel);
                }
            }
            molecule.panel.remove(key);
        });
    },
    dispose() { },
};
