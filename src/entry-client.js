import {createApp} from './app'
import asyncData from './router/middleware/asyncData'

const {app, store, router} = createApp()

router.onReady(() => {
    router.beforeResolve(asyncData({app, router, store}))
    app.$mount('#app')
})
