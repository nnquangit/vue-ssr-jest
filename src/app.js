import Vue from 'vue'
import App from './pages/Master.vue'
import {sync} from 'vuex-router-sync'

import {createStore} from './store'
import {createRouter} from './router'

export function createApp(ssrContext) {
  const store = createStore()
  const router = createRouter()

  sync(store, router)
  const app = new Vue({router, store, ssrContext, render: h => h(App)})

  return {app, router, store}
}
