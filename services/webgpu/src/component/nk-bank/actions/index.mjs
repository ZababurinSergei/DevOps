export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            nkMemory: (event) => {
                // console.log('(((( EVENT ))))', self, event)
            },
            bus: {
                frame: async (event) => {

                }
            }
        })
    })
}

export default {
    description: "actions for newkind-osc"
}