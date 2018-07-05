import Vue from 'vue'
// Plugins
import './components'
import './plugins/bootstrap'
import './assets/app.css'
// Service
import {createStore} from './store'
import {createApi, createCookies} from './store/services'
import {persitAuthPlugin, ssrPlugin} from './store/plugins'
import {createRouter} from './router'
// Master page
import Master from './pages/Master.vue'

export function createApp(ssrContext) {
    const $api = createApi()
    const $router = createRouter()
    const $cookies = createCookies(ssrContext)

    const store = createStore()
        .attachServices({$api, $router, $cookies})
        .attachPlugins([ssrPlugin(), persitAuthPlugin()])

    const app = new Vue({store, router: $router, ssrContext, render: h => h(Master)})

    return {app, store, $api, $router}
}
