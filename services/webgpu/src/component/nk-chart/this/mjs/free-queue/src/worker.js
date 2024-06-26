import { FreeQueue, FRAME_SIZE, QUEUE_SIZE } from '../../../index.mjs';



function executeLocked(f, atomicState, index = 0, value = 0) {
    async function tryGetLock() {
        while (await (Atomics.waitAsync(atomicState, index, value)).value === 'ok') {

            // const oldValue = Atomics.compareExchange(atomicState, index, value,  100);
            // if (oldValue === value + 1) {
                f();
                Atomics.store(atomicState, index, 0);
            // }

            // const result = Atomics.waitAsync(atomicState, index, value);
            // await result.value;
        }
    }

    tryGetLock();
}

/**
 * Worker message event handler.
 * This will initialize worker with FreeQueue instance and set loop for audio
 * processing. 
 */
self.onmessage = (msg) => {
    if (msg.data.type === 'init') {
        console.log('(((( ===== WORKER ===== ))))')
        let { inputQueue, outputQueue, atomicState } = msg.data.data;
        Object.setPrototypeOf(inputQueue, FreeQueue.prototype);
        Object.setPrototypeOf(outputQueue, FreeQueue.prototype);

        self.postMessage({
            status: true
        });

        executeLocked(() => {
            let input = [new Float64Array(FRAME_SIZE), new Float64Array(FRAME_SIZE)];
            const data = inputQueue.pull(input, FRAME_SIZE);
            if (!data) {
                console.error('[worker.js] Pulling from inputQueue failed.');
                return;
            }
            const output = input;
            if (!outputQueue.push(output, FRAME_SIZE)) {
                console.error('[worker.js] Pushing to outputQueue failed.');
                return;
            }

            Atomics.store(atomicState, 0, 0);
            console.log('################# INDEX 0 #################')
        }, atomicState, 0, 0)

        executeLocked(() => {
            console.log('################# INDEX 1 #################')
            Atomics.store(atomicState, 1, 0);
        }, atomicState, 1, 0)

        //TODO надо вернуть для синхронной блокировки
        // while (Atomics.wait(atomicState, 0,0) === 'ok') {
        //     let input = [new Float64Array(FRAME_SIZE), new Float64Array(FRAME_SIZE)];
        //     const data = inputQueue.pull(input, FRAME_SIZE);
        //     if (!data) {
        //         console.error('[worker.js] Pulling from inputQueue failed.');
        //         return;
        //     }
        //     const output = input;
        //     if (!outputQueue.push(output, FRAME_SIZE)) {
        //         console.error('[worker.js] Pushing to outputQueue failed.');
        //         return;
        //     }
        //     console.log('################## INDEX 0 ##################',  atomicState)
        //     Atomics.store(atomicState, 0, 0);
        //     // Atomics.notify(atomicState, 1);
        // }
    }
};
