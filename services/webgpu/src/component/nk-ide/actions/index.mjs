import {Initialize} from '../this/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        Initialize(self, self.querySelector('#root')).then(api => {
            console.log('IDE: ',api)
        }).catch(e => console.error(e))

        resolve({
            nkMemory: (event) => {
                console.log('(((( EVENT  IDE ))))', self, event)
            },
            mount: {
                click: async (event) => {
                    console.trace()
                    console.log('<<<<< @@@@@@@@@@@@@@@@@@@@@@ >>>>>')
                }
            }
        });
    });
};

export default {
    description: 'action'
};