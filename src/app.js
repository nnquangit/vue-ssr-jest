import Vue from 'vue'
import Router from 'vue-router'
import {sync} from 'vuex-router-sync'
// Plugins
import './components'
import './plugins/bootstrap'
import {connectVue, createStore as newStore} from './plugins/exstore'
import './assets/app.css'
// Service
import {createStore} from './store'
import {createRouter} from './router'
import {createStoreStorage} from './services/storestorage'
import {createApi} from './services/api'
// Master page
import Master from './pages/Master.vue'


const modules = {
    counter: {
        state: {current: 20},
        actions: {
            increase: ({state, commit}) => {
                console.log('increase')
                commit('COUNTER_INCREASE')
            },
            decrease: ({state, commit}) => commit('COUNTER_DECREASE')
        },
        mutations: {
            'COUNTER_INCREASE': (state) => state.current += 1,
            'COUNTER_DECREASE': (state) => state.current -= 1,
        },
        getters: {
            current: function(state) {
                return state.current
            } ,
        },
    }
};
newStore({modules})

Vue.use(Router)
Vue.use(connectVue)

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
