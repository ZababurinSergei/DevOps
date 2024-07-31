import {Component} from '../index.mjs'

const name = 'nk-swagger'

const component = await Component()

Object.defineProperties(component.prototype, {
    html: {
        value: null,
        writable: true
    },
    init: {
        value: function (value) {
            // this.html = {
            //     button: this.shadowRoot.querySelector('[class*="button"]'),
            //     list: this.shadowRoot.querySelector('[class*="list"]'),
            //     arrow: this.shadowRoot.querySelector('.button_arrow')
            // }

            // this.disabled = true
        },
        writable: false
    },
    onMessage: {
        value: function (event) {
            console.trace()
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