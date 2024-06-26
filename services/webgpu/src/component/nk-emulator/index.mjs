import {Component} from '../index.mjs'

const name = 'nk-emulator'
const component = Component()

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
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}