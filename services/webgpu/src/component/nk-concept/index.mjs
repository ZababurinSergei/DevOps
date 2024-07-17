import {Component} from '../index.mjs';
import context from 'https://zababurinsergei.github.io/DevOps/context.ld.json' assert {type: 'json'};

const initialize = []
const complex = []
for(let item of context.definitions) {

    if('domain' in item) {
        complex.push(item)
    } else {
        initialize.push(item)
    }
}

for(let item of complex) {
    switch (typeof item.domain) {
        case 'string':
            let objectDomain = initialize.find(object => object['@id'] === item.domain)
            item.domain = objectDomain
            break
        case "object":
            for(let key in item.domain) {
                let objectDomain = initialize.find(object => object['@id'] === item.domain[key])
                delete item.domain[key]
                item.domain[key] = objectDomain
            }
            break
        default:
            debugger
            break
    }
}

console.log('-------------------||| context |||-------------------', {
    complex: complex,
    initialize: initialize
})

const name = 'nk-concept';

const component = await Component();

component.observedAttributes = ['open', 'disabled'];

Object.defineProperties(component.prototype, {
    html: {
        value: null,
        writable: true
    },
    edge: {
        value: () => {

            return {
                '@id': '/checklist',
                '@type': 'Edge',
                'dataset': '/d/DevOps',
                'license': 'cc:by-sa/4.0',
                'surfaceText': 'Сервис checklist',
                'url': 'https://github.com/ElenaSidneva/yoga_studio',
                'weight': 1.0
            }
        },
        writable: true
    },
    save: {
        value: async () => {
            console.log('< ---------------- >', this.json)
        },
        writable: true
    },
    json: {
        value: {
            '@context': [
                "https://api.conceptnet.io/ld/conceptnet5.5/pagination.ld.json",
                'https://zababurinsergei.github.io/DevOps/context.ld.json'
            ],
            '@id': '/DevOps',
            'version': '5.8.1',
            'edges': [ ],
            "weight": 1.0,
            'view': {
                '@id': '/DevOps',
                '@type': 'PartialCollectionView'
            }
        },
        writable: true
    },
    init: {
        value: async function () {
            this.html = {
                definitions: this.shadowRoot.querySelector('.definitions')
            }

            this.html.definitions.textContent = JSON.stringify(complex, null, 4)

            return true
        },
        writable: true
    },
    onMessage: {
        value: function (event) {
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