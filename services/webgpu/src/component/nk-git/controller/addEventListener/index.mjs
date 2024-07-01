export default async (self, actions) => {

    return {
        init: async () => {
            const html = await self.init()

            html.control.button.run.addEventListener('click', actions.run)
            html.control.button.mount.addEventListener('click', actions.mount)
            html.control.button.clear.addEventListener('click', actions.clear)

            self.broadcastChannel = {
                await: ['nk-opfs','mss-input'],
                broadcastChannel: actions.broadcastChannel,
                messageerror: actions.messageerror
            }
        },
        terminate: () => {
            self.control.button.run.removeEventListener('click', actions.run)
            self.control.button.mount.addEventListener('click', actions.mount)
        }
    }
}