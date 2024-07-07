export default async (self, actions) => {
    let dropdownBtn = undefined;
    let dropdownList = undefined;
    let dropdownItems = undefined;
    let arrow = undefined;

    let name = undefined;
    let icon = undefined;


    return {
        init: async () => {
            const items = self.html?.list.querySelectorAll('[class*="list-item"]')
            items.forEach(function(listItem) {
                listItem.addEventListener('click', actions.clickDropdownItems);
            });

            self.html.button.addEventListener('click', actions.clickDropdownBtn);

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

            return true
        },
        terminate: async () => {
            const items = self.html?.list.querySelectorAll('[class*="list-item"]')
            items.forEach(function(listItem) {
                listItem.removeEventListener('click', actions.clickDropdownItems);
            });

            self.html.button.removeEventListener('click', actions.clickDropdownBtn);
            self.arrow?.removeEventListener('click', actions.clickDropdownBtn);

            document.removeEventListener('click', actions.click);
            document.removeEventListener('keydown', actions.keydown);
            document.removeEventListener('fer-select', actions.ferSelect);
            document.removeEventListener('click', actions.button.under);

            return true
        }
    };
}