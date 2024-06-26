export default async (self, actions) => {

    return {
        init: () => {
            document.addEventListener('next-frame', actions.bus.frame)
        },
        terminate: () => {
            document.removeEventListener('next-frame', actions.bus.frame)
        }
    }
}