export default async (self, actions) => {
    const containerFrame = self.shadowRoot.querySelector('.frames')
    const array = containerFrame.querySelector('.array')
    const frameArray = 100
    const active = -1

    for(let i =0; i < frameArray;++i) {
        array.insertAdjacentHTML('beforeend', `<div class="frame item-${i} ${active === i ? 'active': ''}"><span class="value">🟧</span></div>`)
    }

    return {
        init: () => {
            document.addEventListener('next-frame', actions.bus.frame)
        },
        terminate: () => {
            document.removeEventListener('next-frame', actions.bus.frame)
        }
    }
}