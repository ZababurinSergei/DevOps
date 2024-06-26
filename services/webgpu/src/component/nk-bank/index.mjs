import {Component} from '../index.mjs'

const name = 'nk-bank'

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
    },
    _test: {
        value: "",
        writable: true
    },
    test: {
        set(value) {
            this._test = value
        },
        get() {
            return this._test
        },
        enumerable: true
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}