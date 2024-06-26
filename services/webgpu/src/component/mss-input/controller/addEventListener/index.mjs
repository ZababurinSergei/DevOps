export default async (self, actions) => {
    const input = self.shadowRoot.querySelector('input')
    const list = self.shadowRoot.querySelector('.response.dropdown__list')

    return {
        init: async () => {
            await self.init()
            list?.addEventListener('click', actions.click)
            input.addEventListener('input', actions.input)

            self.broadcastChannel = {
                await: [],
                broadcastChannel: actions.broadcastChannel,
                messageerror: actions.messageerror
            }

            self.external
        },
        terminate: () => {
            list?.removeEventListener('click', actions.click)
            input.removeEventListener('input', actions.input)
        }
    }
}