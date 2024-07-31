import {Component} from '../index.mjs'

const name = 'nk-emulator'
const component = await Component()

Object.defineProperties(component.prototype, {

});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e)
}

export default {}