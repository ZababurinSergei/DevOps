export const actions = (self) => {
    return new Promise(async (resolve, reject) => {

        resolve({
            click: async (event) => {
                const fieldSet = event.target.closest('fieldset')
                if(event.target.tagName === 'LABEL') {
                    switch (fieldSet.dataset.field) {
                        case "holdchart":
                            document.dispatchEvent(new CustomEvent(`holdchart`, {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    value: event.target.textContent.toLowerCase()
                                }
                            }));
                            break
                        case "goniometer":
                            document.dispatchEvent(new CustomEvent(`goniometer`, {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    value: event.target.id
                                }
                            }));
                            break
                        case "settingsDelay":
                            document.dispatchEvent(new CustomEvent(`settingsDelay`, {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    value: event.target.textContent.toLowerCase()
                                }
                            }));
                            break
                        case "settingsInput":
                            document.dispatchEvent(new CustomEvent(`settingsInput`, {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    value: event.target.id
                                }
                            }));
                            break
                        case "LCR":
                            document.dispatchEvent(new CustomEvent(`channels`, {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    value: event.target.id
                                }
                            }));
                            break
                        default:
                            console.warn('не обрабатывается data-field', fieldSet.dataset.field)
                            break

                    }
                }
            }
        });
    });
};

export default {
    description: 'action'
};