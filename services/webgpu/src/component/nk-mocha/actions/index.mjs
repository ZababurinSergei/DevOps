import { store } from '../../../this/index.mjs';
import {mocha} from "../this/index.mjs";

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            button: {
                remove: async () => {
                    await self.remove()
                },
                add: async () => {
                    let url = './this/tests/service.tests.mjs'
                    const response = await self.set(url)

                    if(response.status) {
                        self.mocha.run((data) => {

                            // mocha.reset
                            console.log('TEST END', mocha, data)
                        })
                    }
                    // self.mocha.run((data) => {
                    //
                    //     // mocha.reset
                    //     console.log('--------------- TEST END ----------------', mocha, data)
                    // })
                },
            }
        })
    })
}

export default {
    description: 'action'
}