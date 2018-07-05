import Vue from 'vue'
import {connectVue, createStore as makeStore, getStore} from 'exstore'
import modules from './modules'

Vue.use(connectVue)

export function createStore() {
    return makeStore({modules})
}

if (module.hot) {
    module.hot.accept('./modules/index.js', function () {
        const oldstate = getStore().getStateCapture()
        const newmodule = require('./modules/index.js').default
        getStore().attachModules(newmodule)
        getStore().replaceState(oldstate)
    })
}
