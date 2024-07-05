export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        let font = undefined

        resolve({
            message: async (event) => {
                if (event.data.type === 'SW_REFRESH_TREE') {
                    self._worker.postMessage({
                        message: 'refresh'
                    })
                }
            },
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