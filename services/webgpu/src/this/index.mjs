export {verification, init, onload, template, slotRouter} from './init/index.mjs'
export {store} from './store/index.mjs'
export {component, configButton, sections, taskProperty, taskRelation, eventsName, link} from './config/index.mjs'
export {inherits, readable, writable, duplex, transform, passThrough} from './modules/index.mjs'
export {
    loadHTML,
    pixelToVH,
    pixelToVW,
    size,
    vhToPixel,
    vwToPixel,
    clearnPx,
    activeClass,
    normalizePathName,
    events,
    events_d,
    useAuth,
    getTokenPair,
    getUserInfo,
    getRefreshToken,
    signIn,
    logOut,
    delay,
    loader,
    animationCount,
    randomColor,
    anime,
    task,
    emoji,
    isEmpty,
    Multiaddr,
    multiaddr,
    removeParamFromURL,
    protocols,
    resolvers,
    toBase64,
    fromBase64,
    path,
    search,
    camelToSnakeCase,
    format,
    isEqual,
    compareAsc,
    isWithinInterval,
    Ansis,
    jwtDecode,
    FreeQueue,
    KERNEL_LENGTH,
    RENDER_QUANTUM,
    FRAME_SIZE,
    QUEUE_SIZE,
    WORKGROUP_SIZE,
    getConstant,
} from './mjs/index.mjs'

// export {wasmFreeQueue} from './mjs/index.mjs'

export function round(value, decimals = 12) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export { router, сonfigRouter } from './router/index.mjs'

export default {
    description: 'all modules for this'
}