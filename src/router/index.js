import Vue from 'vue'
import Router from 'vue-router'
// Public
import Home from '../pages/Home.vue'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
      {path: '/', component: Home}
    ]
  })

  return router
}
