import {Component} from '../index.mjs'
import {nkGit} from './this/index.mjs'

const name = 'fer-select'

const component = Component()

component.observedAttributes = ["open", "disabled"];

Object.defineProperties(component.prototype, {
    '_nk-git': {
        value: null,
        writable: true
    },
    'nk-git': {
        set(value) {
            this['_nk-git'] = value
            if (this._task.length !== 0) {
                this._task = this._task.filter(item => {
                    if (this['_nk-git'] && item.type === 'nk-git') {
                        this['_nk-git'].onMessage(item)
                        return false
                    } else {
                        return true
                    }
                })
            } else {
                // alert('Сообщений нет')
            }
        },
        get() {
            return this['_nk-git'];
        }
    },
    _options: {
        value: undefined,
        writable: true
    },
    options: {
        set: function (value) {
            this.controller.addEventListener.terminate()
                .then(status => {
                    let items = `<li class="list-item" data-value="">отменить</li>`

                    for (let item of value) {
                        items = items + `<li class="list-item" data-value="${item}">${item}</li>`
                    }

                    this._options = items
                    this.html.list.innerHTML = ''
                    this.html.list.insertAdjacentHTML('beforeend', items)

                    this.controller.addEventListener.init().then(status => {
                        this.disabled = false
                    }).catch(e => console.error(e))
                }).catch((err) => {
                        console.log('Service worker registration failed: ', err);
                });
        },
        get: function () {
            return this._options
        }
    },
    update: {
        value: async function () {
            await this.controller.addEventListener.terminate();
            await this.controller.addEventListener.init();
        },
        writable: false
    },
    erase: {
        get: function () {
            this.classList.remove('visible')
            const button = this.shadowRoot.querySelector('button')
            button.setAttribute('placeholder', '')
        }
    },
    open: {
        set(value) {
            if (value) {

            } else {
                const dropdownBtn = this.shadowRoot.querySelector('[class*="dropdown__button"]');
                const dropdownList = this.shadowRoot.querySelector('[class*="dropdown__list"]');
                const arrow = this.shadowRoot.querySelector('.dropdown__button_arrow');

                arrow.classList.remove('dropdown__arrow_active');
                dropdownBtn.classList.remove('dropdown__button_active');
                dropdownList.classList.remove('dropdown__list_visible');
            }
        },
        get() {
            return this.hasAttribute('open');
        }
    },
    disabled: {
        set(value) {
            if (value) {
                this.setAttribute('disabled', '');
            } else {
                this.removeAttribute('disabled');
            }
        },
        get() {
            return this.hasAttribute('disabled');
        }
    },
    html: {
        value: undefined,
        writable: true
    },
    init: {
        value: function (value) {
            this.html = {
                button: this.shadowRoot.querySelector('[class*="button"]'),
                list: this.shadowRoot.querySelector('[class*="list"]'),
                arrow: this.shadowRoot.querySelector('.button_arrow')
            }

            this.disabled = true
        },
        writable: false
    },
    onMessage: {
        value: function (event) {
            console.trace()
        },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}