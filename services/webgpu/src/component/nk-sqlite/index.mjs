import { Component } from '../index.mjs';
import { sqlite3Worker } from './this/index.mjs'

const name = 'nk-sqlite';
const component = await Component();

component.observedAttributes = ['open', 'disabled'];

Object.defineProperties(component.prototype, {
    html: {
        value: null,
        writable: true
    },
    sqlite3: {
        value: null,
        writable: true
    },
    db: {
        value: null,
        writable: true
    },
    init: {
        value: async function(action) {
            this.html = {
                runButton: this.shadowRoot.getElementById('run'),
                clearButton: this.shadowRoot.getElementById('clear'),
                initButton: this.shadowRoot.getElementById('init'),
                inputCode:  this.shadowRoot.getElementById('input-code'),
                testButton: this.shadowRoot.getElementById('test'),
            }

            this.sqlite3 = await sqlite3Worker();
            // this.db = await this.sqlite3.initializeDB("db/index.db");

            console.log('sqlite3 db', this.db)
            this.html.initButton.addEventListener('click', async () => {
                this.db = await this.sqlite3.initializeDB("db/index.db");
            })

            this.html.runButton.addEventListener('click', async () => {
                await this.db.exec({
                    returnValue: "resultRows",
                    sql: this.html.inputCode.value,
                    rowMode: 'object', // 'array' (default), 'object', or 'stmt'
                    columnNames: []
                });
            })

            this.html.clearButton.addEventListener('click', async () => {
                await this.sqlite3.clear();
            })


            this.html.testButton.addEventListener('click', async () => {
                // prepare test
                let result = await this.db.prepare("SELECT * from cars")
                console.log({
                    result
                })

                const res1 = await result.step();
                console.log({
                    res1
                });

                const res2 = await result.get({});
                console.log({
                    res2
                })

                const amount = ['name'];
                const start = new Date();

                const logTime = () => {
                    const total = (new Date()).getTime() - start.getTime();
                    console.log(`Total time: ${total} ms`);
                }



            })

            return true;
        },
        writable: true
    },
    terminate: {
        value: async function(property) {

            return true;
        },
        writable: true
    },
    onMessage: {
        value: function(event) {

        },
        writable: false
    },
    open: {
        set(value) {
            console.log('----- value -----', value);
        },
        get() {
            return this.hasAttribute('open');
        }
    },
    disabled: {
        set(value) {
            console.log('----- value -----', value);
        },
        get() {
            return this.hasAttribute('disabled');
        }
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};

