import {Component} from '../index.mjs';
import context from 'https://zababurinsergei.github.io/DevOps/context.ld.json' with {type: 'json'};

const initialize = []
const complex = []
const objects = {}

for(let object in context['@context']) {
    let tmp = {}
    if(typeof context['@context'][object] === 'string') {
        if(context['@context'][object].startsWith('cn')) {
            objects[object] = {}
            console.log('------------------- CONTEXT 1 -------------------', object, context['@context'][object])
        }
    } else {
        if(context['@context'][object]['@id'].startsWith('cn') ) {
            if(context['@context'][object]['@container']) {
                objects[object] = []
            } else {
                if(context['@context'][object]['@type'].trim() === 'xsd:string') {
                    objects[object] = ''
                } else if(context['@context'][object]['@type'].trim() === 'xsd:boolean') {
                    objects[object] = false
                } else if(context['@context'][object]['@type'].trim() === 'xsd:float'){
                    objects[object] = 0
                } else {
                    objects[object] = {}
                }

            }

            console.log('------------------- CONTEXT 2 -------------------', object, context['@context'][object])
        }
    }
}


console.log('------------------- CONTEXT -------------------', objects)


for (let item of context.definitions) {
    if ('domain' in item) {
        complex.push(item)
    } else {
        initialize.push(item)
    }
}

// for (let item of initialize) {
//     if ('subClassOf' in item) {
//         const result = initialize.find(data => data['@id'] === item.subClassOf)
//         if (result) {
//             item.subClassOf = result
//         }
//     }
// }

// for (let item of complex) {
//     if ('range' in item) {
//         const result = initialize.find(data => data['@id'] === item.range)
//         if (result) {
//             item.range = result
//         }
//     }
// }

for (let item of complex) {
    switch (typeof item.domain) {
        case 'string':
            let objectDomain = initialize.find(object => object['@id'] === item.domain)
            item.domain = objectDomain
            break
        case "object":
            for (let key in item.domain) {
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


for (let object of initialize) {
    console.log('------- object -------', object)

    for (let item of complex) {
        if (Array.isArray(item.domain)) {
            for (let domain of item.domain) {
                if (domain['@id'] === object['@id']) {
                    const name = item['@id'].replace('#', '').toLowerCase()
                    console.log('-------------- 1 ----------------', item)
                    object[name] = {}
                }
            }
        } else {
            if (item.domain['@id'] === object['@id']) {
                const name = item['@id'].replace('#', '').toLowerCase()
                object[name] = {}
                console.log('-------------- 2 ----------------', item)
                // console.log('--- typeof item.domain ---', object, item['@id'].replace('#', '').toLowerCase())
            }
        }
        // switch (typeof item.domain) {
        //     case 'string':
        // console.log('------- domain -------', object['@id'], item.domain)
        // let objectDomain = initialize.find(object => object['@id'] === item.domain)
        // item.domain = objectDomain
        // break
        // case "object":
        //     for(let key in item.domain) {
        //         console.log('------- domain -------', object['@id'], item.domain)
        //     console.log('------- domain 2 -------', item.domain[key])
        //     let objectDomain = initialize.find(object => object['@id'] === item.domain[key])
        //     delete item.domain[key]
        //     item.domain[key] = objectDomain
        // }
        // break
        // default:
        //     debugger
        //     break
        // }
    }
    // console.log('---------------------', item)
}

// for(let item of complex) {
//     if('domain' in item) {
//         if(Array.isArray(item.domain)) {
//             for(let domain of item.domain) {
// for(let property of initialize) {
//
// }
// const property = initialize.find(data => data['@id'] === domain['@id'])

// switch (property['@type']) {
//     case "rdfs:Datatype":
//         console.log('333333333333333333333333333333333333333333333333333', item)
//         item[`${item['@id'].replace('#','')}`] = []
//         break
//     default:
//         console.warn('Неизвестный тип', property['@type'])
//         break
//
// }
// console.log('-------- property 1', property)
// console.log('-------- domain 1 --------',item['@id'].replace('#',''), item['@type'],'domain: ', domain['@id'], property)
// }
// } else {
//     const property = initialize.find(data => data['@id'] === item.domain['@id'])
// switch (property['@type']) {
//     case "rdfs:Datatype":
//         console.log('333333333333333333333333333333333333333333333333333', item)
//         item[`${item['@id'].replace('#','')}`] = [{...property}]
//         break
//     default:
//         console.warn('Неизвестный тип', property['@type'])
//         break
// }
// console.log('-------- domain 2 --------',item['@id'].replace('#',''), item['@type'], 'domain: ', item.domain['@id'], property)
// }
// }
// }

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
            'edges': [],
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