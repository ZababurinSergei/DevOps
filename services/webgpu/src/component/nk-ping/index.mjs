import { Component } from '../index.mjs'
import { ping } from './this/index.mjs'

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
            for(let key in this.host) {
                ping(this.host[key])
                    .then(data => {
                        this.html[key].classList.add('active')
                        console.log('---- ping 1 ----',key,  data)
                    }).catch(function (error) {
                    console.log('---- ping 3 ----', this, key)
                    this.html[key].classList.remove('active')
                    this.ping()
                })
            }
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

            this.ping()
            this.pingId = setInterval(this.index, 14 * 60 * 1000);
        },
        writable: false
    },
    terminate: {
        value: function (value) {
            clearInterval(this.pingId)
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