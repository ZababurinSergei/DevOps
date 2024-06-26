export default async (self, actions) => {
    const displaySample = self.shadowRoot.querySelector('.display.sample')

    // const startSample = self.shadowRoot.querySelector('.start-sample')
    // const containerFrame = self.shadowRoot.querySelector('.frames')
    // const array = containerFrame.querySelector('.array')
    // const nkTimeLine = self.shadowRoot.querySelector('nk-time-line')
    // const frameArray = 100
    // const active = -1
    //
    // for(let i =0; i < frameArray;++i) {
    //     array.insertAdjacentHTML('beforeend', `<div class="frame item-${i} ${active === i ? 'active': ''}"><span class="value">🟧</span></div>`)
    // }



    console.log('EMULATOR')
    return {
        init: () => {
            // startSample.addEventListener('click', actions.sample.click)
        },
        terminate: () => {
            // startSample.removeEventListener('click', actions.sample.click)
        }
    }
}