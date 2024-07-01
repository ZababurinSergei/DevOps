const isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

let accessHandle = null
let windowClientId = new Set()
let iframeClientId = new Set()
let white = ['https://zababurinsergei.github.io']

function getClientList() {
    return self.clients.claim().then(() =>
        self.clients.matchAll({
            type: 'window'
        })
    );
}

self.addEventListener("message", async (event) => {
    console.log('====== MESSAGE ======',event.data.type,  event.data)

    if (event.data.type === "service") {
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

    if (event.data.type === "get-client-id") {
        self.clients.matchAll().then(function (clients) {
            clients.forEach(function (client) {
                if (client.frameType === "top-level") {
                    windowClientId.add(client.id)
                    client.postMessage({
                        type: 'SW_CLIENT',
                        message: true
                    })
                } else if (client.frameType === "nested") {
                    iframeClientId.add(client.id)
                }
            });
        });
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
    console.log('=============================== INSTALL SERVICE WORKER ================================')
    self.skipWaiting();
});

self.addEventListener('activate', async event => {
    const clients = await getClientList()
    console.log('----------------------- SW ACTIVATE --------------------------------------', clients)
    clients.forEach(client => {
        if (client.frameType === 'top-level') {
            console.log('----------------------- SW ACTIVATE SEND --------------------------------------', client)
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

    let isSw = false

    if (iframeClientId.has(event.clientId)) {
        if (event.clientId.length !== 0) {
            isSw = true
        }
    }

    if (windowClientId.has(event.clientId)) {
        isSw = false
    }

    const isExclude = url.pathname ==='/false' || url.pathname ===`${scope}false`
    const isOrigin = white.includes(url.origin) || url.hostname === 'localhost'

    if (isSw) {
        // console.log('-------------------------------------------- 1 -----------------------------------------------',isOrigin, url, url.pathname)
        if (isOrigin && !isExclude && !url.pathname.includes('index.sw.html') && !url.pathname.includes('git-upload-pack') && !url.pathname.includes('info/refs')) {
            event.respondWith(readFile('config')
                .then(async function (servicePath) {
                    const rootOpfs = textDecoder.decode(servicePath)
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
                        // console.log('sssssssssssssssssssssssssssssssssssss',isOrigin,  scope,'ssssssssssssssssssaaaaaaaaaa', url.pathname)
                        const isTemplate = rootOpfs.includes('example2')

                        let path = isOrigin ? `${rootOpfs}/${url.pathname}`: `${rootOpfs}${url.pathname}`

                        if(isTemplate) {
                            path = `${rootOpfs}/examples/dist/${url.pathname}`
                        }

                        if (isScope) {
                            path = isTemplate
                                ? `${rootOpfs}/examples/dist/${url.pathname.replace(scope, '')}`
                                :`${rootOpfs}/${url.pathname.replace(scope, '')}`
                        }

                        path = path.replaceAll("%20", ' ')

                        // console.log('--------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',  path)
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
        // console.log('-------------------------------------------- 2 -----------------------------------------------', isExclude)
        if(!isExclude) {
            // console.log('00000000000000000000000000000000 2 00000000000000000000000000000000000000000000000000', url.pathname)
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