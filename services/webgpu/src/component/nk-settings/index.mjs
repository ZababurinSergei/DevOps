import { Component } from '../index.mjs';

const name = 'nk-settings';

const component = await Component();

component.observedAttributes = ['open', 'disabled'];

Object.defineProperties(component.prototype, {
    html: {
        value: null,
        writable: true
    },
    init: {
        value: async function() {
            this.html = {
                control: {
                    button: {
                        upload: this.shadowRoot.querySelector('.fonts-button')
                    },
                    input: {
                        upload: this.shadowRoot.querySelector('#font-input')
                    }
                }
            }

            return this.html
        },
        writable: true
    },
    onMessage:{
        value: function(event) { },
        writable: false
    },
    open: {
        set(value) {
            console.log('----- value -----', value);
        },
        get() {
            return this.hasAttribute('open');
        }
    },
    disabled: {
        set(value) {
            console.log('----- value -----', value);
        },
        get() {
            return this.hasAttribute('disabled');
        }
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};