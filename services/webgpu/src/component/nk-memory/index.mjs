import {Component} from '../index.mjs'

const name = 'nk-memory'
const component = await Component()

let isSharedWorker = false

const urlSharedWorker = new URL('./worker.js', import.meta.url)

if (window.SharedWorker) {
    isSharedWorker = true
    console.log('Shared Worker присутствует в системе')
} else {
    alert('shared worker не поддерживается')
}

Object.defineProperties(component.prototype, {
    sharedWorker: {
        value: new SharedWorker(urlSharedWorker, {
            name: 'memory',
            type: 'module'
        }),
        writable: true
    },
    _inputQueue: {
        value: undefined,
        writable: true
    },
    _outputQueue: {
        value: undefined,
        writable: true
    },
    _atomicState: {
        value: undefined,
        writable: true
    },
    _hardwareConcurrency: {
        value: 0,
        writable: true
    },
    _sharedArrayBuffer: {
        value: [],
        writable: true
    },
    hardwareConcurrency: {
        set(value) {
            this._hardwareConcurrency = value
        },
        get() {
            this._hardwareConcurrency = window.navigator.hardwareConcurrency
            const hardwareConcurrency = this.shadowRoot.querySelector('.hardwareConcurrency')
            if(hardwareConcurrency) {
                const value =  hardwareConcurrency.querySelector('.value')
                hardwareConcurrency.querySelector('.value').textContent = this._hardwareConcurrency
                return this._hardwareConcurrency
            }
        }
    },
    inputQueue: {
        set(value) {
            this._inputQueue = value
        },
        get() {
            return this._inputQueue
        }
    },
    atomicState: {
        set(value) {
            this._atomicState = value
        },
        get() {
            return this._atomicState
        }
    },
    outputQueue: {
        set(value) {
            this._outputQueue = value
        },
        get() {
            return this._outputQueue
        }
    },
    sharedArrayBuffer: {
        set(value) {
            if(value?.isRemove) {
                delete this._sharedArrayBuffer[value.name.toLowerCase()]
            } else {
                this._sharedArrayBuffer[value.name.toLowerCase()] = value
            }

            const list = this.shadowRoot.querySelector('.memory-queue')
            list.innerHTML = ''
            for(let item in this._sharedArrayBuffer) {
                const array = []
                for(let key in this._sharedArrayBuffer[item]) {
                    array.push(`<div class="item _${key}"><span class="key"> ${key}:</span> <span class="value">${this.sharedArrayBuffer[item][key]}</span> </div>`)
                }

                list.insertAdjacentHTML('beforeend', `
                <div class="memory _${item}">
                    ${array.join(' ')}
                </div>
            `)
            }
        },
        get() {
            return this._sharedArrayBuffer
        }
    },
    init: {
        value: function(value) { },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}