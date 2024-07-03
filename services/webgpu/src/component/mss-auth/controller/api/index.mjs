import {request, store, useAuth, jwtDecode} from '../../this/index.mjs'
let loadingStart = Symbol.for("start_loading");
let loadingEnd = Symbol.for("end_loading");

const ferDialog = document.querySelector('fer-dialog')

const errorDialog = (message) => {
    ferDialog.open = {
        type: 'error',
        title: 'Ошибка',
        description: [{
            text: message
        }],
        button: [{
            type: 'cancel',
            description: 'Закрыть'
        }]
    };
};

let api = Symbol.for("api");
function save(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

export default async (self, actions) => {
    const params = new URLSearchParams(document.location.search);
    const code = params.get('code');
    console.log('CODE:', code)

    if(code !== null) {
        try {
            let start = performance.now();
            let end = 0
            let authorization = {}

            window[loadingEnd] = performance.now();
            console.log(`🥎 Before call auth ${((window[loadingEnd] - window[loadingStart]) / 1000)} seconds.`);

            try {
                const token = await request.post('/metamart-subscription-service/api/v1/auth/token', {
                    "reqType": 0,
                    "data": code
                });


                authorization.token = token

                store.set('authorization',authorization)

                const jwt = jwtDecode(token.access)

                if(jwt.hasOwnProperty('realm_access') || jwt.hasOwnProperty('resource_access')) {
                    console.log('jwt: ', jwt)

                    const userinfo = await request.get(`/metamart-subscription-service/api/v1/auth/userinfo`, {
                        Authorization: `Bearer ${token.access}`
                    });

                    authorization.userinfo = userinfo

                    //todo в проекте у пользователя на данный оммент может быть только одна роль
                    let rights = ''
                    let roles = ''

                    let isRealmAccess = jwt.hasOwnProperty('realm_access')
                    let isResourceAccess = jwt.hasOwnProperty('resource_access')

                    if(isRealmAccess && !isResourceAccess) {
                        roles = jwt.realm_access.roles[0]
                    }

                    if(!isRealmAccess && isResourceAccess) {
                        for(let key in jwt.resource_access) {
                            roles = jwt.resource_access[key].roles[0]
                            break
                        }
                    }

                    if(isRealmAccess && isResourceAccess) {
                        roles = jwt.realm_access.roles[0]
                    }

                    rights = await request.get(`/metamart-subscription-service/api/v1/user/role/rights?roleCode=${roles}`, {
                        Authorization: `Bearer ${token.access}`
                    });

                    console.log('---- rights ----', rights)
                    if(rights?.code == 404 || rights?.code == 403 || rights?.permissions?.length === 0) {
                        errorDialog(`У вас нет прав доступа.<br> Обратитесь в поддержку <br>для предоставления доступа`)
                        return  false
                    } else {
                        authorization.expires = Date.now() + token.expiresIn * 999
                        authorization.rights = rights

                        end =  performance.now();

                        console.log(`🥎 Call auth ${((end - start) / 1000)} seconds.`);
                        store.set('authorization',authorization)

                        // save('authtorization.json', JSON.stringify(authorization), null, 4)
                        self.open = false

                        document.dispatchEvent(new CustomEvent('authContentLoaded', {
                            bubbles: true,
                            composed: true,
                            detail: { }
                        }));

                        useAuth()
                        console.log('USER: ', authorization)
                    }
                } else {
                    console.log('#################### 2 ######################')
                    errorDialog(`У вас нет прав доступа.<br> Обратитесь в поддержку <br>для предоставления доступа`)
                    return false
                }
            } catch (e) {
                errorDialog(`${e.message.description}`)
            }
        } catch (e) {
            console.error('error -------------------------: ', e)
            errorDialog(`${e.message.description}`)
            return  false
        }
    } else {
        let user = store.get('authorization')

        if(user) {
            try {
                let start = performance.now();
                let end = 0
                window[loadingEnd] = performance.now();
                console.log(`🥎 Before call auth: ${((window[loadingEnd] - window[loadingStart]) / 1000 )} seconds.`);

                const isExpires = user.expires - Date.now() > 0
                const token = await request.post('/metamart-subscription-service/api/v1/auth/token', {
                    "reqType": 1,
                    "data": user.token.refresh
                }, true)

                if(token.code !== 500) {
                    user.token = token
                    user.expires = Date.now() + token.expiresIn * 999

                    end =  performance.now();
                    console.log(`🥎 Call auth: ${((end - start)/1000)} seconds.`);

                    store.set('authorization', user)

                    self.open = false

                    document.dispatchEvent(new CustomEvent('authContentLoaded', {
                        bubbles: true,
                        composed: true,
                        detail: { }
                    }));

                    useAuth()
                    console.log('USER: ', user)
                } else {
                    self.open = true
                    store.remove('authorization')
                }
            } catch (e) {
                self.open = true
                store.remove('authorization')
            }
        } else {
            self.open = true
            window[loadingEnd] = performance.now();
            console.log(`🥎 Before call auth ${((window[loadingEnd] - window[loadingStart]) / 1000)} seconds.`);
            store.remove('authorization')
        }
        // }
    }
    return {
        login: () => {
            actions.login()
        },
        logout: () => {
            actions.logout()
        }
    }
}