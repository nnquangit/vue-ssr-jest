import Vue from 'vue'
import NoSSR from 'vue-no-ssr';
import AppNavbar from './Layout/Navbar.vue'
import ModalLogin from './Layout/Modal/Login.vue'

Vue.use({
  install(Vue) {
    Vue.component('app-navbar', AppNavbar)
    Vue.component('app-modal-login', ModalLogin)
    Vue.component('no-ssr', NoSSR)
  }
})
