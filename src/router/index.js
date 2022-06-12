import Vue from 'vue'
import VueRouter from 'vue-router'
import BookIndex from '@/pages/BookIndex'
import BookSearch from '@/pages/BookSearch'
import BookEdit from '@/pages/BookEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: BookIndex
  },
  {
    path: '/search',
    name: 'search',
    component: BookSearch
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: BookEdit
  },
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
