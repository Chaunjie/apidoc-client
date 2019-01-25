import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: [
    {
      path: '',
      component: Layout,
      redirect: 'project',
      children: [
        {
          path: '/project/:id',
          name: 'projectList',
          component: () => import(/* webpackChunkName: "projectlist" */'./views/home/index.vue')
        },
        {
          path: '/tag/list',
          name: 'tagList',
          component: () => import(/* webpackChunkName: "taglist" */'./views/tag/index.vue'),
          meta: { title: '标签列表' }
        },
        {
          path: '/user/list',
          name: 'userList',
          component: () => import(/* webpackChunkName: "userlist" */'./views/user/list.vue')
        },
        {
          path: '/api/id/:id',
          name: 'api',
          component: () => import(/* webpackChunkName: "api" */'./views/api/index.vue')
        },
        {
          path: '/api/add/:id',
          name: 'apiAdd',
          component: () => import(/* webpackChunkName: "apiadd" */'./views/api/add.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/login/index.vue')
    },
    {
      path: '/project',
      name: 'project',
      component: () => import(/* webpackChunkName: "project" */'./views/project/index.vue')
    },
    {
      path: '/401',
      name: 'Page401',
      component: () => import(/* webpackChunkName: "401" */'./views/errorPage/401.vue')
    },
    {
      path: '/404',
      name: 'Page404',
      component: () => import(/* webpackChunkName: "404" */'./views/errorPage/404.vue')
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // sessionStorage.removeItem('user');
  }
  let user = Cookies.get('userInfo')
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
