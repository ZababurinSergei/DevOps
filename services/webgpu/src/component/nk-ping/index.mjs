import {Component} from '../index.mjs'

const name = 'nk-ping'

const component = await Component()

Object.defineProperties(component.prototype, {
    pingId: {
        value: false,
        writable: true
    },
    host: {
        value: {
            cors: 'https://cors-pr6x.onrender.com',
            signal: 'https://devops-y56f.onrender.com'
        },
        writable: true
    },
    ping: {
        value: function () {
            fetch()
        },
        writable: true
    },
    html: {
        value: undefined,
        writable: true
    },
    init: {
        value: function (value) {
            this.html = {
                cors: this.shadowRoot.querySelector('.cors'),
                signal: this.shadowRoot.querySelector('.signal')
            }

            this.ping = setInterval(this.ping, 14 * 60 * 1000);
        },
        writable: false
    },
    terminate: {
        value: function (value) {
            clearInterval(this.ping)
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