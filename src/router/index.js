import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'home',
            auth: false
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'auth',
            auth: true
        }
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/User.vue'),
        meta: {
            layout: 'user',
            auth: false
        }
    },
]   

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
