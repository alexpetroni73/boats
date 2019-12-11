import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
// import Boats from '../views/Boats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },

  {
    path: '/boats',
    name: 'boats',
    component: () => import('../views/Boats.vue')
    //component: Boats
  },

  {
    path: '/boat-editor/:id?',
    name: 'boat-editor',
    component: () => import('../views/BoatEditor.vue')
    //component: BoatEditor
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
