import {Component} from '../index.mjs';
import context from 'https://zababurinsergei.github.io/DevOps/context.ld.json' with {type: 'json'};

const Relation = [{
    uri: '/r/RelatedTo',
    description: 'The most general relation. There is some positive relationship between A and B, but ConceptNet can\'t determine what that relationship is based on the data. This was called "ConceptuallyRelatedTo" in ConceptNet 2 through 4. Symmetric.',
    examples: 'learn ↔ erudition'
}, {
    uri: '/r/FormOf',
    description: 'A is an inflected form of B; B is the root word of A.',
    examples: 'slept → sleep'
}, {
    uri: '/r/IsA',
    description: 'A is a subtype or a specific instance of B; every A is a B. This can include specific instances; the distinction between subtypes and instances is often blurry in language. This is the hyponym relation in WordNet.',
    examples: 'car → vehicle; Chicago → city'
}, {
    uri: '/r/PartOf',
    description: 'A is a part of B. This is the part meronym relation in WordNet.',
    examples: 'gearshift → car'
}, {
    uri: '/r/HasA',
    description: 'B belongs to A, either as an inherent part or due to a social construct of possession. HasA is often the reverse of PartOf.',
    examples: 'bird → wing; pen → ink'
}, {
    uri: '/r/UsedFor',
    description: 'A is used for B; the purpose of A is B.',
    examples: 'bridge → cross water'
}, {
    uri: '/r/CapableOf',
    description: 'Something that A can typically do is B.',
    examples: 'knife → cut'
}, {
    uri: '/r/AtLocation',
    description: 'A is a typical location for B, or A is the inherent location of B. Some instances of this would be considered meronyms in WordNet.',
    examples: 'butter → refrigerator; Boston → Massachusetts'
}, {
    uri: '/r/Causes',
    description: 'A and B are events, and it is typical for A to cause B.',
    examples: 'exercise → sweat'
}, {
    uri: '/r/HasSubevent',
    description: 'A and B are events, and B happens as a subevent of A.',
    examples: 'eating → chewing'
}, {
    uri: '/r/HasFirstSubevent',
    description: 'A is an event that begins with subevent B.',
    examples: 'sleep → close eyes'
}, {
    uri: '/r/HasLastSubevent',
    description: 'A is an event that concludes with subevent B.',
    examples: 'cook → clean up kitchen'
}, {
    uri: '/r/HasPrerequisite',
    description: 'In order for A to happen, B needs to happen; B is a dependency of A.',
    examples: 'dream → sleep'
}, {
    uri: '/r/HasProperty',
    description: 'A has B as a property; A can be described as B.',
    examples: 'ice → cold'
}, {
    uri: '/r/MotivatedByGoal',
    description: 'Someone does A because they want result B; A is a step toward accomplishing the goal B.',
    examples: 'compete → win'
}, {
    uri: '/r/ObstructedBy',
    description: 'A is a goal that can be prevented by B; B is an obstacle in the way of A.',
    examples: 'sleep → noise'
}, {
    uri: '/r/Desires',
    description: 'A is a conscious entity that typically wants B. Many assertions of this type use the appropriate language\'s word for "person" as A.',
    examples: 'person → love'
}, {
    uri: '/r/CreatedBy',
    description: 'B is a process or agent that creates A.',
    examples: 'cake → bake'
}, {
    uri: '/r/Synonym',
    description: 'A and B have very similar meanings. They may be translations of each other in different languages. This is the synonym relation in WordNet as well. Symmetric.',
    examples: 'sunlight ↔ sunshine'
}, {
    uri: '/r/Antonym',
    description: 'A and B are opposites in some relevant way, such as being opposite ends of a scale, or fundamentally similar things with a key difference between them. Counterintuitively, two concepts must be quite similar before people consider them antonyms. This is the antonym relation in WordNet as well. Symmetric.',
    examples: 'black ↔ white; hot ↔ cold'
}, {
    uri: '/r/DistinctFrom',
    description: 'A and B are distinct member of a set; something that is A is not B. Symmetric.',
    examples: 'red ↔ blue; August ↔ September'
}, {
    uri: '/r/DerivedFrom',
    description: 'A is a word or phrase that appears within B and contributes to B\'s meaning.',
    examples: 'pocketbook → book'
}, {
    uri: '/r/SymbolOf',
    description: 'A symbolically represents B.',
    examples: 'red → fervor'
}, {
    uri: '/r/DefinedAs',
    description: 'A and B overlap considerably in meaning, and B is a more explanatory version of A.',
    examples: 'peace → absence of war'
}, {
    uri: '/r/MannerOf',
    description: 'A is a specific way to do B. Similar to "IsA", but for verbs.',
    examples: 'auction → sale'
}, {
    uri: '/r/LocatedNear',
    description: 'A and B are typically found near each other. Symmetric.',
    examples: 'chair ↔ table'
}, {
    uri: '/r/HasContext',
    description: 'A is a word used in the context of B, which could be a topic area, technical field, or regional dialect.',
    examples: 'astern → ship; arvo → Australia'
}, {
    uri: '/r/SimilarTo',
    description: 'A is similar to B. Symmetric.',
    examples: 'mixer ↔ food processor'
}, {
    uri: '/r/EtymologicallyRelatedTo',
    description: 'A and B have a common origin. Symmetric.',
    examples: 'folkmusiikki ↔ folk music'
}, {
    uri: '/r/EtymologicallyDerivedFrom',
    description: 'A is derived from B.',
    examples: 'dejta → date'
}, {
    uri: '/r/CausesDesire',
    description: 'A makes someone want B.',
    examples: 'having no food → go to a store'
}, {
    uri: '/r/MadeOf',
    description: 'A is made of B.',
    examples: 'bottle → plastic'
}, {
    uri: '/r/ReceivesAction',
    description: 'B can be done to A.',
    examples: 'button → push'
}, {
    uri: '/r/ExternalURL',
    description: 'Instead of relating to ConceptNet nodes, this pseudo-relation points to a URL outside of ConceptNet, where further Linked Data about this term can be found. Similar to RDF\'s seeAlso relation.',
    examples: 'knowledge → http://dbpedia.org/page/Knowledge'
}]

const initialize = []
const complex = []
const objects = {}
// const rangeYes = []
// const rangeNo = []

for (let item of context.definitions) {
    if ('domain' in item) {
        complex.push(item)
    } else {
        initialize.push(item)
    }
}

for (let object in context['@context']) {
    if (typeof context['@context'][object] !== 'string') {
        if (context['@context'][object]['@id'].startsWith('cn') || context['@context'][object]['@id'].startsWith('dc')) {
            if (context['@context'][object]['@container']) {
                if(context['@context'][object]['@type'] === '@id') {
                    console.log('------------ 1 ------------',context['@context'][object],  object)
                    objects[object] = [{
                        '@type': context['@context'][object]['@id'].replace('cn:', '')
                    }]
                } else {
                    if(context['@context'][object]['@type'].startsWith('cn:')) {
                        const type = context['@context'][object]['@type'].replace('cn:', '')
                        objects[object] = [{
                            '@type': type
                        }]
                    } else {
                        debugger
                    }
                }
            } else {
                const definition = complex.find(item => item['@id'] === `#${object}`)

                if (definition) {
                    const type = definition.range.replace('#', '')

                    if (type.trim() === 'xsd:string') {
                        objects[object] = ''
                    } else if (type.trim() === 'xsd:boolean') {
                        objects[object] = false
                    } else if (type.trim() === 'xsd:float') {
                        objects[object] = 0
                    } else if( type.startsWith('https')) {
                        objects[object] = ''
                    } else if(type.trim() === 'rdfs:Resource') {
                        objects[object] = ''
                    } else {
                        objects[object] = {
                            '@type': type
                        }
                    }
                } else {
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                }
            }
        }
    }
}

console.log('00000000000000000000000000000', {
    objects: objects
})

// for(let object in objects) {
//     for (let item of complex) {
//         if (Array.isArray(item.domain)) {
//             const id = item['@id'].replace('#', '')
//             if(object === id) {
//                 for (let domain of item.domain) {
//
//                     console.log('------------------------', domain)
//                     // if (domain['@id'] === object['@id']) {
//                     //     const name = item['@id'].replace('#', '')
//                     //
//                     //     if(!objects[name]['@container']) {
//                     //         console.log('-------------- 1 ----------------', {
//                     //             name: name,
//                     //             object_1: objects[name],
//                     //             item: item,
//                     //             object_2: object
//                     //         })
//                     //     }
//                     // }
//                 }
//                 // console.log('------------------------',object, id, item)
//             }
//         } else {
//             // if (item.domain['@id'] === object['@id']) {
//             //     const name = item['@id'].replace('#', '')
//             //     object[name] = {}
//             //
//             //     if(objects[name]) {
//             //         if(!objects[name]['@container']) {
//             //             console.log('-------------- 2 ----------------', {
//             //                 name: name,
//             //                 object_1: objects[name],
//             //                 item: item,
//             //                 object_2: object
//             //             })
//             //         }
//             //     } else {
//             //         let objectName = null
//             //         for(let key in objects) {
//             //             if(objects[key]['@id'] === name) {
//             //                 objectName = objects[key]
//             //             }
//             //         }
//             //         console.log('-------------- 333333333333333 ----------------', {
//             //             name: name,
//             //             object: objectName,
//             //             item: item
//             //         })
//             //     }
//             // }
//         }
//     }
// }

// for (let object of initialize) {
//     for (let item of complex) {
//         if (Array.isArray(item.domain)) {
//             for (let domain of item.domain) {
//                 if (domain['@id'] === object['@id']) {
//                     const name = item['@id'].replace('#', '')
//
//                     if(!objects[name]['@container']) {
//                         console.log('-------------- 1 ----------------', {
//                             name: name,
//                             object_1: objects[name],
//                             item: item,
//                             object_2: object
//                         })
//                     }
//
//                     // object[name] = {}
//                 }
//             }
//         } else {
//             if (item.domain['@id'] === object['@id']) {
//                 const name = item['@id'].replace('#', '')
//                 object[name] = {}
//
//                 if(objects[name]) {
//                     if(!objects[name]['@container']) {
//                         console.log('-------------- 2 ----------------', {
//                             name: name,
//                             object_1: objects[name],
//                             item: item,
//                             object_2: object
//                         })
//                     }
//                 } else {
//                     let objectName = null
//                     for(let key in objects) {
//                      if(objects[key]['@id'] === name) {
//                          objectName = objects[key]
//                      }
//                     }
//                     console.log('-------------- 333333333333333 ----------------', {
//                         name: name,
//                         object: objectName,
//                         item: item
//                     })
//                 }
//             }
//         }
//         switch (typeof item.domain) {
//             case 'string':
//         console.log('------- domain -------', object['@id'], item.domain)
//         let objectDomain = initialize.find(object => object['@id'] === item.domain)
//         item.domain = objectDomain
//         break
//         case "object":
//             for(let key in item.domain) {
//                 console.log('------- domain -------', object['@id'], item.domain)
//             console.log('------- domain 2 -------', item.domain[key])
//             let objectDomain = initialize.find(object => object['@id'] === item.domain[key])
//             delete item.domain[key]
//             item.domain[key] = objectDomain
//         }
//         break
//         default:
//             debugger
//             break
//         }
//     }
// }

// for (let item of complex) {
//     switch (typeof item.domain) {
//         case 'string':
//             let objectDomain = initialize.find(object => object['@id'] === item.domain)
//             item.domain = objectDomain
//             break
//         case "object":
//             for (let key in item.domain) {
//                 let objectDomain = initialize.find(object => object['@id'] === item.domain[key])
//                 delete item.domain[key]
//                 item.domain[key] = objectDomain
//             }
//             break
//         default:
//             debugger
//             break
//     }
// }

// console.log('------------------- CONTEXT -------------------',context['@context'],  objects)
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
    Relation: Relation,
    objects: objects,
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