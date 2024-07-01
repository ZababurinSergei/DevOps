export default async (self, actions) => {
    let dropdownBtn = undefined;
    let dropdownList = undefined;
    let dropdownItems = undefined;
    let arrow = undefined;

    let name = undefined;
    let icon = undefined;

    return {
        init: () => {
            self.init();

            self.html.button.addEventListener('click', actions.clickDropdownBtn);
            self.html.items.forEach(function(listItem) {
                listItem.addEventListener('click', actions.clickDropdownItems);
            });
            self.html.arrow?.addEventListener('click', actions.clickDropdownBtn);

            document.addEventListener('click', actions.click);
            document.addEventListener('keydown', actions.keydown);

            document.addEventListener('fer-select', actions.ferSelect);
            document.addEventListener('click', actions.button.under);

            self.broadcastChannel = {
                await: ['nk-git'],
                broadcastChannel: actions.broadcastChannel,
                messageerror: actions.messageerror
            }
        },
        terminate: () => {
            self.html.button.removeEventListener('click', actions.clickDropdownBtn);
            self.html.items.forEach(function(listItem) {
                listItem.removeEventListener('click', actions.clickDropdownItems);
            });
            self.arrow?.removeEventListener('click', actions.clickDropdownBtn);

            document.removeEventListener('click', actions.click);
            document.removeEventListener('keydown', actions.keydown);
            document.removeEventListener('fer-select', actions.ferSelect);
            document.removeEventListener('click', actions.button.under);
        }
    };
}