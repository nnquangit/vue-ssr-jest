import Vue from 'vue'
import Master from './pages/Master.vue'
import {sync} from 'vuex-router-sync'
// Plugins
import './components'
import './plugins/bootstrap'
import './assets/app.css'
// Service
import {createStore} from './store'
import {createRouter} from './router'
import {createStoreStorage} from './services/storestorage'
import {createApi} from './services/api'

export function createApp(ssrContext) {
    const api = createApi()
    const router = createRouter()
    const store = createStore(createStoreStorage(ssrContext))

    // Attach service to store.state
    sync(store, router)
    store.replaceState({...store.state, api})
    api.interceptors.request.use((config) => {
        if (store.getters.isLoggedIn) {
            let {token} = store.getters.currentUser
            config.headers.common['Authorization'] = token
        }
        return config
    }, (error) => Promise.reject(error))

    const app = new Vue({router, store, ssrContext, api, render: h => h(Master)})

    return {app, router, store, api}
}
