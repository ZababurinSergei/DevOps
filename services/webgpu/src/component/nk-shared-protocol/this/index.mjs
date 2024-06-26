import html from './html/index.mjs'

export { FreeQueue, KERNEL_LENGTH, RENDER_QUANTUM, FRAME_SIZE, QUEUE_SIZE, WORKGROUP_SIZE } from './mjs/index.mjs'
export { html }
export { actions } from '../actions/index.mjs'
export { controller } from '../controller/index.mjs'

export default {
    html: html
}