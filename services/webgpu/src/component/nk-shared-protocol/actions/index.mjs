// import { FreeQueue, FRAME_SIZE, RENDER_QUANTUM, QUEUE_SIZE } from '../views/index.mjs';
// const ExpectedPrimingCount = FRAME_SIZE / RENDER_QUANTUM;

function round(value, decimals = 12) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {


        resolve({

        });
    });
};

export default {
    description: 'action'
};