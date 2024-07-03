import { Component } from '../index.mjs';

const name = 'nk-self';
const component = await Component();

Object.defineProperties(component.prototype, {
    init: {
        value: function(value) { },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};