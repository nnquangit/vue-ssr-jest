import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import auth from './auth'

Vue.use(Vuex)

const restoreState = (store) => {
  if (process.browser) {
    if (store) {
      if (window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__)
        delete window.__INITIAL_STATE__
      }
    }
  }
}

const persistedState = createPersistedState({
  key: '__demoapp',
  paths: ['auth'],
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, {expires: 3}),
    removeItem: key => Cookies.remove(key)
  }
})

export function createStore() {
  return new Vuex.Store({
    modules: {auth},
    plugins: [restoreState, persistedState]
  })
}
