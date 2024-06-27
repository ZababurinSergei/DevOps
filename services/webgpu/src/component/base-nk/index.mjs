import { init, onload, v4 as uuidv } from './this/index.mjs';
import { onMessage } from './onMessage.mjs';

const servicePath = new URL('../', import.meta.url);

const store = {};
let eventMessages = {};

const BaseClass = class extends HTMLElement {
    _isOnload = false;
    controller = {};
    component = (name = 'undefined', uuid = undefined) => (uuid !== undefined ? store[name][uuid] : store[name]);

    _broadcastChannel = [{
        self: new BroadcastChannel('broadcast'),
        value: undefined,
        await: undefined
    }];

    set broadcastChannel(value) {
        this._broadcastChannel[0].value = value;
        if (value.hasOwnProperty('await')) {
            this._broadcastChannel[0].await = value.await;
        }
        this._broadcastChannel[0].self.addEventListener('message', this._broadcastChannel[0].value.broadcastChannel);
        this._broadcastChannel[0].self.addEventListener('messageerror', this._broadcastChannel[0].value.messageerror);
        this._broadcastChannel[0].self.postMessage({
            name: this.tagName
        });
    }

    get broadcastChannel() {
        return this._broadcastChannel[0].value;
    }

    get external() {
        if (this._broadcastChannel[0].await) {
            let componentState = {};
            let errors = [];
            for (let component of this._broadcastChannel[0].await) {
                if (store[component]) {
                    if (!componentState.hasOwnProperty(component)) {
                        componentState[component] = [];
                    }
                    componentState[component] = store[component];
                } else {
                    errors.push({
                        error: 'компонент не найден',
                        component: component
                    });
                }
            }

            const isError = errors.length !== 0;

            if (!isError) {
                for (let i = 0; i < this._broadcastChannel[0].await.length; ++i) {
                    if (this[this._broadcastChannel[0].await[i]] === null) {
                        const component = this._broadcastChannel[0].await[i];
                        this[this._broadcastChannel[0].await[i]] = componentState[component][0].self;
                    }
                }
            }

            return true;
        } else {
            return {
                status: true,
                value: undefined,
                description: `для компонента нет подключаемых компонентов. Если это требуется добавьте их в массив await
                       self.broadcastChannel = {
                          await: ['nk-opfs'],
                          broadcastChannel: actions.broadcastChannel,
                          messageerror: actions.messageerror
                       }`
            };
        }
    }

    _config = {};

    get config() {
        return this._config;
    }

    set config(value) {
        for (let key in value) {
            this._config[key] = value[key];
        }
        return true;
    }

    get store() {
        return store;
    }

    fetch = async function() {
        this._task = this._task.filter(item => {
            if (item.id === this.tagName.toLowerCase()) {
                switch (item.type) {
                    case 'self':
                        if (this[`_${item.component}`]) {
                            const bindOnMessage = item.hasOwnProperty('callback') ? item.callback.bind(this) : onMessage.bind(this);
                            bindOnMessage(this[`_${item.component}`], item);
                            return false;
                        }

                        return true;
                        break;
                    case 'main':
                        if ((this.store).hasOwnProperty(item.component)) {
                            this.store[`${item.component}`].forEach(component => {
                                component.self.onMessage(item);
                            });

                            return false;
                        }

                        return true;
                        break;
                    case 'worker':
                        if (this[`_${item.component}`]) {
                            if (item.hasOwnProperty('callback')) {
                                delete item.callback;
                            }

                            if (this[`_${item.component}`]._worker !== null) {
                                this[`_${item.component}`]._worker.postMessage(item);
                                return false;
                            }

                            if (this[`_${item.component}`]._worker === undefined) {
                                console.error('Не должно быть undefined');
                                return false;
                            }
                        }

                        return true;
                        break;
                    default:
                        break;
                }
            }

            return true;
        });
    };

    _task = [];

    set task(value) {
        this._task.push(Object.assign(value, {
            id: this.tagName.toLowerCase(),
            uuid: this.dataset.uuid
        }));
        this.fetch().catch(e => console.error(e));
    }

    get task() {
        return {
            task: this._task,
            new: structuredClone({
                id: this.tagName.toLowerCase(),
                uuid: this.dataset.uuid,
                component: this._broadcastChannel[0].await,
                type: ['self', 'main', 'worker'],
                action: 'default',
                value: '',
                message: '',
                data: {
                    id: '',
                    type: '',
                    phase: ''
                }
            })
        };
    }

    get help() {
        return {
            task: {
                id: this.tagName.toLowerCase(),
                uuid: this.dataset.uuid,
                component: this._broadcastChannel[0].await,
                type: ['self', 'main', 'worker'],
                action: 'default',
                value: '',
                message: {
                    id: '',
                    type: '',
                    phase: ''
                }
            }
        };
    }

    constructor() {
        super();
        this.dataset.servicesPath = servicePath.pathname;
        this.config = {
            root: '/git',
            git: 'github.com',
            user: 'ElenaSidneva',
            service: 'mss',
            gitUser: `/git/github.com/ElenaSidneva`,
            gitDir: `/git/github.com/ElenaSidneva/yoga_studio`,
            gitUrl: `https://github.com/ElenaSidneva/yoga_studio`,
            oauth2format: 'github',
            corsProxy: 'https://cors.isomorphic-git.org',
            branch: 'main'
        };

        init(this).then(() => {
            this._isOnload = true;
        }).catch(error => console.warn('error', error));
    }

    connectedCallback() {
        if (this.dataset?.servicesPath) {
            onload(this)
                .then(async (self) => {
                    const name = self.tagName.toLowerCase();
                    const { actions, controller } = await import(`${self.dataset.servicesPath}${name}/this/index.mjs`);
                    self.controller = await controller(self, await actions(self));
                    await self.controller.addEventListener.init();
                    self.dataset.uuid = uuidv();

                    if (!store.hasOwnProperty(name)) {
                        store[name] = [];
                    }

                    store[name].push({
                        uuid: self.dataset.uuid,
                        self: self
                    });


                })
                .catch(e => console.error('error', e));
        }
    }

    disconnectedCallback() {
        this?.controller?.addEventListener?.terminate();

        if (this._broadcastChannel.value) {
            this._broadcastChannel.self.removeEventListener('message', this._broadcastChannel.value.broadcastChannel);
            this._broadcastChannel.self.removeEventListener('messageerror', this._broadcastChannel.value.messageerror);
        }

        this._broadcastChannel.self.close();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(`☢ ---------------------------${this.tagName} Attribute ${name} has changed.`, {
        //     name: name,
        //     oldValue: oldValue,
        //     newValue: newValue
        // });

        if ('attribute' in this) {
            this?.attribute({
                name: name,
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }

    adoptedCallback() {

    }
};

export const Component = (() => {
    return () => {
        const body = `return ${BaseClass}`;
        const baseComponent = new Function('onMessage', 'eventMessages', 'store', 'uuidv', 'servicePath', 'init', 'onload', body);
        return baseComponent(onMessage, eventMessages, store, uuidv, servicePath, init, onload, body);
    };
})(new URL('./', import.meta.url));
