import { Component } from '../index.mjs';

const name = 'nk-sqlite';
const component = await Component();

// const opfsWorkerUrl = new URL('./worker.js', import.meta.url);

component.observedAttributes = ['open', 'disabled'];

Object.defineProperties(component.prototype, {
    html: {
        value: null,
        writable: true
    },
    _worker: {
        value: null,
        writable: true
    },
    worker: {
        value: function(value) {
            return new Promise((resolve, reject) => {
                this._worker = new Worker(opfsWorkerUrl.pathname, {
                    name: 'sqlite',
                    type: 'module'
                });

                this._worker.onerror = (event) => {
                    console.error('##########################', event);
                };

                this._worker.onmessage = async (event) => {

                };
            });
        },
        writable: true
    },
    init: {
        value: async function(property) {

            console.log('=== init ===')
            return true;
        },
        writable: true
    },
    terminate: {
        value: async function(property) {

            return true;
        },
        writable: true
    },
    onMessage: {
        value: function(event) {

        },
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

