import { getConstant } from '../this/index.mjs';
const {FRAME_SIZE, RENDER_QUANTUM } = getConstant('emulator')
export const processor = (self, arrayInput, RENDER_QUANTUM, FRAME_SIZE, ExpectedPrimingCount, primingCounter) => {
    let input = [new Float64Array(arrayInput), new Float64Array(arrayInput)];
    let output = [new Float64Array(RENDER_QUANTUM), new Float64Array(RENDER_QUANTUM)]

    if (primingCounter > ExpectedPrimingCount) {
        const didPull = self.outputQueue.pull(output, RENDER_QUANTUM);
        if (!didPull) {
            console.log('[---- ERROR ----] Not enough data in outputQueue');
        }

        console.log('|-o-| :><: |-o-| |=-(¤)-=| |-o-| :><: |-o-|', output)
    } else {
        primingCounter++;
    }

    const didPush = self.inputQueue.push(input, RENDER_QUANTUM);
    if (!didPush) {
        console.log('[---- ERROR ----] Not enough space in inputQueue');
    }

    if (self.inputQueue.hasEnoughFramesFor(FRAME_SIZE)) {
        Atomics.store(self.atomicState, 0, 1);
        Atomics.store(self.atomicState, 1, 1);
        Atomics.notify(self.atomicState, 0);
        Atomics.notify(self.atomicState, 1);
    }

    return primingCounter
}