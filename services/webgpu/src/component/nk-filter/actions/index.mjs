import { store } from '../../../this/index.mjs'
import { Line } from '../this/index.mjs';

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        const line = await Line(self)
        const settings = self.shadowRoot.querySelectorAll('.settings')
        const framesArray = self.shadowRoot.querySelector('.array')
        let count  = 0
        await line.init(self)

        resolve({
            click: async (event) => {
                event.currentTarget.classList.toggle('active')
                if(event.currentTarget.classList.contains('active')) {
                    event.currentTarget.textContent = 'Стоп'
                    // line.start(self)
                } else {
                    event.currentTarget.textContent = 'Старт'
                    // line.stop(self)
                    // console.clear();
                }
            },
            bus: {
                frame: async (event) => {
                    if(event.detail.type === 'frame' && self.dataset.id === event.detail.id) {
                        await line.tick()
                        // console.log('-------------- TICK --------------')
                        // const item = framesArray?.querySelector(`.item-${count}`)
                        // let isReset =
                        // console.log('sssssssssssssss',count,item)
                        // if(!item) {
                        //     framesArray?.querySelector(`.item-${count - 1}`)?.classList?.remove('active')
                        //     count = 0
                        // } else {
                        //     framesArray?.querySelector(`.item-${count -1}`)?.classList?.remove('active')
                        //     framesArray?.querySelector(`.item-${count}`)?.classList?.add('active')
                        //     ++count
                        // }
                    }

                    if(event.detail.type === 'frame-stop' && self.dataset.id === event.detail.id) {
                        await line.end()
                        // framesArray?.querySelector(`.item-${count - 1}`)?.classList?.remove('active')
                        // framesArray?.querySelector(`.item-${count}`)?.classList?.remove('active')
                        // count = 0
                    }
                }
            }
        })
    })
}

export default {
    description: "actions for newkind-osc"
}