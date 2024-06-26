import {processor} from './processor.mjs'
import {getConstant} from '../this/index.mjs';
const { FRAME_SIZE, RENDER_QUANTUM } = getConstant('emulator')

const ExpectedPrimingCount = FRAME_SIZE / RENDER_QUANTUM;

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        let arrayInput = []
        let primingCounter = 0;

        resolve({
            nkMemory: (event) => {
                // console.log('(((( EVENT ))))', self, event)
            },
            bus: {
                frame: async (event) => {
                    if(event.detail.type === 'frame') {
                        arrayInput.push(event.detail.value)
                        if(arrayInput.length === RENDER_QUANTUM) {
                            primingCounter =  processor(self, arrayInput,RENDER_QUANTUM, FRAME_SIZE, ExpectedPrimingCount, primingCounter)
                            arrayInput = []
                        }
                    }

                    if(event.detail.type === 'stop-frame') {
                        primingCounter = 0
                    }
                }
            },
            freeQueue: async () => {
                // executeLocked(() => {
                //     console.log('################# INDEX 1 #################', self.atomicState)
                // }, self.atomicState, 1, 0)
            },
            click: async (event) => { }
        });
    });
};

export default {
    description: 'action'
};