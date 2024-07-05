import {Component} from '../index.mjs'
import {mocha, expect, should, assert, isEmpty} from './this/index.mjs'

const name = 'nk-mocha'

const component = await Component()

component.observedAttributes = ["open", "disabled"];

Object.defineProperties(component.prototype, {
    mocha: {
        value: mocha,
        writable: true
    },
    expect: {
        value: expect,
        writable: false
    },
    should: {
        value: should,
        writable: false
    },
    assert: {
        value: assert,
        writable: false
    },
    isEmpty: {
        value: isEmpty,
        writable: false
    },
    html: {
        value: null,
        writable: true
    },
    set: {
        value: function(url) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script')
                const meta = new URL(url, import.meta.url)
                script.dataset.type ="test"
                script.type = 'module'
                script.src = `${meta.pathname}`
                window.document.body.appendChild(script)

                script.onload = () => {
                    resolve({
                        status: true,
                        message: ''
                    })
                }

                script.onerror = function (e) {
                    alert("Error loading " + this.src);
                    reject({
                        status: false,
                        message: e
                    })
                };
            })
        },
        writable: false
    },
    remove: {
        value: function(url) {
            const self = this
            return new Promise(function (resolve, reject) {
                const scripts = window.document.body.querySelectorAll('script[data-type="test"]')

                if(scripts.length !== 0) {
                    scripts.forEach(item => {
                        item.remove()
                    })
                }

                self.html.mocha.innerHTML = ''
            })
        },
        writable: false
    },
    open: {
        set(value) {
            console.log('----- value -----', value)
        },
        get() {
            return this.hasAttribute('open');
        }
    },
    disabled: {
        set(value) {
            console.log('----- value -----', value)
        },
        get() {
            return this.hasAttribute('disabled');
        }
    },
    init: {
        value: async function (value) {
            try {
                this.html = {
                    mocha: this.querySelector('#mocha'),
                    button: {
                        add: this.shadowRoot.querySelector('.swagger-save'),
                        remove: this.shadowRoot.querySelector('.swagger-reset')
                    }
                }
                this.mocha.setup("bdd");
                // this.mocha.checkLeaks()
                const url = new URL('./this/tests/service.tests.mjs', import.meta.url)

                await this.set(url.pathname).then(response => {
                    if(response.status) {
                        this.mocha.run((data) => {
                            // console.log('--------------- TEST END ----------------', mocha, data)
                        })
                    }
                }).catch(e => {console.log('error devtool', e)})


            } catch (e) {
                console.error('ERROR MOCHA',e)
            }
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