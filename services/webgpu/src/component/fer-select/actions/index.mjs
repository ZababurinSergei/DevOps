import {nkGit} from '../this/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        let dropdownItems = undefined
        const dropdownBtn = self.shadowRoot.querySelector('[class*="button"]');
        const dropdownList = self.shadowRoot.querySelector('.list');
        try {
            dropdownItems = dropdownList.querySelectorAll('.list-item');
        } catch (e) {
            console.log('self', self)
        }
        const arrow = self.shadowRoot.querySelector('.button_arrow');
        const ferSelect = self.shadowRoot.querySelector('.list')
        const ferSelectArrow = self.shadowRoot.querySelector('.button_arrow')

        resolve({
            broadcastChannel: async (event) => {
                self.external
            },
            messageerror: async (event) => {
                console.log('ddddddddddddddddddddddddddddd BROADCAST messageerror ddddddddddddddddddddddddddddd', event)
            },
            button: {
                under: (event) => {
                    const withinBoundaries = event.composedPath().includes(self);
                    if (!withinBoundaries) {
                        ferSelectArrow.classList.remove('arrow_active')
                        ferSelect.classList.remove('list_visible')
                    }
                },
            },
            keydown: (event) => {
                if (event.key === 'Tab' || event.key === 'Escape') {
                    arrow.classList.remove('arrow_active');
                    dropdownBtn.classList.remove('button_active');
                    dropdownList.classList.remove('list_visible');
                }
            },
            click: (event) => {
                if (event.target !== dropdownBtn) {
                    // arrow.classList.remove('arrow_active');
                    // dropdownBtn.classList.remove('button_active');
                    // dropdownList.classList.remove('list_visible');
                }
            },
            ferSelect: (event) => {
                if (event.detail.field !== self.dataset.field) {
                    arrow.classList.remove('arrow_active');
                    dropdownBtn.classList.remove('button_active');
                    dropdownList.classList.remove('list_visible');
                }
            },
            clickDropdownBtn: (event) => {
                const rootElement = event.currentTarget.getRootNode().host

                document.dispatchEvent(new CustomEvent(`fer-select`, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        action: 'disabled',
                        id: rootElement.id,
                        field: self.dataset.field
                    }
                }));

                const buttonActive = self.shadowRoot.querySelector('[class*="button"]')
                dropdownList.classList.toggle('list_visible');
                buttonActive.classList.toggle('button_active');
                arrow.classList.toggle('arrow_active');
            },
            clickDropdownItems: async (event) => {
                const items = self.html?.list.querySelectorAll('[class*="list-item"]')
                items.forEach(function (el) {
                    arrow.classList.remove('arrow_active');
                    el.classList.remove('list-item_active');
                })

                for(let key in event.target.dataset) {
                    self.dataset[key] = event.target.dataset[key]
                }

                self.html.list.classList.remove('list_visible');
                self.html.button.classList.toggle('button_active');

                event.target.classList.add('list-item_active');
                arrow.classList.remove('arrow_active');

                if(self.id === 'fer-select_0') {
                    self.task = {
                        id: 'nk-git_0',
                        component: 'nk-git',
                        type: 'self',
                        action: 'button',
                        value: self.dataset.value,
                        callback: nkGit,
                        message: {
                            id: '',
                            type: 'active.button.run',
                            phase: 'start'
                        }
                    }
                }

                if(self.id === 'fer-select_3') {
                    self.config = {
                        branch: self.dataset.value
                    }
                }

                self.html.button.textContent = self.dataset.value
            }
        })
    })
}

export default {
    description: 'action'
}