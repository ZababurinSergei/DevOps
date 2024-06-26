import {gpuAudio} from '../../this/index.mjs'

export default async (self, actions) => {
    await gpuAudio(self, actions)

    return {
        init: () => {

        },
        terminate: () => {

        }
    }
}