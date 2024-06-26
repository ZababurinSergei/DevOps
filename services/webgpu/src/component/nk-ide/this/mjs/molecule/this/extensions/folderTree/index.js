import molecule from './../../../this/';
export const ExtendsFolderTree = {
    id: 'ExtendsFolderTree',
    name: 'Extends FolderTree',
    activate() {
        molecule.folderTree.onRename((id) => {
            molecule.folderTree.update({
                id,
                isEditable: true,
            });
        });
        molecule.folderTree.onUpdateFileName((file) => {
            const { id, name, location } = file;
            if (name) {
                const newLoc = (location === null || location === void 0 ? void 0 : location.split('/')) || [];
                newLoc[newLoc.length - 1] = name;
                const newLocation = newLoc.join('/');
                molecule.folderTree.update(Object.assign(Object.assign({}, file), { id, location: newLocation, isEditable: false }));
                const groupId = molecule.editor.getGroupIdByTab(id.toString());
                const isValidGroupId = !!groupId || groupId === 0;
                if (isValidGroupId) {
                    const prevTab = molecule.editor.getTabById(id.toString(), groupId);
                    const newTab = { id: id.toString(), name };
                    const prevTabData = prevTab === null || prevTab === void 0 ? void 0 : prevTab.data;
                    if (prevTabData && prevTabData.path) {
                        newTab.data = Object.assign(Object.assign({}, prevTabData), { path: newLocation });
                    }
                    molecule.editor.updateTab(newTab);
                }
            }
            else {
                const node = molecule.folderTree.get(id);
                if (node === null || node === void 0 ? void 0 : node.name) {
                    molecule.folderTree.update({
                        id,
                        isEditable: false,
                    });
                }
                else {
                    molecule.folderTree.remove(id);
                }
            }
        });
        molecule.folderTree.onExpandKeys((expandKeys) => {
            molecule.folderTree.setExpandKeys(expandKeys);
        });
    },
    dispose() { },
};
