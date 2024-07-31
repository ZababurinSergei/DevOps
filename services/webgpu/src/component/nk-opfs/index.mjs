import { Component } from '../index.mjs';
import { nkGit, ferSelect, storeDataAndUpdateUI, idKey, editor } from './this/index.mjs';

const name = 'nk-opfs';
const component = await Component();

const opfsWorkerUrl = new URL('./worker.js', import.meta.url);

const isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
async function getHandleFromPath(path = '') {
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

async function getFileHandleFromPath(path = '') {
    const pathParts = path.split('/').filter(part => part.length > 0);
    const fileName = pathParts.pop();
    const dirHandle = await getHandleFromPath(pathParts.join('/'));
    return await dirHandle.getFileHandle(fileName);
}

async function getFileAccessHandle(fileHandle = '') {
    if (isWorker) {
        return fileHandle.createSyncAccessHandle();
    } else {
        return fileHandle;
    }
}

Object.defineProperties(component.prototype, {
    lastLength: {
        value: 0,
        writable: true
    },
    main: {
        value: null,
        writable: true
    },
    openDirectories: {
        value: new Set(),
        writable: true
    },
    readableSize: {
        value: function(size) {
            if (size === 0) return '0B';
            const i = Math.floor(Math.log(size) / Math.log(1024));
            return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
                ['B', 'KB', 'MB', 'GB', 'TB'][i]
            }`;
        },
        writable: false
    },
    createTreeHTML: {
        value: function(structure, container) {
            const entries = Object.entries(structure);
            // Sort entries by name and kind.
            entries
                .sort((a, b) => {
                    if (a[0] === b[0]) return 0;
                    return a[0] < b[0] ? -1 : 1;
                })
                .sort((a, b) => {
                    if (a[1].kind === b[1].kind) return 0;
                    return a[1].kind < b[1].kind ? -1 : 1;
                });

            for (const [key, value] of entries) {
                if (value.kind === 'directory') {
                    const details = document.createElement('details');
                    details.dataset.id = idKey();
                    container.append(details);
                    const summary = document.createElement('summary');
                    summary.classList.add('directory');
                    details.append(summary);

                    if (value.relativePath === '.') {
                        details.open = true;
                        details.classList.add('root');
                        summary.textContent = ' ';
                    } else {
                        details.open = this.openDirectories.has(value.relativePath);
                        details.ontoggle = (event) => {
                            if (details.open) {
                                this.openDirectories.add(value.relativePath);
                            } else {
                                this.openDirectories.delete(value.relativePath);
                            }
                        };
                        const directoryNameSpan = document.createElement('span');
                        directoryNameSpan.classList.add('directory-name');
                        directoryNameSpan.textContent = key;
                        const deleteButton = document.createElement('button');
                        deleteButton.classList.add('text-button');
                        deleteButton.textContent = '🗑️';
                        deleteButton.title = 'Delete directory';
                        deleteButton.classList.add('delete');
                        deleteButton.addEventListener('click', (event) => {
                            this.html.confirmDialog.querySelector('span').textContent = 'directory';
                            this.html.confirmDialog.querySelector('code').textContent = key;

                            this.html.confirmDialog.addEventListener('close', (event) => {
                                    if (this.html.confirmDialog.returnValue === 'delete') {
                                        this._worker.postMessage({
                                            detail: {
                                                message: 'deleteDirectory',
                                                data: value.relativePath,
                                                id: details.dataset.id
                                            }
                                        });
                                    }
                                },
                                { once: true }
                            );
                            this.html.confirmDialog.showModal();
                        });
                        summary.append(directoryNameSpan, deleteButton);
                    }
                    const div = document.createElement('div');
                    details.append(div);
                    this.createTreeHTML(value.entries, div);
                } else if (value.kind === 'file') {
                    const div = document.createElement('div');
                    div.classList.add('file');
                    div.dataset.id = idKey();
                    div.tabIndex = 0;
                    div.title = `Type: ${
                        value.type || 'Unknown'
                    } - Last modified: ${new Date(value.lastModified).toLocaleString()}`;
                    container.append(div);
                    const fileNameButton = document.createElement('button');
                    fileNameButton.classList.add('text-button');
                    fileNameButton.classList.add('file-name');
                    fileNameButton.textContent = key;
                    fileNameButton.addEventListener('click', (event) => {
                        this._worker.postMessage({
                            detail: {
                                message: 'saveFile',
                                data: value
                            }
                        });
                    });
                    const sizeSpan = document.createElement('span');
                    sizeSpan.classList.add('size');
                    sizeSpan.textContent = this.readableSize(value.size);
                    const editButton = document.createElement('button');
                    editButton.classList.add('text-button');
                    const type = value.type || '';
                    if (
                        /^text\//.test(type) ||
                        /\/json/.test(type) ||
                        /\/xml/.test(type) ||
                        /\+json$/.test(type) ||
                        /\+xml$/.test(type)
                    ) {
                        editButton.textContent = '✏️';
                        editButton.title = 'Edit file';
                        editButton.classList.add('edit');
                        editButton.addEventListener('click', (event) => {
                            const textarea = this.html.editDialog.querySelector('.textarea');
                            textarea.value = '';

                            this._worker.postMessage({
                                detail: {
                                    message: 'editFile',
                                    data: value.relativePath
                                }
                            });

                            this.html.editDialog.addEventListener(
                                'close',
                                (event) => {
                                    if (this.html.editDialog.returnValue === 'save') {
                                        console.log('textarea.value', textarea.value);

                                        this._worker.postMessage({
                                            detail: {
                                                message: 'writeFile',
                                                data: value.relativePath,
                                                content: textarea.value
                                            }
                                        });
                                    }
                                },
                                { once: true }
                            );
                            this.html.editDialog.showModal();
                        });
                    }
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('text-button');
                    deleteButton.textContent = '🗑️';
                    deleteButton.title = 'Delete file';
                    deleteButton.classList.add('delete');
                    deleteButton.addEventListener('click', (event) => {
                        this.html.confirmDialog.querySelector('span').textContent = 'file';
                        this.html.confirmDialog.querySelector('code').textContent = key;

                        this.html.confirmDialog.addEventListener('close', (event) => {
                                if (this.html.confirmDialog.returnValue === 'delete') {
                                    this._worker.postMessage({
                                        detail: {
                                            message: 'deleteFile',
                                            data: value.relativePath,
                                            id: div.dataset.id
                                        }
                                    });
                                }
                            }, { once: true }
                        );
                        this.html.confirmDialog.showModal();
                    });
                    div.append(fileNameButton, sizeSpan, editButton, deleteButton);
                }
            }
        },
        writable: false
    },
    writeFile: {
        value: async (fileName = '', binaryData = '' | new Uint8Array()) => {
            const fileHandle = await getFileHandleFromPath(fileName);
            const accessHandle = await getFileAccessHandle(fileHandle);
            const encoder = new TextEncoder();
            const encodedData = encoder.encode(binaryData);

            if (isWorker) {
                accessHandle.write(encodedData, { at: 0 });
                accessHandle.flush();
                accessHandle.close();
            } else {
                await accessHandle.write(encodedData);
                await accessHandle.close();
            }
        },
        writable: false
    },
    readFile: {
        value: async (fileName = '') => {
            const fileHandle = await getFileHandleFromPath(fileName);
            const accessHandle = await getFileAccessHandle(fileHandle);

            let fileSize;
            let buffer;

            if (isWorker) {
                fileSize = accessHandle.getSize();
                buffer = new DataView(new ArrayBuffer(fileSize));
                accessHandle.read(buffer, { at: 0 });
                accessHandle.close();
            } else {
                const file = await fileHandle.getFile();
                fileSize = file.size;
                buffer = new Uint8Array(fileSize);
                await file.arrayBuffer().then(data => buffer.set(new Uint8Array(data)));
            }

            return new Uint8Array(buffer.buffer);
        },
        writable: false
    },
    readdir: {
        value: async (pathName = '') => {
            const dirHandle = await getHandleFromPath(pathName);
            const entries = [];
            for await (const entry of dirHandle.values()) {
                entries.push(entry.name);
            }
            return entries;
        },
        writable: false
    },
    unlink: {
        value: async (fileName = '') => {
            const fileHandle = await getFileHandleFromPath(fileName);
            await fileHandle.removeEntry(fileName);
        },
        writable: false
    },
    mkdir: {
        value: async (fileName = '') => {
            await getHandleFromPath(fileName);
        },
        writable: false
    },
    messageChannel: {
        value: new MessageChannel(),
        writable: true
    },
    '_fer-select': {
        value: null,
        writable: true
    },
    '_nk-git': {
        value: null,
        writable: true
    },
    'fer-select': {
        set(value) {
            this['_fer-select'] = value;
            this.execute().catch(e => {console.error(e)});
        },
        get() {
            return this['_fer-select'];
        }
    },
    'nk-git': {
        set(value) {
            this['_nk-git'] = value;
            this.execute();
        },
        get() {
            return this['_nk-git'];
        }
    },
    _html: {
        value: undefined,
        writable: true
    },
    html: {
        value: null,
        writable: true
    },
    _worker: {
        value: null,
        writable: true
    },
    worker: {
        value: function(value) {
            return new Promise((resolve, reject) => {
                this._worker = new Worker(opfsWorkerUrl.pathname, {
                    name: 'opfs',
                    type: 'module'
                });

                this._worker.onerror = (event) => {
                    console.error('##########################', event);
                };

                this._worker.onmessage = async (event) => {
                    const response = event.data;
                    if (response.status) {
                        switch (response.message) {
                            case 'editFile':
                                // const textarea = editDialog.querySelector('textarea');
                                const textarea2 = this.html.editDialog.querySelector('.textarea');

                                if (response.error) {
                                    this.html.errorDialog.querySelector('p').textContent = response.error;
                                    return this.html.errorDialog.showModal();
                                }

                                // debugger
                                const view = editor(textarea2, response.result);
                                // console.log('codemirror',codemirror.state.setValue)
                                view.dispatch({
                                    changes: {from: 0, to: view.state.doc.toString().length, insert:''}
                                })

                                view.dispatch({
                                    changes: {from: 0, insert: response.result}
                                })
                                // debugger
                                // codemirror.doc = response.result

                                // codemirror.dom.setValue(response.result);
                                // debugger
                                // textarea.value = response.result;
                                break;
                            case 'loaded':
                                resolve(true);
                                break;
                            case 'showSaveFilePicker':
                                try {
                                    const handle = await showSaveFilePicker({
                                        suggestedName: response.request.data.originalFilename
                                    });

                                    const fileData = await response.fileHandle.getFile();
                                    const dataToSave = response.request.data.isSAHPool
                                        ? fileData.slice(response.HEADER_OFFSET_DATA)
                                        : fileData;
                                    const writable = await handle.createWritable();
                                    await writable.write(dataToSave);
                                    await writable.close();
                                } catch (error) {
                                    if (error.name !== 'AbortError') {
                                        console.error(error.name, error.message);
                                    }
                                }
                                break;
                            case 'refresh':
                                storeDataAndUpdateUI(this, 'opfs')
                                    .then(data => {
                                        console.log('######################### REFRESH ???? ###############################')
                                    })
                                    .catch(e => {
                                        console.error('ERROR ', e);
                                    });
                                break;
                            case 'getDirectoryStructure':
                                if (!response?.structure) {
                                    return;
                                }

                                if(event.data?.data?.phase === 'end') {
                                    this.task = {
                                        id: 'nk-git_0',
                                        component: 'nk-git',
                                        type: 'self',
                                        action: 'default',
                                        value: '',
                                        message: 'end of opfs copy',
                                        callback: nkGit,
                                        data: {
                                            id: '',
                                            type: '',
                                            phase: 'end'
                                        }
                                    }
                                }

                                const newLength = JSON.stringify(response.structure).length;
                                if (this.lastLength === newLength) {
                                    return;
                                }

                                this.lastLength = newLength;

                                if (Object.keys(response.structure).length === 0) {
                                    this.main.innerHTML = this.html.mainEmptyHTML;
                                    return;
                                }

                                const div = document.createElement('div');
                                div.classList.add('container')
                                const downloadAllButton = document.createElement('button');
                                downloadAllButton.classList.add('download-all');
                                downloadAllButton.textContent = 'Скачать все';
                                downloadAllButton.addEventListener('click', (event) => {
                                    this._worker.postMessage({
                                        detail: {
                                            message: 'downloadAll',
                                            callback: async (response) => {
                                                if (response.error) {
                                                    this.html.errorDialog.querySelector('p').textContent = response.error;
                                                    return this.html.errorDialog.showModal();
                                                }
                                            }
                                        }
                                    });
                                });
                                div.append(downloadAllButton);
                                this.createTreeHTML(response.structure, div);
                                if (!this.main) {
                                    return;
                                }
                                this.main.innerHTML = '';
                                this.main.append(div);
                                this.main.addEventListener('keydown', (event) => {
                                    if (event.target.nodeName === 'SUMMARY') {
                                        if (event.key === 'ArrowRight') {
                                            event.target.parentElement.open = true;
                                        } else if (event.key === 'ArrowLeft') {
                                            event.target.parentElement.open = false;
                                        }
                                    }
                                });
                                break;
                            case 'deleteDirectory':
                                let currentDirectory = this.shadowRoot.querySelector(`[data-id="${response.id}"]`);
                                if (response.error) {
                                    this.html.errorDialog.querySelector('p').textContent = response.error;
                                    return this.html.errorDialog.showModal();
                                }
                                currentDirectory.remove();

                                const dirs = await this.readdir(`${this.config.root}/${this.config.git}`);

                                let result = []
                                for(let user of dirs) {
                                    const temp = await this.readdir(`${this.config.root}/${this.config.git}/${user}`);
                                    temp.forEach(item => {
                                        result.push(`${this.config.git}/${user}/${item}`)
                                    })
                                }

                                this.task = {
                                    id: 'fer-select_0',
                                    component: 'fer-select',
                                    type: 'self',
                                    action: 'default',
                                    value: '',
                                    method: 'set.item',
                                    callback: ferSelect,
                                    message: {
                                        phase: 'start',
                                        items: result
                                    }
                                };
                                break;
                            case 'writeFile':
                                if (response.error) {
                                    this.html.errorDialog.querySelector('p').textContent = response.error;
                                    return this.html.errorDialog.showModal();
                                }
                                break;
                            case 'deleteFile':
                                let currentDiv = this.shadowRoot.querySelector(`[data-id="${response.id}"]`);
                                if (response.error) {
                                    this.html.errorDialog.querySelector('p').textContent = response.error;
                                    return this.html.errorDialog.showModal();
                                }

                                currentDiv.remove();
                                break;
                            default:
                                break;
                        }
                    }
                };
            });
        },
        writable: true
    },
    init: {
        value: async function(property) {
            // https://stackoverflow.com/questions/14191394/web-workers-communication-using-messagechannel-html5
            this.main = this.shadowRoot.querySelector('main');
            await this.worker();

            this.html = {
                mainEmptyHTML: '<span>🫙</span> Origin Private File System is empty.',
                confirmDialog: this.shadowRoot.querySelector('.confirm-dialog'),
                errorDialog: this.shadowRoot.querySelector('.error-dialog'),
                editDialog: this.shadowRoot.querySelector('.edit-dialog'),
                control: {
                    main: this.shadowRoot.querySelector('main'),
                    dialog: {
                        edit: this.shadowRoot.querySelector('.edit-dialog'),
                        error: this.shadowRoot.querySelector('.error-dialog'),
                        confirm: this.shadowRoot.querySelector('.confirm-dialog')
                    }
                }
            };

            const url = this.config.gitDir

            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                registrations.forEach(service => {
                    service.active.postMessage({
                        type:'service',
                        message: url
                    })
                })
            });

            const dirs = await this.readdir(`${this.config.root}/${this.config.git}`);

            let result = []
            for(let user of dirs) {
                const temp = await this.readdir(`${this.config.root}/${this.config.git}/${user}`);
                temp.forEach(item => {
                    result.push(`${this.config.git}/${user}/${item}`)
                })
            }

            this.task = {
                id: 'fer-select_0',
                component: 'fer-select',
                type: 'self',
                action: 'default',
                value: '',
                method: 'set.item',
                callback: ferSelect,
                message: {
                    phase: 'start',
                    items: result
                }
            };

            return true;
        },
        writable: true
    },
    hardwareConcurrency: {
        set(value) {
            this._hardwareConcurrency = value;
        },
        get() {
            this._hardwareConcurrency = window.navigator.hardwareConcurrency;
            const hardwareConcurrency = this.shadowRoot.querySelector('.hardwareConcurrency');
            hardwareConcurrency.querySelector('.value').textContent = this._hardwareConcurrency;
            return this._hardwareConcurrency;
        }
    },
    onMessage: {
        value: function(event) {
            console.log('event', event)
            debugger
            switch (event.method) {
                case 'update':
                    break
                default:
                    break
            }
        },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};

