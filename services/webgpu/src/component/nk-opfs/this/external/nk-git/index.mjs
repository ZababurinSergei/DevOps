export const nkGit = function(self, payload) {
    return new Promise((resolve, reject) => {
        if(payload.data.phase === 'end') {
            self.html.progress.label.textContent = 'Данные готовы к использованию'
            self.html.progress.indeterminate.classList.remove('visible')
            self.html.control.button.run.classList.remove('disabled')
        }

        resolve(true)
    })
}