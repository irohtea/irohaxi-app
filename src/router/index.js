import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'home'
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'auth'
        }
    }
]   

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
