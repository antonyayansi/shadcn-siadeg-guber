import { createWebHistory, createRouter } from 'vue-router'
import routerHome from '@/modules/home/router'
import routerAuth from '@/modules/auth/router'
import isAuth from '@/middleware/isAuth'

const routes = [
  { 
    ...routerHome,
    beforeEnter: [ isAuth ]
  },
  {
    ...routerAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router