import {loadHTML} from '../index.mjs'

let components = new Map();

components.set('default', [{
    type: 'component',
    render: async (self, data) => {
        return `<div class="item color_${data}"><span>${data}</span></div>`
    }
}])
export default components