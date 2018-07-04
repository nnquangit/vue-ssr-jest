import Vue from 'vue'
import {connectVue, createStore as newStore} from '../plugins/exstore'
import auth from './auth'
import users from './users'

Vue.use(connectVue)

export function createStore(storage) {
    return newStore({
        modules: {
            auth,
            users,
            counter: {
                state: {current: 1},
                actions: {
                    increase: ({state, commit}) => commit('COUNTER_INCREASE'),
                    decrease: ({state, commit}) => commit('COUNTER_DECREASE')
                },
                mutations: {
                    'COUNTER_INCREASE': (state) => state.current += 1,
                    'COUNTER_DECREASE': (state) => state.current -= 1
                },
                getters: {
                    current: (state) => state.current
                }
            }
        }
    }).attachPlugins([
        (store) => {
            if (process.browser) {
                if (store) {
                    if (window.__INITIAL_STATE__) {
                        store.replaceState(window.__INITIAL_STATE__)
                        delete window.__INITIAL_STATE__
                    }
                }
            }
        }
    ])
}
