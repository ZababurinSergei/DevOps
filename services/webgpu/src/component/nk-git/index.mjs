import { isEmpty } from '../../this/index.mjs';
import { Component } from '../index.mjs';
import { nkOpfs } from './this/index.mjs'

const name = 'nk-git';
const component = await Component();

const forgetSavedPassword = (url) => {
    localStorage.removeItem('pass');
    return true;
};

const lookupSavedPassword = () => {
    const auth = window.localStorage.getItem('pass');
    if (!isEmpty(auth)) {
        return JSON.parse(auth);
    } else {
        return false;
    }
};
const savedPassword = (url, auth) => {
    try {
        window.localStorage.setItem('pass', JSON.stringify(auth));
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const updateLabel = (self, phase, object = {total: 0}) => {
    if(phase === 'opfs:refresh') {
        self.html.label.refreshOpfs.textContent = `refresh opfs tree: 100%`
    }

    if(phase === 'clear:opfs') {
        self.html.label.clear.textContent = `clear opfs tree:100%`
    }

    if(phase === 'copyToOPFS') {
        self.html.label.copyToOPFS.textContent = `Copy to opfs files total ${object.total}: 100%`
    }

    if(phase === 'listFiles') {
        self.html.label.listFiles.textContent = `List files total ${object.total}: 100%`
    }

    if(phase.includes('Enumerating')) {
        self.html.label.enumerating.textContent = phase
    }

    if(phase.includes('Counting')) {
        self.html.label.counting.textContent = phase
    }

    if(phase.includes('Compressing')) {
        self.html.label.compressing.textContent = phase

        if(phase.includes('done')) {
            self.html.progress.indeterminate.classList.add('visible');
            self.status.isDownloading = true
        }
    }

    if(phase.includes('Total')) {
        self.html.label.total.textContent = phase
        self.status.isDownloading = false
        self.html.progress.indeterminate.classList.remove('visible');
        self.html.progress.label.textContent = ''
    }
};

const workerUrl = new URL('./worker.js' , import.meta.url)

Object.defineProperties(component.prototype, {
    root: {
        value: null,
        writable: true
    },
    '_nk-opfs': {
        value: null,
        writable: true
    },
    'nk-opfs': {
        set(value) {
            this['_nk-opfs'] = value
            this.execute().catch(e => {console.error(e)})
        },
        get() {
            return this['_nk-opfs'];
        }
    },
    _worker: {
        value: null,
        writable: true
    },
    worker: {
        value: function(value) {
            return new Promise((resolve, reject) => {
                this._worker = new Worker(`${workerUrl.pathname}?dir=${this.config.gitDir}`, {
                    name: 'git',
                    type: 'module'
                })

                this._worker.onerror = async (event) => {
                    console.error('--- WORKER ERROR ---: ',event)
                }

                this._worker.onmessage = async (event) => {
                    const {status, data, message} = event.data
                    if(status) {
                        switch (message) {
                            case 'loaded':
                                resolve(true);
                                break
                            case 'opfs:refresh:tree':
                                this.task = {
                                    id: 'nk-opfs_0',
                                    component: 'nk-opfs',
                                    type: 'worker',
                                    action: 'refresh',
                                    value: true,
                                    callback: nkOpfs,
                                    message: 'refresh',
                                    data: {
                                        phase: 'only'
                                    }
                                }
                                break
                            case 'opfs:refresh':
                                updateLabel(this, data.phase, data);
                                this.progress.label.textContent = ``
                                this.progress.bar.classList.remove('visible');
                                this.progress.indeterminate.classList.remove('visible');
                                break
                            case  'clear:opfs':
                                updateLabel(this, data.phase, data);
                                this.html.progress.label.textContent = `opfs очищена`
                                this.html.progress.bar.classList.remove('visible');
                                this.html.progress.indeterminate.classList.remove('visible');
                                this._worker.postMessage({
                                    config: this.config,
                                    message: 'status'
                                })
                                break
                            case  'copyToOPFS':
                                updateLabel(this, data.phase, data);
                                this.html.progress.label.textContent = `Обновление дерева opfs`
                                this.html.progress.bar.classList.remove('visible');
                                this.html.progress.indeterminate.classList.add('visible');

                                this.task = {
                                    id: 'nk-opfs_0',
                                    component: 'nk-opfs',
                                    type: 'worker',
                                    action: 'refresh',
                                    value: true,
                                    callback: nkOpfs,
                                    message: 'refresh',
                                    data: {
                                        phase: 'end'
                                    }
                                }
                                break
                            case  'copyToOPFS:status':
                                this.html.progress.label.textContent = `copy to opfs: ${data.loaded}/${data.total}`
                                this.html.progress.bar.max = data.total
                                this.html.progress.bar.value = data.loaded
                                this.html.progress.bar.classList.add('visible');
                                this.html.progress.indeterminate.classList.remove('visible');
                                break
                            case  'listFiles':
                                updateLabel(this, data.phase, data);
                                this.html.progress.bar.classList.add('visible');
                                this.html.progress.indeterminate.classList.remove('visible');
                                this._worker.postMessage({ message: 'copyToOPFS', config: this.config})
                                break
                            case  'onMessage':
                                updateLabel(this, data.phase);
                                break
                            case  'onProgress':
                                if(data.phase === 'Counting objects') {
                                    this.html.progress.bar.classList.add('visible');
                                    this.html.progress.indeterminate.classList.remove('visible');
                                    this.html.progress.bar.max = data.total
                                    this.html.progress.bar.value = data.loaded
                                    this.html.progress.label.textContent = data.phase
                                }

                                if(data.phase === 'Compressing objects') {
                                    this.html.progress.bar.classList.add('visible');
                                    this.html.progress.indeterminate.classList.remove('visible');
                                    this.html.progress.bar.max = data.total
                                    this.html.progress.bar.value = data.loaded
                                    this.html.progress.label.textContent = data.phase
                                }

                                if(this.status.isDownloading) {
                                    this.html.progress.bar.classList.remove('visible');
                                    this.html.progress.indeterminate.classList.add('visible');
                                    this.html.progress.label.textContent = 'Downloading'
                                }

                                if(data.phase === 'Receiving objects') {
                                    this.html.progress.bar.classList.add('visible');
                                    this.html.progress.indeterminate.classList.remove('visible');
                                    this.html.progress.bar.max = data.total
                                    this.html.progress.bar.value = data.loaded
                                    this.html.progress.label.textContent = data.phase
                                }

                                if(data.phase === 'Resolving deltas') {
                                    this.html.progress.bar.classList.add('visible');
                                    this.html.progress.indeterminate.classList.remove('visible');
                                    this.html.progress.bar.max = data.total
                                    this.html.progress.bar.value = data.loaded
                                    this.html.progress.label.textContent = data.phase
                                }

                                if(data.phase === 'Analyzing workdir') {
                                    this.html.progress.bar.classList.remove('visible');
                                    this.html.progress.indeterminate.classList.add('visible');
                                    this.html.progress.label.textContent = data.phase
                                }

                                if(data.phase === 'Updating workdir') {
                                    this.html.progress.bar.classList.add('visible');
                                    this.html.progress.indeterminate.classList.remove('visible');
                                    this.html.progress.bar.max = data.total
                                    this.html.progress.bar.value = data.loaded
                                    this.html.progress.label.textContent = data.phase
                                }
                                break
                            case 'status':
                                this.html.label.status.textContent = `Status README.md: ${data}`
                                this.html.label.warning.forEach(item => {
                                    if(item.classList.contains('clone')) {
                                        item.textContent = 'сервис находится на бесплатном хосте который засыпает. Начало загрузки надо подождать пока сервис проснется.'
                                    }
                                })
                                let auth = localStorage.getItem('pass')
                                if (auth === null) {
                                    if (confirm('This repo is password protected. Ready to enter a username & password?')) {
                                        auth = {
                                            username: prompt('Введите логин'),
                                            password: prompt('Введите пароль')
                                        };

                                        if (confirm('Запомнить пароль ?')) {
                                            savedPassword({}, auth);
                                        }

                                        this._worker.postMessage({
                                            message: 'clone',
                                            auth: auth,
                                            config: this.config
                                        })
                                    }
                                } else {
                                    this._worker.postMessage({
                                        message: 'clone',
                                        auth: JSON.parse(auth),
                                        config: this.config
                                    })
                                }
                                break
                            case 'clone':
                                this.html.label.clone.textContent = 'Clone repository: 100%'
                                this.html.progress.bar.classList.remove('visible');

                                this.html.progress.label.textContent = `listFiles`
                                this.html.progress.indeterminate.classList.add('visible');
                                this._worker.postMessage({ message: 'listFiles', config: this.config })
                                break
                            default:
                                console.warn('[MAIN] Сообщение не обрабатывается', event.data)
                                break
                        }
                    } else {
                        switch (message) {
                            case 'clone':
                                if(event.data.data.toString().includes('403 Forbidden') || event.data.data.toString().includes('401 Unauthorized')) {
                                    if (confirm('Этот репозиторий защищен логином и паролем. Готовы ввести логин и пароль ?')) {
                                        const auth = {
                                            username: prompt('Введите логин'),
                                            password: prompt('Введите пароль')
                                        };

                                        if (confirm('Запомнить пароль ?')) {
                                            savedPassword({}, auth);
                                        }

                                        this._worker.postMessage({
                                            message: 'clone',
                                            auth: auth,
                                            config: this.config
                                        })
                                    }
                                } else if(event.data.data === 'wrong password') {
                                    forgetSavedPassword({});
                                    if (confirm('Доступ запрещен. Попробовать снова ?')) {
                                        let auth = {
                                            username: prompt('Введите логин'),
                                            password: prompt('Введите пароль')
                                        };

                                        if (confirm('Запомнить пароль ?')) {
                                            savedPassword({}, auth);
                                        }

                                        this._worker.postMessage({
                                            message: 'clone',
                                            auth: auth,
                                            config: this.config
                                        })
                                    }
                                } else {
                                    if(event.data.data.toString().includes('Failed to fetch')) {
                                        this.html.label.error.textContent = `${event.data.data.toString()} Проверьте включен ли сервер corse proxy`
                                    }

                                    alert(`AUTH ERROR: ${event.data.data.toString()}`)
                                }
                                break
                            default:
                                console.warn('[MAIN] ERROR Сообщение не обрабатывается', event.data)
                                break
                        }
                    }
                }
            })
        },
        writable: true
    },
    _hardwareConcurrency: {
        value: 0,
        writable: true
    },
    html: {
        value: undefined,
        writable: true
    },
    status: {
        value: {
            isDownloading: false
        },
        writable: true
    },
    init: {
        value: async function() {
                 await this.worker()

                 this.html = {
                     views: {
                         run: this.shadowRoot.querySelector('.run')
                     },
                     control: {
                         button: {
                             mount: this.shadowRoot.querySelector('#mount'),
                             run: this.shadowRoot.querySelector('#run'),
                             clear: this.shadowRoot.querySelector('#clear')
                         }
                     },
                     progress: {
                         label: this.shadowRoot.querySelector('.progress_label'),
                         bar: this.shadowRoot.querySelector('.progress-bar'),
                         indeterminate: this.shadowRoot.querySelector('.indeterminate-progress-bar')
                     },
                     label: {
                         status: this.shadowRoot.querySelector('.status'),
                         enumerating: this.shadowRoot.querySelector('.enumerating'),
                         counting: this.shadowRoot.querySelector('.counting'),
                         compressing: this.shadowRoot.querySelector('.compressing'),
                         total: this.shadowRoot.querySelector('.total'),
                         clone: this.shadowRoot.querySelector('.clone:not(.warning)'),
                         listFiles: this.shadowRoot.querySelector('.listFiles'),
                         copyToOPFS:this.shadowRoot.querySelector('.copy-to-opfs'),
                         error: this.shadowRoot.querySelector('.error'),
                         clear: this.shadowRoot.querySelector('.clear'),
                         refreshOpfs: this.shadowRoot.querySelector('.refresh-opfs'),
                         warning: this.shadowRoot.querySelectorAll('.warning')
                     },
                 }

                 this.task = {
                     id: 'nk-opfs_0',
                     component: 'nk-opfs',
                     type: 'worker',
                     action: 'refresh',
                     value: true,
                     callback: nkOpfs,
                     message: 'refresh'
                 }

                 return this.html
        },
        writable: true
    },
    onMessage:{
        value: function(event) {
            switch (event.method) {
                case 'update':
                    if(event.message.phase === "only") {
                        updateLabel(this, event.message.phase, event.message);
                        this.html.progress.label.textContent = `only opfs update`
                    }

                    if(event.message.phase === "opfs:refresh") {
                        updateLabel(this, event.message.phase, event.message);
                        this.html.progress.label.textContent = `opfs update`
                        this.html.control.button.run.classList.remove('disabled')
                        this.html.control.button.mount.classList.remove('disabled')
                        this.html.progress.bar.classList.remove('visible');
                        this.html.progress.indeterminate.classList.remove('visible');
                    }
                    break
                default:
                    console.warn('Событие не обрабатывается', event)
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