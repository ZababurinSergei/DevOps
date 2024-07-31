import { Component } from '../index.mjs'

const name = 'ob-link'
const component = await Component()

Object.defineProperties(component.prototype, {
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