import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import users from './users'

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

export function createStore(storage) {
    return new Vuex.Store({
        modules: {auth, users},
        plugins: [
            restoreState,
            createPersistedState({
                key: '__demoapp',
                paths: ['auth'],
                filter: () => true,
                storage: storage
            })
        ]
    })
}
