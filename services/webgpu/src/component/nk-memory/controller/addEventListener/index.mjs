import {FreeQueue, getConstant } from '../../this/index.mjs'
// import {wasmFreeQueue} from '../../../../this/index.mjs'
const { QUEUE_SIZE } = getConstant('emulator')

export default async (self, actions) => {
    // const wasm = await wasmFreeQueue();
    // self.input = wasm._CreateFreeQueue(QUEUE_SIZE, 2)
    // self.output = wasm._CreateFreeQueue(QUEUE_SIZE, 2)
    self.inputQueue = new FreeQueue(QUEUE_SIZE, 2);
    self.outputQueue = new FreeQueue(QUEUE_SIZE, 2);
    Object.setPrototypeOf(self.inputQueue, FreeQueue.prototype);
    Object.setPrototypeOf(self.outputQueue, FreeQueue.prototype);

    self.atomicState = new Int32Array(new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT));

    let workerName = 'Emulator'

    // const workerWasm = new Worker(new URL('../../../../this/mjs/free-queue/src/worker.wasm.sync.js', import.meta.url), {
    //     name: 'wasm',
    //     type: 'module',
    // });

    // workerWasm.onmessage = (event) => {
    //     if(event.data.status) {
    //         switch (event.data.type) {
    //             case 'terminate':
    //                 //TODO надо проверить уничтожится он или нет до уничтожения компонента
    //                 console.log('######## TERMINATE ##########')
    //                 break
    //             default:
    //                 self.sharedArrayBuffer =  {
    //                     name: workerName,
    //                     inputQueue: QUEUE_SIZE * 2,
    //                     outputQueue: QUEUE_SIZE * 2,
    //                     atomicState: 4 * Int32Array.BYTES_PER_ELEMENT,
    //                     irArray: undefined,
    //                     sampleRate: 69,
    //                     type: 'sync'
    //                 }
    //                 document.dispatchEvent(new CustomEvent(`free-queue`, {
    //                     detail: {
    //                         status: true
    //                     }
    //                 }));
    //                 break
    //         }
    //     }
    // }

    // workerWasm.postMessage({
    //     type: 'init',
    //     data: {
    //         inputQueue: self.inputQueue,
    //         outputQueue: self.outputQueue,
    //         atomicState: self.atomicState,
    //         irArray: undefined,
    //         sampleRate: 48000,
    //     }
    // });


    const worker = new Worker(new URL('../../../../this/mjs/free-queue/src/worker.async.js', import.meta.url), {
        name: workerName,
        type: 'module',
    });

    worker.onmessage = (event) => {
        if(event.data.status) {
            switch (event.data.type) {
                case 'terminate':
                    //TODO надо проверить уничтожится он или нет до уничтожения компонента
                 console.log('######## TERMINATE ##########')
                    break
                default:
                    self.sharedArrayBuffer =  {
                        name: workerName,
                        inputQueue: QUEUE_SIZE * 2,
                        outputQueue: QUEUE_SIZE * 2,
                        atomicState: 4 * Int32Array.BYTES_PER_ELEMENT,
                        irArray: undefined,
                        sampleRate: 69,
                        type: 'async'
                    }
                    document.dispatchEvent(new CustomEvent(`free-queue`, {
                        detail: {
                            status: true
                        }
                    }));
                    break
            }
        }
    }

    self.hardwareConcurrency

    worker.postMessage({
        type: 'init',
        data: {
            inputQueue: self.inputQueue,
            outputQueue: self.outputQueue,
            atomicState: self.atomicState,
            irArray: undefined,
            sampleRate: 48000,
        }
    });

    return {
        init: () => {
            document.addEventListener('free-queue', actions.freeQueue, { once: true })
            document.addEventListener('next-frame', actions.bus.frame)
            document.addEventListener('stop-frame', actions.bus.frame)
        },
        terminate: () => {
            // worker.postMessage({
            //     type: 'close',
            // });
            worker.onmessage = null
            worker.terminate();
            document.removeEventListener('next-frame', actions.bus.frame)
            document.removeEventListener('stop-frame', actions.bus.frame)
        }
    }
}