import axios from 'axios'

export function createAxios(cookies) {
  return axios.create({
    // baseURL: '/',
    // withCredentials: true,
    headers: {'Content-Type': 'application/json'}
  })
}