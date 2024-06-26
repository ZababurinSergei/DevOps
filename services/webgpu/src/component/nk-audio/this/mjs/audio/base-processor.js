import FreeQueue from './lib/free-queue.js';
import { RENDER_QUANTUM, FRAME_SIZE } from './constants.js';
const ExpectedPrimingCount = FRAME_SIZE / RENDER_QUANTUM;

/**
 * A simple bypass node demo.
 *
 * @class BypassProcessor
 * @extends AudioWorkletProcessor
 */
class BaseProcessor extends AudioWorkletProcessor {
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

        for (let channel = 0; channel < output.length; ++channel) {
            console.log('@@@@@@@@@@@@@@@@@@', input[channel])
            output[channel].set(input[channel]);
        }

        return true;
    }
}

registerProcessor('base-processor', BaseProcessor);