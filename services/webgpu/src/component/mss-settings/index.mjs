import {Component} from '../index.mjs'
// import { mocha } from './this/index.mjs'

const name = 'mss-settings'

const component = await Component()

Object.defineProperties(component.prototype, {
  mocha: {
    value: undefined,
    writable: true
  },
  init: {
    value: async function(value) {
      // const url = new URL('./this/tests/service.tests.mjs', import.meta.url)
      // console.log(url.pathname)
      // mocha(this, url.pathname, false).catch(e => {console.log('error devtool', e)})
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