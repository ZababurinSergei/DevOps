import {Component} from '../index.mjs'

const name = 'nk-memory'
const component = Component()

component.observedAttributes = ["open", "disabled"];

Object.defineProperties(component.prototype, {
    hardwareConcurrency: {
        set(value) {
            this._hardwareConcurrency = value
        },
        get() {
            this._hardwareConcurrency = window.navigator.hardwareConcurrency
            const hardwareConcurrency = this.shadowRoot.querySelector('.hardwareConcurrency')
            if(hardwareConcurrency) {
                const value =  hardwareConcurrency.querySelector('.value')
                hardwareConcurrency.querySelector('.value').textContent = this._hardwareConcurrency
                return this._hardwareConcurrency
            }
        }
    },
    init: {
        set(value) { }
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
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}