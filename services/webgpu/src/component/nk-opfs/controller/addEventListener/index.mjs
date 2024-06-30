export default async (self, actions) => {
    return {
        init: async () => {
            await self.init()
            navigator.serviceWorker.addEventListener('message', actions.message);

            self.broadcastChannel = {
                await: ['nk-git', 'fer-select'],
                broadcastChannel: actions.broadcastChannel,
                messageerror: actions.messageerror
            };

            self.external;
        },
        terminate: () => {
            navigator.serviceWorker.removeEventListener('message', actions.message);
        }
    };
}