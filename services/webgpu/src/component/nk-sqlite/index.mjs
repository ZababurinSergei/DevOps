import { Component } from '../index.mjs';
import { sqlite3Worker, editor } from './this/index.mjs'

const name = 'nk-sqlite';
const component = await Component();

Object.defineProperties(component.prototype, {
    html: {
        value: null,
        writable: true
    },
    editor: {
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

            this.editor = editor(this.html.inputCode, ``);
            // console.log('codemirror',codemirror.state.setValue)
            this.editor.dispatch({
                changes: {from: 0, to: this.editor.state.doc.toString().length, insert:''}
            })

            this.editor.dispatch({
                changes: {from: 0, insert: `
CREATE TABLE cars
(
    id       INT PRIMARY KEY NOT NULL,
    name     TEXT            NOT NULL,
    color_id INT
);
CREATE TABLE colors
(
    id   INT PRIMARY KEY NOT NULL,
    name TEXT            NOT NULL
);

INSERT INTO cars (id, name, color_id)
VALUES (1, 'honda', 1),
       (2, 'honda', 2),
       (3, 'fiat', 1),
       (4, 'fiat', 2);

INSERT INTO colors (id, name)
VALUES (1, 'yellow'),
       (2, 'green');

SELECT *
FROM cars;
                    `}
            })

            this.sqlite3 = await sqlite3Worker();

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
                await this.sqlite3.clear('db');
            })


            this.html.testButton.addEventListener('click', async () => {
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
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};

