export default async (self, actions) => {
    return {
        init: async () => {
            document.addEventListener('next-frame', actions.bus.frame)
            document.addEventListener('stop-frame', actions.bus.frame)
        },
        terminate: async () => {
            document.removeEventListener('next-frame', actions.bus.frame)
            document.removeEventListener('stop-frame', actions.bus.frame)
        }
    }
}