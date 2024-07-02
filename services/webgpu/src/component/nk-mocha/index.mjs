import {Component} from '../index.mjs'
import {mocha, expect, should, assert, isEmpty} from './this/index.mjs'

const name = 'nk-mocha'

const component = Component()

component.observedAttributes = ["open", "disabled"];

Object.defineProperties(component.prototype, {
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
    set: {
        value: function(url) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.type = 'module'
                script.src = `${url}`
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
    mocha: {
        value: undefined,
        writable: true
    },
    init: {
        value: async function (value) {
            try {
                mocha.setup("bdd");
                mocha.checkLeaks()
                const url = new URL('./this/tests/service.tests.mjs', import.meta.url)

                await this.set(url.pathname).then(response => {
                    if(response.status) {
                        mocha.run((data) => {

                            // mocha.reset
                            console.log('--------------- TEST END ----------------', mocha, data)
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