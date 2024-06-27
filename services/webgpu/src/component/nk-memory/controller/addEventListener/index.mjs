export default async (self, actions) => {

    return {
        init: async () => {
            await self.init()
            self.hardwareConcurrency
        },
        terminate: () => { }
    }
}