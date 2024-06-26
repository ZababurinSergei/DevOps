import molecule from './../../../this/';
import { CommandQuickSideBarViewAction } from './../../../this/monaco/quickToggleSideBarAction';
export const ExtendsActivityBar = {
    id: 'ExtendsActivityBar',
    name: 'Extend The Default ActivityBar',
    activate(extensionCtx) {
        molecule.activityBar.onChange((pre, cur) => {
            if (cur !== pre) {
                molecule.activityBar.setActive(cur);
                molecule.sidebar.setActive(cur);
                const { sidebar } = molecule.layout.getState();
                if (sidebar.hidden) {
                    extensionCtx.executeCommand(CommandQuickSideBarViewAction.ID, cur);
                }
            }
            else {
                extensionCtx.executeCommand(CommandQuickSideBarViewAction.ID, cur);
            }
        });
    },
    dispose() { },
};
