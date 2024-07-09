import {Component} from '../index.mjs'
import {ping} from './this/index.mjs'

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
        value: (path) => {
               return ping(path)
                    .then(data => {
                        console.log('----------------- PING 1 -----------------', {
                            data: data
                        })

                        return {
                            status: true,
                            ping: data
                        }
                    }).catch(function (error) {
                    console.log('----------------- PING 2 -----------------')

                       return {
                           status: false
                       }
                })
        },
        writable: false
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

            const initCors = () => {
                this.ping(this.host.cors)
                    .then(data => {
                        console.log('ping result', data)
                        if(!data.status) {
                            initCors()
                        } else {
                            console.log('ping true cors')
                            this.html.cors.status.classList.add('active')
                            this.html.cors.ping.textContent = `${data.ping} ms`
                        }
                    }).catch(e => {console.error('error ping', e)})
            }


            const initSignal = () => {
                this.ping(this.host.signal).then(data => {
                    console.log('ping result', data)
                    if(!data.status) {
                        initSignal()
                    } else {
                        console.log('ping true signal')
                        this.html.signal.status.classList.add('active')
                        this.html.signal.ping.textContent = `${data.ping} ms`
                    }
                }).catch(e => {console.error('error ping', e)})
            }

            initSignal()
            initCors()

            this.pingId = setInterval(() => {
                console.log('ping')
                initSignal()
                initCors()
            }, 14 * 60 * 1000);
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