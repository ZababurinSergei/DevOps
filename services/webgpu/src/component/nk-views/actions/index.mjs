import { round } from '../../../this/index.mjs'
import { OSC, Line } from '../this/index.mjs';

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        const displaySample  = self.shadowRoot.querySelector('.display.sample')
        const osc = await OSC(self)
        const line = await Line(self)
        await line.init(self)
        await osc.init()

        let x = 64
        let y = 36
        let result = ''
        let grid = []
        for(let i = 0; i < y; ++i) {
            for(let j = 0; j < x; ++j) {
                result = `${result} x${j}-${i}`
            }

            result = result.trim()
            grid.push(JSON.stringify(result))
            result = ''
        }

        result = grid.join('\n')
        // console.log('dddddddddddd', result)

        let resultWaves = ''
        let count = 0
        resolve({
            bus: {
                frame: async (event) => {
                    if(event.detail.type === 'frame') {
                        // console.log('event.detail', event.detail.value)
                        const state = await osc.core()
                        const height = 36 / state.osc_out[0].line
                        let coord = 0
                        let coordSin = 0
                        let sinTwo = 0

                        if(height => 0) {
                            // const up = parseInt(17 *  state.osc_out[0].line, 10) + 17
                            // const sinUp = parseInt(17 *  state.osc_out[0].line_sin, 10) + 17
                            // sinTwo =  `x${count}-${parseInt(16 *  state.osc_out[0].sin_cos, 10) + 16}`
                            // coordSin = `x${count}-${sinUp}`
                            // coord = `x${count}-${up}`
                        } else {
                            const sinNext = parseInt((17 - 17 *  state.osc_out[0].line_sin, 10))
                            const next = parseInt((17 - 17 *  state.osc_out[0].line, 10))
                            coord = `x${count}-${next}`
                            coordSin = `x${count}-${sinNext}`
                            sinTwo =  `x${count}-${parseInt((16 - 16 *  state.osc_out[0].sin_cos, 10))}`
                        }

                        // resultWaves = `${resultWaves} ${round(state.osc_out[0].line)}`
                        // console.log('-------------- OUT OSC --------------', resultWaves)
                        // const output = await  line.tick(state.osc_out[0].sin_cos)
                        // const output = await  line.tick(round(state.osc_out[0].line))
                        const output = await  line.tick(event.detail.value)


                        displaySample.insertAdjacentHTML('afterbegin',` <div class="item red" style="grid-area: ${coord};"></div>`)
                        // displaySample.insertAdjacentHTML('afterbegin',` <div class="item blue" style="grid-area: ${sinTwo};"></div>`)
                        // displaySample.insertAdjacentHTML('afterbegin',` <div class="item green" style="grid-area: ${coordSin};"></div>`)

                        if(count >= 64) {
                            displaySample.innerHTML = ''
                            count = 0
                        } else {
                            ++count
                        }
                    }


                    if(event.detail.type === 'stop-frame') {
                        const console = self.shadowRoot.querySelector('.console')
                        for(let i = 0; i < console.children.length;++i) {
                            console.children[i].innerHTML = ''
                        }

                        count = 0
                        displaySample.innerHTML = ''
                    }
                }
            }
        })
    })
}

export default {
    description: "actions for newkind-osc"
}