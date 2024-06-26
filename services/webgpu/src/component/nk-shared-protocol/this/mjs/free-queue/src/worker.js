import { FreeQueue, FRAME_SIZE, QUEUE_SIZE } from '../../../index.mjs';

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

        while (Atomics.wait(atomicState, 0, 0) === 'ok') {
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
        }
    }
};
