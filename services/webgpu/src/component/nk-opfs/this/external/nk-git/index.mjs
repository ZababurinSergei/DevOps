export const nkGit =function(self, payload) {
    return new Promise(async (resolve, reject) => {
        if(payload.data.phase === 'end') {
            self.html.progress.label.textContent = 'Данные готовы к использованию'
            self.html.progress.indeterminate.classList.remove('visible')
            self.html.control.button.run.classList.remove('disabled')
        }

        const dirs = await this.readdir(`${this.config.root}/${this.config.git}`);

        let result = []
        for(let user of dirs) {
            const temp = await this.readdir(`${this.config.root}/${this.config.git}/${user}`);
            temp.forEach(item => {
                result.push(`${this.config.git}/${user}/${item}`)
            })
        }

        this.task = {
            component: 'fer-select',
            type: 'main',
            action: 'default',
            value: '',
            method: 'set.item',
            message: {
                phase: 'start',
                items: result
            }
        };

        const dir = this.config.gitDir

        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            registrations.forEach(service => {
                service.active.postMessage({
                    type:'service',
                    message: dir
                })
            })
        }).catch(e => console.error(e))

        resolve(true)
    })
}