import molecule from './../../../this/';
export const ExtendsEditorTree = {
    id: 'ExtendsEditorTree',
    name: 'Extends Editor Tree',
    dispose() { },
    activate() {
        molecule.editorTree.onSelect((tabId, groupId) => {
            molecule.editor.setActive(groupId, tabId);
        });
        molecule.editorTree.onClose((tabId, groupId) => {
            molecule.editor.closeTab(tabId, groupId);
        });
        molecule.editorTree.onCloseOthers((tabItem, groupId) => {
            molecule.editor.closeOther(tabItem, groupId);
        });
        molecule.editorTree.onCloseAll((groupId) => {
            if (groupId) {
                molecule.editor.closeAll(groupId);
            }
            else {
                const { groups } = molecule.editor.getState();
                groups === null || groups === void 0 ? void 0 : groups.forEach((group) => {
                    molecule.editor.closeAll(group.id);
                });
            }
        });
    },
};
