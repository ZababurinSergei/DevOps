import { useAuth, signIn, logOut } from '../this/index.mjs'
export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            click: signIn,
            login: signIn,
            logout: logOut
        })
    })
}

export default {
    description: 'action'
}