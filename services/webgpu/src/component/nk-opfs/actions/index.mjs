export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        let font = undefined

        resolve({
            broadcastChannel: async (event) => {
                self.external
            },
            messageerror: async (event) => {
                console.log('ddddddddddddddddddddddddddddd BROADCAST messageerror ddddddddddddddddddddddddddddd', event)
            },
            bus: {
                frame: async (event) => {
                    if(event.detail.type === 'frame') { }

                    if(event.detail.type === 'stop-frame') { }
                }
            },
            click: async (event) => { }
        });
    });
};

export default {
    description: 'action'
};