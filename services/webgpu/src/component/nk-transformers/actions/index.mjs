export const actions = (self) => {
    return new Promise(async (resolve, reject) => {

        let count  = 0
        resolve({
            bus: {
                frame: (event) => {
                    if(event.detail.type === 'frame') {

                    }

                    if(event.detail.type === 'frame-stop') {
                        count = 0
                    }
                }
            }
        });
    });
};

export default {
    description: 'action'
};