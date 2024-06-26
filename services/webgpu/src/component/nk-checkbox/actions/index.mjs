import {store} from '../../../this/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {

        resolve({
            click: (event) => {
                event.stopPropagation()
                const currentTarget = event.currentTarget

                document.dispatchEvent(new CustomEvent(`settingsCheckbox`, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        id: currentTarget.id.split('-')[1],
                        value: currentTarget.checked
                    }
                }));
            }
        })
    })
}

export default {
    description: 'action'
}