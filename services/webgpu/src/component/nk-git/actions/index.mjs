export const gitConfig = (pathname) => {
    let config = pathname
    config = config.replace('https://', '')
    config = config.replace('http://', '')
    config = config.startsWith('/') ?  config.trim().replace('/', ''): config.trim()
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

                    self.task = {
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
                            if(!normalizeLocation.endsWith('/')) {
                                normalizeLocation = normalizeLocation.split('/')
                                normalizeLocation.pop()
                                normalizeLocation = `${normalizeLocation.join('/')}/`
                            }

                            let html = undefined
                            let path = `${self.config.gitDir}/docs/index.html`
                            try {
                                html = new TextDecoder().decode(await opfs.readFile(path));
                            } catch (e) {
                                path = `${self.config.gitDir}/index.html`
                                html = new TextDecoder().decode(await opfs.readFile(path));
                            }

                            history.pushState({}, '', `${normalizeLocation}sw/`);

                            const iframe = document.createElement('iframe');
                            iframe.setAttribute('seamless', '');
                            console.log('iframe path: ', `${window.location.origin}${normalizeLocation}sw/index.sw.html`)
                            iframe.src = `${window.location.origin}${normalizeLocation}sw/index.sw.html`;
                            iframe.setAttribute('credentialless','')

                            self.html.views.run.appendChild(iframe);
                            self.html.control.button.run.classList.add('disabled');
                            self.html.control.button.clear.classList.remove('disabled');


                            iframe.addEventListener('load', function(e) {
                                iframe.contentWindow.postMessage({
                                    html: html
                                });
                            });
                        }
                    };
                } catch (e) {
                    console.error('ERROR', e);
                }
            },
            mount: async function(event) {
                if (self.html.control.button.mount.classList.contains('disabled')) {
                    return;
                }

                self.html.control.button.mount.classList.add('disabled');

                self.task = {
                    component: 'mss-input',
                    type: 'main',
                    action: 'get.git.value',
                    callback: (data) => {
                        if(data.status) {
                            self.config = gitConfig(data.value)
                        }

                        self._worker.postMessage({
                            gitDir: self.config.gitDir,
                            message: 'clear'
                        });
                    }
                }
            },
            clear: async function(event) {
                if (self.html.control.button.clear.classList.contains('disabled')) {
                    return;
                }

                history.pushState({}, '', '/');

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