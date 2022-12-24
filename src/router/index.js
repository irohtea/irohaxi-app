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
            auth: false
        }
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/User.vue'),
        meta: {
            layout: 'user',
            auth: true
        }
    }
]   

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//     const requiredAuth = to.meta.auth

//     if(requiredAuth & store.getters['auth/isAuth']) {
//         next()
//     } else if( requiredAuth & !store.getters['auth/isAuth']) {
//         next('/auth?message=auth')
//     } else {
//         next()
//     }
// })

export default router
