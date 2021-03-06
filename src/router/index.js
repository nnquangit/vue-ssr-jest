import Vue from 'vue'
import Router from 'vue-router'
// Public
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Protected from '../pages/Protected.vue'
import ServerRender from '../pages/ServerRender.vue'

Vue.use(Router)

export function createRouter() {
    const router = new Router({
        base: __dirname,
        mode: 'history',
        scrollBehavior: () => ({y: 0}),
        routes: [
            {path: '/', component: Home},
            {path: '/login', component: Login},
            {path: '/protected', component: Protected},
            {path: '/serverrender', component: ServerRender}
        ]
    })

    return router
}
