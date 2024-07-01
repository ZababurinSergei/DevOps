export default async (self, actions) => {
    return {
        init: async () => {
            navigator.serviceWorker.addEventListener('message', actions.message);

            self.broadcastChannel = {
                await: ['nk-git', 'fer-select'],
                broadcastChannel: actions.broadcastChannel,
                messageerror: actions.messageerror
            };
        },
        terminate: () => {
            navigator.serviceWorker.removeEventListener('message', actions.message);
        }
    };
}