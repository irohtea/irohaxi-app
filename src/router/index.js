import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeViews'
// import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/AuthViews.vue'),
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/UserViews.vue'),
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
