export default async (self, actions) => {
    const multiswitch = self.shadowRoot.querySelectorAll('.multiswitch')

    return {
        init: () => {
            multiswitch.forEach(item => {
                item.addEventListener('click', actions.click, {
                        bubbles: true,
                        composed: true,
                })
            })
        },
        terminate: () => {
            multiswitch.forEach(item => {
                item.removeEventListener('click', actions.click, {
                    bubbles: true,
                    composed: true,
                })
            })
        }
    }
}