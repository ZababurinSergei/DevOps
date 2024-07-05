let tests = Symbol.for("tests");
let swagger = Symbol.for("swagger");
/**
 * Chai import in window['@newkind/tests']
 * console.log('assert',window['@newkind/tests'].assert)
 * console.log('events',window['@newkind/tests'].events)
 * console.log('expect',window['@newkind/tests'].expect)
 * console.log('should',window['@newkind/tests'].should)
 * console.log('events',window['@newkind/tests'].isEmpty)
 */

// console.log('assert',window[tests].assert)
// console.log('expect',window[tests].expect)
// console.log('should',window[tests].should)
// console.log('events',window[tests].isEmpty)

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let nkMemory = null
describe('Service', async function () {
    this.timeout(10000);
    before(async function () {
        await delay(5000)

        nkMemory = window.document.body.querySelector('nk-memory')
        console.log('################## 1 ##################')
    });
    describe('NK-GIT', async function () {
        it('Получить кнопки и лейблы для компонента', function () {
            return new Promise(async (resolve, reject) => {
                const html = (nkMemory.store)['nk-git'][0].self.html
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('NK-OPFS', async function () {
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('FER-SELECT', async function () {
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('MSS-INPUT', async function () {
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('------', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
})