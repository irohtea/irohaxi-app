import { createRouter, createWebHistory } from 'vue-router'
import ActivateView from '../views/ActivateView.vue'
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/activate/:token',
    name: 'activate',
    component: ActivateView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
