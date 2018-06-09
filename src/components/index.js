import Vue from 'vue'
import AppNoSSR from './Layout/NoSSR'
import AppLoader from './Layout/Loader.vue'
import AppNavbar from './Layout/Navbar.vue'
import ModalLogin from './Layout/Modal/Login.vue'

Vue.use({
    install(Vue) {
        Vue.component('app-navbar', AppNavbar)
        Vue.component('app-modal-login', ModalLogin)
        Vue.component('app-loader', AppLoader)
        Vue.component('app-nossr', AppNoSSR)
    }
})
