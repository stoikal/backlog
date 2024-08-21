import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { isLoggedIn } from '../client/auth'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'login',
    path: '/login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const loggedIn = await isLoggedIn()
  
  if (!loggedIn && to.name !== 'login') {
    return { name: 'login' }
  } 

  if (loggedIn && to.name === 'login') {
    return { path: '/' }
  }

  return true
})

export default router