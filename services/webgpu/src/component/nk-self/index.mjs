import { Component } from '../index.mjs';

const name = 'nk-self';
const component = Component();

Object.defineProperties(component.prototype, {
    init: {
        set(value) {

        }
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};