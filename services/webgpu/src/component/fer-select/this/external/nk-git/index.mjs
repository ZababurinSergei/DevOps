export const nkGit = function(self, data) {
    return new Promise((resolve, reject) => {
        const action = data.value.length === 0 ? 'add': 'remove'
        self.html.control.button.run.classList[action]('disabled')

        const temp = data.value.split('/')

        self.config = {
            gitDir: `${self.config.root}/${data.value}`,
            gitUrl: `https://${data.value}`,
            gitUser: `${self.config.root}/${temp[0]}/${temp[1]}`,
            service: temp[2],
            user: temp[1]
        }

        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            registrations[0].active.postMessage({
                type:'service',
                message: `${self.config.gitUser}/${self.config.service}`
            })
            resolve(true)
        });
    })
}