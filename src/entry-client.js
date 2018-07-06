import {initApp} from './app'

const {app, $router} = initApp()

$router.onReady(() => app.$mount('#app'))
