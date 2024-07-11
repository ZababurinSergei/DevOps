export const gitConfig = (pathname) => {
    let config = pathname
    config = config.replace('https://', '')
    config = config.replace('http://', '')
    config = config.startsWith('/') ? config.trim().replace('/', '') : config.trim()
    config = config.endsWith('/') ? config.trim().slice(0, -1) : config.trim()

    const split = config.split('/')

    let result = {
        git: split[0],
        user: split[1],
        service: split[2]
    }


    result.gitUrl = pathname
    result.gitUser = `/git/${split[0]}/${split[1]}`
    result.gitDir = `/git/${split[0]}/${split[1]}/${split[2]}`

    return result
}

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            broadcastChannel: async (event) => {
                self.external;
            },
            messageerror: async (event) => {
                console.log('ddddddddddddddddddddddddddddd BROADCAST messageerror ddddddddddddddddddddddddddddd', event);
            },
            run: async (event) => {
                try {
                    if (self.html.control.button.run.classList.contains('disabled')) {
                        return;
                    }

                    self.html.control.button.run.classList.add('disabled')

                    self.task = {
                        id: 'nk-opfs_0',
                        component: 'nk-opfs',
                        type: 'self',
                        action: 'default',
                        value: '',
                        message: '',
                        data: {
                            id: '',
                            type: '',
                            phase: ''
                        },
                        callback: async (opfs, data) => {
                            let normalizeLocation = window.location.pathname
                            if (!normalizeLocation.endsWith('/')) {
                                normalizeLocation = normalizeLocation.split('/')
                                normalizeLocation.pop()
                                normalizeLocation = `${normalizeLocation.join('/')}/`
                            }

                            let html = undefined
                            let path = `${self.config.gitDir}/docs/index.html`

                            const initialization = (html) => {
                                const iframe = document.createElement('iframe');

                                iframe.setAttribute('seamless', '');
                                // iframe.setAttribute('credentialless', '')
                                iframe.src = `${window.location.origin}${normalizeLocation}index.sw.html`;
                                // iframe.sandbox = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
                                iframe.dataset.pathname = self.config.gitDir

                                let lastKnownScrollPosition = 0

                                const disable = function() {
                                    window.scrollTo(0, lastKnownScrollPosition);
                                }

                                iframe.addEventListener('mouseenter', function (event) {
                                    navigator.serviceWorker.controller.postMessage({
                                        type: 'service',
                                        message: event.currentTarget.dataset.pathname
                                    });
                                    lastKnownScrollPosition = window.scrollY;
                                    window.addEventListener('scroll', disable);
                                })

                                iframe.addEventListener('mouseleave', function (event) {
                                    window.removeEventListener('scroll', disable);
                                })

                                iframe.addEventListener('load', function (e) {
                                    iframe.contentWindow.postMessage({
                                        html: html
                                    });
                                });

                                self.html.views.run.appendChild(iframe);
                                self.html.control.button.run.classList.add('disabled');
                                self.html.control.button.clear.classList.remove('disabled');
                            }

                            opfs.self.readFile(path)
                                .then(async data => {
                                    html = new TextDecoder().decode(data);
                                    initialization(html)
                                    return 'ok'
                                })
                                .catch(e => {
                                    return opfs.self.readFile(`${self.config.gitDir}/index.html`)
                                })
                                .then(data => {
                                    if (data !== 'ok') {
                                        html = new TextDecoder().decode(data);
                                        initialization(html)
                                    }

                                    return 'ok'
                                })
                                .catch(e => {
                                    return opfs.self.readFile(`${self.config.gitDir}/examples/dist/index.html`)
                                })
                                .then(data => {
                                    if (data !== 'ok') {
                                        html = new TextDecoder().decode(data);
                                        initialization(html)
                                    }

                                    return 'ok'
                                })
                                .catch(e => {
                                    return opfs.self.readFile(`${self.config.gitDir}/examples/src/index.html`)
                                })
                                .then(data => {
                                    if (data !== 'ok') {
                                        html = new TextDecoder().decode(data);
                                        initialization(html)
                                    }

                                    return 'ok'
                                }).catch(async e => {
                                html = {}
                                html = await fetch(`${window.location.origin}${normalizeLocation}fallback.html`)
                                html = await html.text()
                                initialization(html)
                                return 'ok'
                            })
                                .then(data => {
                                    if (data !== 'ok') {
                                        html = new TextDecoder().decode(data);
                                        initialization(html)
                                    }

                                    return 'ok'
                                })
                        }
                    };
                } catch (e) {
                    console.error('ERROR', e);
                }
            },
            mount: async function (event) {
                if (self.html.control.button.mount.classList.contains('disabled')) {
                    return;
                }

                self.html.control.button.mount.classList.add('disabled');

                self.task = {
                    id: 'mss-input_0',
                    component: 'mss-input',
                    type: 'main',
                    action: 'get.git.value',
                    callback: (data) => {
                        if (data.status) {
                            self.config = gitConfig(data.value)
                        }

                        self._worker.postMessage({
                            gitDir: self.config.gitDir,
                            message: 'clear'
                        });
                    }
                }
            },
            clear: async function (event) {
                if (self.html.control.button.clear.classList.contains('disabled')) {
                    return;
                }

                self.html.views.run.innerHTML = '';
                self.html.control.button.clear.classList.add('disabled');
                self.html.control.button.run.classList.remove('disabled');
            },
            bus: {
                frame: async (event) => {
                    if (event.detail.type === 'frame') {

                    }

                    if (event.detail.type === 'stop-frame') {

                    }
                }
            }
        });
    });
};

export default {
    description: 'action'
};