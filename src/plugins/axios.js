import Vue from 'vue'
import axios from 'axios'

export const client = axios.create({
  // baseURL: '/',
  // withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})


Vue.use({
  install(Vue) {
    Vue.prototype.$client = client
  }
})
