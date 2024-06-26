import { fetchAudioFileToF32Array, Line, OSC, template } from '../this/index.mjs';
import {getConstant} from '../../../this/index.mjs';
const {
    FRAME_SIZE,
    KERNEL_LENGTH,
    QUEUE_SIZE,
    RENDER_QUANTUM,
    WORKGROUP_SIZE
} = getConstant();

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        const line = await Line(self)
        const settings = self.shadowRoot.querySelectorAll('.settings')
        const framesArray = self.shadowRoot.querySelector('.array')

        let count  = 0
        resolve({
            bus: {
                frame: (event) => {
                    if(event.detail.type === 'frame') {
                        const item = framesArray?.querySelector(`.item-${count}`)
                        // let isReset =
                        // console.log('sssssssssssssss',count,item)
                        if(!item) {
                           framesArray?.querySelector(`.item-${count - 1}`)?.classList?.remove('active')
                           count = 0
                        } else {
                            framesArray?.querySelector(`.item-${count -1}`)?.classList?.remove('active')
                            framesArray?.querySelector(`.item-${count}`)?.classList?.add('active')
                            ++count
                        }
                    }

                    if(event.detail.type === 'frame-stop') {
                        // framesArray?.querySelector(`.item-${count - 1}`)?.classList?.remove('active')
                        // framesArray?.querySelector(`.item-${count}`)?.classList?.remove('active')
                        count = 0
                    }
                }
            },
            sample: {
              click: async (event) => {
                  event.preventDefault()

                  let audioContext = new AudioContext();
                  const data = await fetchAudioFileToF32Array(audioContext, '/services/webgpu/src/component/nk-radio/modules/radio/sounds/loops/break29.wav')
                  settings.forEach(item => {
                      switch (item.id) {
                          case 'ARRAY_LENGTH':
                              item.querySelector('span').textContent = data[0].length
                              break
                          default:
                              // console.log(data[0].length)
                              // console.error('Константа не определенна')
                              break

                      }
                  })
                  const button = self.shadowRoot.querySelector('.start-sample')
                  const array = self.shadowRoot.querySelector('.array-sample')

                  button.classList.toggle('active')

                  if(button.classList.contains('active')) {
                      button.textContent = 'Stop sample'
                      array.innerHTML = ''
                      for(let i = 0; i < data[0].length; ++i) {
                          if(i > 990 && i < 1000) {
                              array.insertAdjacentHTML('beforeend', `<div class="item sample_${i}"><span>${data[0][i]}</span></div>`)
                          }
                      }
                  } else {
                      button.textContent = 'Start sample'
                      array.innerHTML = ''
                      // console.clear();
                  }
              }
            },
            click: async (event) => {
                event.currentTarget.classList.toggle('active')
                if(event.currentTarget.classList.contains('active')) {
                    event.currentTarget.textContent = 'Стоп'
                    line.start(self)
                } else {
                    event.currentTarget.textContent = 'Старт'
                    line.stop(self)
                    // console.clear();
                }
            }
        });
    });
};

export default {
    description: 'action'
};