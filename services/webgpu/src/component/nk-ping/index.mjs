import { Component } from '../index.mjs'

const name = 'nk-ping'

const component = await Component()

Object.defineProperties(component.prototype, {
    html: {
        value: undefined,
        writable: true
    },
    init: {
        value: function(value) {
            this.html = {
                container: this.shadowRoot.querySelector('.container'),
                input: this.shadowRoot.querySelector('input')
            }

            this.removeAttribute('disabled')
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