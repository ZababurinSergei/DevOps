export default async (self, actions) => {
    return {
        init: async () => {
            await self.init()

            self.broadcastChannel = {
                await: ['nk-git', 'fer-select'],
                broadcastChannel: actions.broadcastChannel,
                messageerror: actions.messageerror
            };

            self.external;
        },
        terminate: () => { }
    };
}