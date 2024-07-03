export const ferSelect = function(component, data) {
    return new Promise((resolve, reject) => {
        switch (data.method) {
            case 'set.item':
                console.log('################ data ########################', data)
                component.self.options = data.message.items
                break
            default:
                console.warn('Событие не обрабатывается', event)
                break
        }

        resolve(true)
    })
}