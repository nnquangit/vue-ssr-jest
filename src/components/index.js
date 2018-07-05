import Vue from 'vue'
import AppNoSSR from './Layout/NoSSR'
import AppLoader from './Layout/Loader.vue'
import AppNavbar from './Layout/Navbar.vue'
import UserInfo from './UserInfo.vue'

Vue.use({
    install(Vue) {
        Vue.component('app-navbar', AppNavbar)
        Vue.component('app-loader', AppLoader)
        Vue.component('app-nossr', AppNoSSR)
        Vue.component('app-user-info', UserInfo)
    }
})
