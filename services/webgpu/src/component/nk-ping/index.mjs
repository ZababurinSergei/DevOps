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
                        this.html[key].status.classList.add('active')
                        this.html[key].ping.textContent = `${data} ms`
                        console.log('---- ping 1 ----')
                    }).catch(function (error) {
                    console.log('---- ping 3 ----', this, key)
                    this.html[key].status.classList.remove('active')
                    this.html[key].ping.textContent = ``
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
                cors: {
                    status: this.shadowRoot.querySelector('.cors'),
                    ping: this.shadowRoot.querySelector('.cors.ping')
                },
                signal: {
                    status: this.shadowRoot.querySelector('.signal'),
                    ping: this.shadowRoot.querySelector('.signal.ping')
                }
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