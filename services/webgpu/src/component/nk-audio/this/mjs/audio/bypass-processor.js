import FreeQueue from './lib/free-queue.js';
import { RENDER_QUANTUM, FRAME_SIZE } from './constants.js';
const ExpectedPrimingCount = FRAME_SIZE / RENDER_QUANTUM;

/**
 * A simple bypass node demo.
 *
 * @class BypassProcessor
 * @extends AudioWorkletProcessor
 */
class BypassProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super();
        this.inputQueue = options.processorOptions.inputQueue;
        this.outputQueue = options.processorOptions.outputQueue;
        this.atomicState = options.processorOptions.atomicState;
        Object.setPrototypeOf(this.inputQueue, FreeQueue.prototype);
        Object.setPrototypeOf(this.outputQueue, FreeQueue.prototype);
        this.primingCounter = 0;
    }

    process(inputs, outputs) {
        // By default, the node has single input and output.
        const input = inputs[0];
        const output = outputs[0];

        // The first |ExpectedPrimingCount| number of callbacks won't get any
        // data from the queue because the it's empty. This check is not perfect;
        // waking up the worker can be slow and priming N callbacks might not be
        // enough.
        if (this.primingCounter > ExpectedPrimingCount) {
            // Pull processed audio data out of `outputQueue` and pass it in output.
            // console.log('------------- output ---------------', output)
            console.log('------------- output ---------------', output, RENDER_QUANTUM)
            const didPull = this.outputQueue.pull(output, RENDER_QUANTUM);
            if (!didPull) {
                console.log('[basic-processor.js] Not enough data in outputQueue');
            }
        } else {
            this.primingCounter++;
        }

        // Store incoming audio data `input` into `inputQueue`.
        const didPush = this.inputQueue.push(input, RENDER_QUANTUM);
        console.log('-------------- input --------------', input)
        if (!didPush) {
            console.log('[basic-processor.js] Not enough space in inputQueue');
        }

        // Notify worker.js if `inputQueue` has enough data to perform the batch
        // processing of FRAME_SIZE.
        if (this.inputQueue.hasEnoughFramesFor(FRAME_SIZE)) {
            Atomics.store(this.atomicState, 0, 1);
            Atomics.notify(this.atomicState, 0);
        }

        return true;
    }
}

registerProcessor('bypass-processor', BypassProcessor);