import { Mocha } from './chai/index.mjs'
export const mocha = Mocha
export { expect, should, assert } from './test/index.mjs'
export { isEmpty } from './isEmpty/isEmpty.mjs'

// import * as chai from '../../../node_modules/@bundled-es-modules/chai/index.js';
// export const expect = chai.expect
// export const should = chai.should
// export const assert = chai.assert

export default {
    description: 'test'
}