import molecule from './../../../this/';
const removePanel = function (panel) {
    molecule.explorer.removePanel(panel.id);
};
export const ExtendsExplorer = {
    id: 'ExtendsExplorer',
    name: 'Extends Explorer',
    activate() {
        molecule.explorer.onRemovePanel(removePanel);
    },
    dispose() {
        // TODO There should remove the onRemovePanel event
        // molecule.explorer.dispose(removePanel);
    },
};
