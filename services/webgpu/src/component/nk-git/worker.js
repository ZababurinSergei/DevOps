// https://stackoverflow.com/questions/14191394/web-workers-communication-using-messagechannel-html5
import { APIS, GIT, http, lightningFs } from './this/index.mjs';

var parameters = {}
location.search.slice(1).split("&").forEach( function(key_value) { var kv = key_value.split("="); parameters[kv[0]] = kv[1]; })

const dir = parameters['dir'];

const git = Object.assign(GIT, APIS);

let directoryHandle = {}

const fs = new lightningFs(dir, { wipe: true }).promises;

const getHandleFromPath = async (path = '') => {
    const pathParts = path.split('/').filter(part => part.length > 0);
    let currentHandle = await navigator.storage.getDirectory();

    for (const part of pathParts) {
        if (part === '..') {
            currentHandle = await currentHandle.getParent();
        } else {
            currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
        }
    }

    return currentHandle;
}

const opfs = async (item) => {
    if (item.path.length === 1) {
        const fileHandle = await directoryHandle.getFileHandle(item.path[0], { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(item.value);
        await writable.close();
    } else {
        // let nestedHandle = await navigator.storage.getDirectory();
        let nestedHandle = directoryHandle
        for (let j = 0; j < item.path.length; ++j) {
            if (j === item.path.length - 1) {
                const fileHandle = await nestedHandle.getFileHandle(item.path[j], { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(item.value);
                await writable.close();
            } else {
                nestedHandle = await nestedHandle.getDirectoryHandle(item.path[j], { create: true });
            }
        }
    }
};

const status = (config) => {
    git.status({
        fs: fs,
        dir: config.gitDir,
        gitdir: `${config.gitDir}/.git`,
        filepath: 'README.md'
    }).then(status => {
        self.postMessage({
            status: true,
            message: 'status',
            data: status
        });
    }).catch(e => {
        self.postMessage({
            status: false,
            message: 'status',
            data: e
        });

    });
};

// https://github.com/ZababurinSergei/test
// url: 'https://github.com/ZababurinSergei/newkind-webgpu',
const clone = (auth, config) => {

    git.clone({
        fs: fs,
        http,
        dir: config.gitDir,
        url: config.gitUrl,
        force: false,
        corsProxy: config.corsProxy,
        ref: config.branch,
        noTags: false,
        singleBranch: true,
        depth: 2,
        oauth2format: config.oauth2format,
        username: auth.username,
        token: auth.password,
        onAuth: url => {
            return auth;
        },
        onAuthSuccess: (url, auth) => {

        },
        onAuthFailure: (url, auth) => {
            self.postMessage({
                status: false,
                message: 'clone',
                data: 'wrong password'
            });
        },
        onProgress: event => {
            self.postMessage({
                status: true,
                message: 'onProgress',
                data: {
                    phase: event.phase,
                    loaded: event.loaded,
                    total: event.total
                }
            });
        },
        onMessage: (event) => {
            self.postMessage({
                status: true,
                message: 'onMessage',
                data: {
                    phase: event,
                    loaded: event.loaded,
                    total: event.total
                }
            });
        }
    })
        .then(data => {
            self.postMessage({
                status: true,
                message: 'clone',
                data: data
            });
        }).catch(e => {
        self.postMessage({
            status: false,
            message: 'clone',
            data: e
        });
    });
};

let gitListFiles = undefined
const listFiles = (config) => {
    if(gitListFiles) {
        self.postMessage({
            status: true,
            message: 'listFiles',
            data: {
                phase: 'listFiles',
                total: gitListFiles.length
            }
        });
    } else {
        git.listFiles({ fs: fs, dir: config.gitDir })
            .then(response => {
                gitListFiles = response

                self.postMessage({
                    status: true,
                    message: 'listFiles',
                    data: {
                        phase: 'listFiles',
                        total: response.length
                    }
                });
            }).catch(e => {
                self.postMessage({
                    status: false,
                    message: 'listFiles',
                    data: e
                });
        });
    }
};

const createRootOpfs = async (dir) => {
    const dirHandle = await  getHandleFromPath(dir);
    // console.log('****************************************** createRootOpfs *******************************************************')
    self.postMessage({
        status: true,
        message: 'opfs:refresh:tree',
        data: {
            phase: 'start'
        }
    })
    return dirHandle
}

const readdir = async (pathName = '') => {
    const dirHandle = await getHandleFromPath(pathName);
    const entries = [];

    for await (const entry of dirHandle.values()) {
        entries.push(entry.name);
    }

    return entries;
}

const clear = async (data) => {
    const handle = await getHandleFromPath(data.gitDir)
    await handle.remove({ recursive: true });

    directoryHandle  = await createRootOpfs(data.gitDir)

    self.postMessage({
        status: true,
        message: 'clear:opfs',
        data: {
            phase: 'clear:opfs'
        }
    })
}

const copyToOPFS = async (config) => {
    let countFiles = 0
    // let countLimit = parseInt(gitListFiles.length / 1000, 10)
    let countLimit = 100

    for (let i = 0; i < gitListFiles.length; ++i) {
        // console.log('====================== FILE ==================================', `${config.git.dir.value}/${gitListFiles[i]}`)
        const file = await fs.readFile(`${config.gitDir}/${gitListFiles[i]}`);
        await opfs({
            id: `${gitListFiles[i]}`,
            value: file,
            path: gitListFiles[i].split('/').map(item => item.trim())
        });

        countFiles++
        if(countFiles > countLimit) {
            self.postMessage({
                status: true,
                message: 'copyToOPFS:status',
                data: {
                    phase: 'copyToOPFS:status',
                    total: gitListFiles.length,
                    loaded: i
                }
            })
            countFiles = 0
        }
    }

    self.postMessage({
        status: true,
        message: 'copyToOPFS',
        data: {
            phase: 'copyToOPFS',
            total: gitListFiles.length,
            loaded: gitListFiles.length
        }
    })
}

self.onmessage = async (event) => {
    const { message } = event.data;
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ WORKER NK-GIT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', message)
    switch (message) {
        case 'status':
            status(event.data.config);
            break;
        case 'clone':
            clone(event.data.auth, event.data.config);
            break;
        case 'listFiles':
            listFiles(event.data.config);
            break;
        case 'copyToOPFS':
            await copyToOPFS(event.data.config)
            break;
        case 'create.root.opfs':
            await createRootOpfs(event.data.config)
            break
        case 'clear':
            await clear(event.data)
            break
        default:
            console.warn('[WORKER] Сообщение не обрабатывается', event.data);
            break;
    }
};

self.postMessage({
    message: 'loaded',
    status: true
})