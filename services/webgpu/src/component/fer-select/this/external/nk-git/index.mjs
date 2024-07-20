export const nkGit = function(component, data) {
    return new Promise((resolve, reject) => {
        switch (data.action) {
            default:
                console.log('ACTION: ', data)
                const action = data.value.length === 0 ? 'add': 'remove'

                component.self.html.control.button.run.classList[action]('disabled')

                const temp = data.value.split('/')

                component.self.config = {
                    gitDir: `${component.self.config.root}/${data.value}`,
                    gitUrl: `https://${data.value}`,
                    gitUser: `${component.self.config.root}/${temp[0]}/${temp[1]}`,
                    service: temp[2],
                    user: temp[1]
                }

                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    registrations[0].active.postMessage({
                        type:'service',
                        message: `${component.self.config.gitUser}/${component.self.config.service}`
                    })
                    resolve(true)
                });
                break
        }
    })
}