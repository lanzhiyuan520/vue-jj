import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'

Vue.use(Router)

const routes = [
  {
    path : '/',
    name : 'index',
    component : () => import('@/pages/index'),
    redirect : '/all'
  },
  {
    path : '/all',
    name : 'all',
    component : () => import('@/pages/all')
  },
  {
    path : '/frontend',
    name : 'frontend',
    component : () => import('@/pages/all')
  },
  {
    path : '/backend',
    name : 'backend',
    component : () => import('@/pages/all')
  },
  {
    path : '/other',
    name : 'other',
    component : () => import('@/pages/all')
  },
  {
    path : '/articleDetail',
    name : 'articleDetail',
    component : () => import('@/pages/articleDetail'),
    meta : {
      showRight : false
    }
  },
  {
    path : '/writeArticle',
    name : 'writeArticle',
    component : () => import('@/pages/writeArticle'),
  }
]

const router = new Router({
  // mode : 'history',
  routes
})

router.beforeEach((to,from,next) => {
  if (to.path === '/articleDetail') {
    store.commit('changRight',{ flag : false })
  } else {
    store.commit('changRight',{ flag : true })
  }
  next()
})

export default router
