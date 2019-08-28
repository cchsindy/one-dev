import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: () => import('./views/Announcements.vue')
    },
    {
      path: '/blackbaud',
      name: 'blackbaud',
      component: () => import('./views/Blackbaud.vue')
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: () => import('./views/Canvas.vue')
    },
    {
      path: '/sync',
      name: 'sync',
      component: () => import('./views/Sync.vue')
    },
    {
      path: '/volunteer',
      name: 'volunteer',
      component: () => import('./views/Volunteer.vue')
    }
  ]
})
