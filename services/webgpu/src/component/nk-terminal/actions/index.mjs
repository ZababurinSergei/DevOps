import {Terminal} from '../this/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {

        Terminal(self).then(terminal => {
            console.log('terminal:', terminal)
        }).catch(e => {})

        resolve({
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