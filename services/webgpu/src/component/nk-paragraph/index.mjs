import { Component } from '../index.mjs'

const name = 'nk-paragraph'
const component = await Component()

component.observedAttributes = ["open", "disabled"];

Object.defineProperties(component.prototype, {
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
        value: async () => {

        },
        writable: false
    },
    terminate: {
        value: async () => {

        },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
    debugger
}

export default {}