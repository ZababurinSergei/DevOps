// import { FreeQueue, QUEUE_SIZE } from '../../views/index.mjs'
export default async (self, actions) => {
    // self.inputQueue = new FreeQueue(QUEUE_SIZE, 2);
    // self.outputQueue = new FreeQueue(QUEUE_SIZE, 2);
    // Object.setPrototypeOf(self.inputQueue, FreeQueue.prototype);
    // Object.setPrototypeOf(self.outputQueue, FreeQueue.prototype);
    //
    // self.atomicState = new Int32Array(
    //     new SharedArrayBuffer(1 * Int32Array.BYTES_PER_ELEMENT)
    // );
    //
    // const worker = new Worker(new URL('../../views/mjs/free-queue/src/worker.js', import.meta.url), {
    //     name: 'free-queue',
    //     type: 'module',
    // });
    //
    // worker.onmessage = (event) => {
    //     if(event.data.status) {
    //         switch (event.data.type) {
    //             case 'terminate':
    //                 //TODO надо проверить уничтожится он или нет до уничтожения компонента
    //              console.log('######## TERMINATE ##########')
    //                 break
    //             default:
    //                 document.dispatchEvent(new CustomEvent(`free-queue`, {
    //                     detail: {
    //                         status: true
    //                     }
    //                 }));
    //                 break
    //         }
    //     }
    // }
    //
    // worker.postMessage({
    //     type: 'init',
    //     data: {
    //         inputQueue: self.inputQueue,
    //         outputQueue: self.outputQueue,
    //         atomicState: self.atomicState
    //     }
    // });
    //
    // console.log('MEMORY', {
    //     atomicState: self.atomicState,
    //     inputQueue: self.inputQueue,
    //     outputQueue: self.outputQueue
    // })

    return {
        init: () => {
            // document.addEventListener('free-queue', actions.freeQueue)
            // document.addEventListener('next-frame', actions.bus.frame)
            // document.addEventListener('stop-frame', actions.bus.frame)
        },
        terminate: () => {
            // worker.postMessage({
            //     type: 'close',
            // });
            // worker.onmessage = null
            // worker.terminate();
            // document.removeEventListener('free-queue', actions.freeQueue)
            // document.removeEventListener('next-frame', actions.bus.frame)
            // document.removeEventListener('stop-frame', actions.bus.frame)
        }
    }
}