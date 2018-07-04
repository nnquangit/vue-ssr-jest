import Vue from 'vue'
import Router from 'vue-router'
// Plugins
import './components'
import './plugins/bootstrap'
import './assets/app.css'
// Service
import {createStore} from './store'
import {createRouter} from './router'
import {createStoreStorage} from './services/storestorage'
import {createApi} from './services/api'
// Master page
import Master from './pages/Master.vue'

Vue.use(Router)

export function createApp(ssrContext) {
    const api = createApi()
    const router = createRouter()
    const store = createStore(createStoreStorage(ssrContext))

    store.attachServices({api, router})
    // api.interceptors.request.use((config) => {
    //     if (store.getters.isLoggedIn) {
    //         let {token} = store.getters.currentUser()
    //         config.headers.common['Authorization'] = token
    //     }
    //     return config
    // }, (error) => Promise.reject(error))

    const app = new Vue({router, ssrContext, api, render: h => h(Master)})

    return {app, router, store, api}
}
