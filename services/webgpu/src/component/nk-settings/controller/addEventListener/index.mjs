import {
    getConstant
} from '../../../../this/index.mjs';

const {
    FRAME_SIZE,
    KERNEL_LENGTH,
    QUEUE_SIZE,
    RENDER_QUANTUM,
    WORKGROUP_SIZE
} = getConstant('default')

const ExpectedPrimingCount = FRAME_SIZE / RENDER_QUANTUM;
export default async (self, actions) => {
    const settings = self.shadowRoot.querySelectorAll('.settings')
    let freq = 440
    let duration = 30
    let channels = 1
    let frames = duration * window["samplerate"]
    let memdata = frames * channels
    let samplerate = window["samplerate"]
    let volumerate = window["volumerate"]

    settings.forEach(item => {
        switch (item.id) {
            case 'RENDER_QUANTUM':
                item.querySelector('span').textContent = RENDER_QUANTUM
                break
            case 'KERNEL_LENGTH':
                item.querySelector('span').textContent = KERNEL_LENGTH
                break
            case 'FRAME_SIZE':
                item.querySelector('span').textContent = FRAME_SIZE
                break
            case 'QUEUE_SIZE':
                item.querySelector('span').textContent = QUEUE_SIZE
                break
            case 'WORKGROUP_SIZE':
                item.querySelector('span').textContent = WORKGROUP_SIZE
                break
            case 'samplerate':
                item.querySelector('span').textContent = samplerate
                break
            case 'volumerate':
                item.querySelector('span').textContent = volumerate
                break
            case 'channels':
                item.querySelector('span').textContent = channels
                break
            case 'duration':
                item.querySelector('span').textContent = duration
                break
            case 'frames':
                item.querySelector('span').textContent = frames
                break
            case 'memdata':
                item.querySelector('span').textContent = memdata
                break
            case 'freq':
                item.querySelector('span').textContent = freq
                break
            case 'ExpectedPrimingCount':
                item.querySelector('span').textContent = ExpectedPrimingCount
                break
            default:
                // console.error('Константа не определенна')
                break

        }
    })
    console.log('SETTINGS')
    return {
        init: () => {
            // mount.addEventListener('click', actions.mount.click)
        },
        terminate: () => {
            // mount.removeEventListener('fer-button-in', actions.mount.click)
        }
    }
}