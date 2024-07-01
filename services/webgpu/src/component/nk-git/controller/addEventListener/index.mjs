export default async (self, actions) => {

    return {
        init: async () => {
            self.html.control.button.run.addEventListener('click', actions.run)
            self.html.control.button.mount.addEventListener('click', actions.mount)
            self.html.control.button.clear.addEventListener('click', actions.clear)

            self.broadcastChannel = {
                await: ['nk-opfs','mss-input'],
                broadcastChannel: actions.broadcastChannel,
                messageerror: actions.messageerror
            }
        },
        terminate: () => {
            self.html.control.button.run.removeEventListener('click', actions.run)
            self.html.control.button.mount.removeEventListener('click', actions.mount)
            self.html.control.button.clear.removeEventListener('click', actions.clear)
        }
    }
}