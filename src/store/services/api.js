import axios from 'axios'
import {getStore} from 'exstore'

export function createApi() {
    const api = axios.create({
        // baseURL: '/',
        // withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    })

    api.interceptors.request.use((config) => {
        let {getters} = getStore()
        if (getters.isLoggedIn && getters.isLoggedIn()) {
            let {token} = getters.currentUser()
            config.headers.common['Authorization'] = token
        }
        return config
    }, (error) => Promise.reject(error))

    return api
}
