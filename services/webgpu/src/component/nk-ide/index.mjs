import { Component } from '../index.mjs'

const name = 'nk-ide'

const component = await Component()

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
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}