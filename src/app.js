import Vue from 'vue'
import Master from './pages/Master.vue'
import {sync} from 'vuex-router-sync'
import {createStore} from './store'
import {createRouter} from './router'
//Plugins
import './components'
import './plugins/bootstrap'
import './assets/app.css'

export function createApp(ssrContext) {
  const store = createStore()
  const router = createRouter()

  sync(store, router)
  const app = new Vue({router, store, ssrContext, render: h => h(Master)})

  return {app, router, store}
}
