import { Component } from '../index.mjs'

const name = 'nk-ide'

const component = await Component()

component.observedAttributes = ["open", "disabled"];


Object.defineProperties(component.prototype, {
    _api: {
      value: undefined,
      writable: true
    },
    callback: {
        value: {
            callback: (api) => {
                this._api = api
            }
        },
        writable: true
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