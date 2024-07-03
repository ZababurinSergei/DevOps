import { isEmpty } from '../../isEmpty/index.mjs'
import { store } from '../../store/index.mjs'
import { env } from '/env.mjs'
import {request} from "../../fetch/index.mjs";
export async function getTokenPair(code) {
    try {
        const token = await request.post('/metamart-subscription-service/api/v1/auth/token', {
            "reqType": 0,
            "data": code
        });

        if(token.hasOwnProperty('message')) {
            token
        }
        return token;
    } catch (e) {
        console.error('не был получен токкен')
    }
}

export async function getRefreshToken(refreshToken) {
    try {
        const token = await request.post('/metamart-subscription-service/api/v1/auth/token', {
            "reqType": 1,
            "data": refreshToken
        }, true);
        return token;
    } catch (e) {
        window.location.href = window.location.orirgin;
        console.error('не был получен токкен', e)
    }
}

export const signIn = () => {
    let egiszUrl = env().WEB_APP_LOGIN
    window.location.href = egiszUrl;
};

export const logOut = async () => {
    let user = store.get('authorization')

    console.log('=========== user.token.access =================', user.token.access)
    const logout = await request.get('/metamart-subscription-service/api/v1/auth/logout', {
        "Authorization": `Bearer ${user.token.access}`
    }, true);


    if(logout) {
        const welcomeSections = document.querySelectorAll('welcome-section')
        const mssFilter = document.body.querySelector('mss-filter')
        if(!isEmpty(mssFilter.shadowRoot)) {
            mssFilter?.cleanState('all')
        }
        window.localStorage.clear();
        if(!isEmpty(welcomeSections)) {
            welcomeSections.forEach(item => {
                if(!isEmpty(item.shadowRoot)) {
                    item?.cleanState('all')
                }
            })
        }
        window.location.href = '/';
        return
    } else {
        window.location.href = '/';
    }
}

export const resetTokens = () => {
    store.set('accessToken', '')
    store.set('refreshToken', '')
};

export const useAuth = () => {
    const interval = setInterval(() => {
        let user = store.get('authorization')
        if(user) {
            const date = (Date.now() - user.expires)
            const isRefresh = date >= 0
            if(!isEmpty(user.token.refresh) && isRefresh) {
                getRefreshToken(user.token.refresh)
                    .then(( data ) => {
                        user.token = data
                        user.expires = Date.now() + data.expiresIn * 999
                        console.log('refresh token: ', user)
                        store.set('authorization', user)
                    })
                    .catch(error => { });
            }
        }
    }, 30000)
}
