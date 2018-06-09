import axios from 'axios'

export function createApi() {
    return axios.create({
        // baseURL: '/',
        // withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    })
}
