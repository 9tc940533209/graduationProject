import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/loginIn'
import home from '@/components/home/home'
import user from '@/components/user/user'
import task from '@/components/task/task'
import authentication from '@/components/authentication/authentication'
import news from '@/components/news/news'
import taskType from '@/components/taskType/taskType'


import client from '@/components/client/client'
import root from '@/components/root'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/root', 
      name: 'root',
      // redirect:"/root",
      component:root,
      children:[
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/user',
          name: 'user',
          component: user
        },
        {
          path: '/task',
          name: 'task',
          component: task
        },
        {
          path: '/authentication',
          name: 'authentication',
          component: authentication
        },
        {
          path: '/news',
          name: 'news',
          component: news
        },
        {
          path: '/taskType',
          name: 'taskType',
          component: taskType
        },
        {
          path: '/client',
          name: 'client',
          component: client
        },
      ]
    }
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  var Cookies = require('cookies-js')
  if (Cookies.get('COOKIE_USER_TICKET_DATACRM_')) {
    next()
  } else {
    if (to.path === '/login' || to.path === '/') {
      next()
    } else {
      alert('请先登录哦')
      next('/login')
    }
  }
})
export default router