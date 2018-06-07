import Vue from 'vue'
import Router from 'vue-router'
// Public
import Home from '../pages/Home.vue'
import Protected from '../pages/Protected.vue'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
      {path: '/', component: Home},
      {path: '/protected', component: Protected},
    ]
  })

  return router
}
