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
            for (let key in this.host) {
                let url = `${this.host[key]}/ping`
                fetch({
                    method: "GET",
                    url: url,
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                })
                    .then(data => {
                        console.log('---- ping 1 ----', this, data)
                        return data.text()
                    })
                    .then(data => {
                        console.log('---- ping 2 ----', this, this.host[key], data)
                    }).catch(e => {
                            console.log('---- ping 3 ----', this)
                    // this.ping()
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
            this.pingId = setInterval(this.ping, 14 * 60 * 1000);
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