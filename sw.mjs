const isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

let accessHandle = null
// let windowClientId = new Map()
let iframeClientId = new Map()
let pathname = ''
let white = ['https://zababurinsergei.github.io']

function getClientList() {
    return self.clients.claim().then(() =>
        self.clients.matchAll({
            type: 'window'
        })
    );
}

self.addEventListener("message", async (event) => {
    if (event.data.type === "service") {
        pathname = event.data.message
        const opfsRoot = await navigator.storage.getDirectory();
        const fileHandle = await opfsRoot.getFileHandle("config", {create: true});
        const writable = await fileHandle.createWritable();
        await writable.write(event.data.message);
        await writable.close();
        self.clients.matchAll().then(function (clients) {
            clients.forEach(function (client) {
                client.postMessage({
                    type: 'SW_REFRESH_TREE',
                    message: true
                })
            });
        });
    }

    if (event.data.type === "skipWaiting") {
        self.skipWaiting();
    }
})

async function getHandleFromPath(path = '') {
    const pathParts = path.split('/').filter(part => part.length > 0);
    let currentHandle = await navigator.storage.getDirectory();

    for (const part of pathParts) {
        if (part === '..') {
            currentHandle = await currentHandle.getParent();
        } else {
            currentHandle = await currentHandle.getDirectoryHandle(part, {create: true});
        }
    }

    return currentHandle;
}

async function getFileHandleFromPath(path = '') {
    const pathParts = path.split('/').filter(part => part.length > 0);
    const fileName = pathParts.pop();
    const dirHandle = await getHandleFromPath(pathParts.join('/'));
    return await dirHandle.getFileHandle(fileName);
}

async function getFileAccessHandle(fileHandle = '') {
    if (isWorker) {
        // return  await fileHandle.createSyncAccessHandle();
        return fileHandle;
    } else {
        return fileHandle;
    }
}

async function readFile(fileName = '', destination = '') {
    const fileHandle = await getFileHandleFromPath(fileName);
    // const accessHandle = await getFileAccessHandle(fileHandle);

    let fileSize;
    let buffer;
    const file = await fileHandle.getFile();

    // if(destination !== 'font') {
    //     return await file.arrayBuffer()
    // } else {
    // if (isWorker) {
    //     fileSize = accessHandle.getSize();
    //     buffer = new DataView(new ArrayBuffer(fileSize));
    //     accessHandle.read(buffer, { at: 0 });
    //     accessHandle.close();
    // } else {

    fileSize = file.size;
    buffer = new Uint8Array(fileSize);
    await file.arrayBuffer().then(data => buffer.set(new Uint8Array(data)));
    // }

    return new Uint8Array(buffer.buffer);
    // }
}

// always install updated SW immediately
self.addEventListener('install', async event => {
    self.skipWaiting();
});

self.addEventListener('activate', async event => {
    const clients = await getClientList()
    clients.forEach(client => {
        if (client.frameType === 'top-level') {
            client.postMessage({
                type: 'SW_ACTIVATED'
            })
        }
    })
});

const createStream = (uint) => new ReadableStream({
    start(controller) {
        controller.enqueue(uint)
        controller.close()
    }
})

const getHeaders = (destination, path) => {
    let options = {
        status: 200,
        statusText: 'OK'
    };

    switch (destination) {
        case 'media':
            options.headers = new Headers({
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                'Content-Type': "audio/mpeg"
            });
            break
        case 'audio':
            options.headers = new Headers({
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                'Content-Type': "audio/mpeg"
            });
            break;
        case 'worker':
        case 'audioworklet':
            options.headers = new Headers({
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                'Content-Type': 'application/javascript; charset=UTF-8'
            });
            break;
        case 'style':
            options.headers = new Headers({
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                'Content-Type': 'text/css; charset=UTF-8'
            });
            break;
        case 'script':
            options.headers = new Headers({
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                'Content-Type': 'application/javascript; charset=UTF-8'
            });
            break;
        case 'document':
            options.headers = new Headers({
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                'Content-Type': 'text/html; charset=UTF-8'
            });
            break
        case 'image':
            const isWebp = path.endsWith('.webp')
            const isJpeg = path.endsWith('.jpg') || path.endsWith('.jpeg')
            const isPng = path.endsWith('.png')

            options.headers = new Headers({
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                'Content-Type': isWebp ? 'image/webp' : isJpeg ? 'image/jpeg' : isPng ? 'image/png' : 'image/svg+xml'
            });
            break;
        case 'font':
            let contentType = ''

            if (path.includes('.ttf')) {
                contentType = 'font/ttf'
            } else if(path.includes('.woff')) {
                contentType = 'font/woff'
            } else if(path.includes('.woff2')) {
                contentType = 'font/woff2'
            } else {
                console.error('неизвестный Content-Type', path)
            }

            options.headers = new Headers({
                'Transfer-Encoding': 'chunked',
                'Content-Type': contentType,
                'Vary': 'Accept-Encoding',
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=0'
            });
            break;
        default:
            if (path.includes('.wasm')) {
                options.headers = new Headers({
                    "Cross-Origin-Embedder-Policy": "require-corp",
                    "Cross-Origin-Opener-Policy": "same-origin",
                    'Content-Type': 'application/wasm'
                });
            } else {
                options.headers = new Headers({
                    "Cross-Origin-Embedder-Policy": "require-corp",
                    "Cross-Origin-Opener-Policy": "same-origin",
                    'Content-Type': 'text/html; charset=UTF-8'
                });
            }
            break;
    }

    return options
};

const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    let destination = event.request.destination;
    let scope = (new URL(self.registration.scope)).pathname;
    let host = (new URL(self.registration.scope)).hostname;

    let isSw = false

    if (iframeClientId.has(event.clientId) || iframeClientId.has(event.resultingClientId)) {
        if (event.clientId.length !== 0 || event.resultingClientId.length !== 0) {
            if(iframeClientId.has(event.clientId)) {
                pathname =  (iframeClientId.get(event.clientId)).pathname
            }

            if(iframeClientId.has(event.resultingClientId)) {
                pathname =  (iframeClientId.get(event.clientId)).pathname
            }
            isSw = true
        }
    }

    if(destination === 'iframe') {
        if(!iframeClientId.has(event.resultingClientId)) {
            for (let amount of iframeClientId) {
                if(amount[1].pathname === pathname) {
                    iframeClientId.delete(amount[0])
                }
            }

            iframeClientId.set(event.resultingClientId, {
                pathname: pathname
            })
        }

        if(!url.pathname.includes('index.sw.html')) {
            isSw = true
        }
    }

    const isExclude = url.pathname ==='/false' || url.pathname ===`${scope}false` || url.hostname !== host
    const isOrigin = white.includes(url.origin) || url.hostname === 'localhost'

    if (isSw) {
        if (isOrigin && !isExclude && !url.pathname.includes('index.sw.html') && !url.pathname.includes('git-upload-pack') && !url.pathname.includes('info/refs')) {
            event.respondWith(readFile('config')
                .then(async function (servicePath) {
                    const eventId = event.clientId || event.resultingClientId
                    // const rootOpfs = textDecoder.decode(servicePath)
                    const rootOpfs = pathname
                    const isScope = url.pathname.includes(scope)
                    const isAudio = url.pathname.includes('.mp3')

                    if(isAudio) {
                        return fetch(event.request)
                            .then(function (response) {
                                const newHeaders = new Headers(response.headers);
                                newHeaders.set("Content-Type", "audio/mpeg");

                                const moddedResponse = new Response(response.body, {
                                    status: response.status,
                                    statusText: response.statusText,
                                    headers: newHeaders,
                                });

                                return moddedResponse;
                            })
                            .catch(function (e) {
                                console.error(e);
                            })
                    } else {
                        const isTemplate = rootOpfs.includes('example3')

                        const html = url.pathname.split('/')

                        if(html[html.length -1].length === 0) {
                            url.pathname = `${url.pathname}index.html`
                        }


                        let path = isOrigin ? `${rootOpfs}/${url.pathname}`: `${rootOpfs}${url.pathname}`

                        if(isTemplate) {
                            path = `${rootOpfs}/examples/dist/${url.pathname}`
                        }

                        if (isScope) {
                            path = isTemplate
                                ? `${rootOpfs}/examples/src/${url.pathname.replace(scope, '')}`
                                :`${rootOpfs}/${url.pathname.replace(scope, '')}`
                        }

                        path = path.replaceAll("%20", ' ')
                        path = path.replaceAll("%E2%80%99", '’')
                        path = decodeURI(path)
                        // console.log('------------------- path -------------------', path)
                        const options = getHeaders(destination, path)
                        return new Response(await readFile(path), options)
                    }
                })
                .catch(function (e) {
                    console.error(e);
                })
            );
        } else {
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', url, url.pathname)
        }
    } else {
        if(!isExclude) {
            event.respondWith(
                fetch(event.request)
                    .then(function (response) {
                        const newHeaders = new Headers(response.headers);
                        newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                        newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

                        const moddedResponse = new Response(response.body, {
                            status: response.status,
                            statusText: response.statusText,
                            headers: newHeaders,
                        });

                        return moddedResponse;
                    })
                    .catch(function (e) {
                        console.error(e);
                    })
            );
        } else {
            return new Response({})
        }
    }
});