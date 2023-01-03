import { createRouter, createWebHistory } from 'vue-router'
import ActivateView from '../views/ActivateView.vue'
import HomeView from '../views/HomeView.vue'
import store from '../store'
// import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      auth: false
    }
  },
  {
    path: '/activate/:token',
    name: 'activate',
    component: ActivateView,
    meta: {
      auth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView'),
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView'),
    meta: {
      auth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView'),
    meta: {
      auth: false
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView'),
    meta: {
      auth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView'),
    meta: {
      auth: true
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/SuccessRegView'),
    meta: {
      auth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if(requireAuth && store.getters['auth/isAuth']) {
      next()
  } else if (requireAuth && !store.getters['auth/isAuth']) {
      next('/login?details=login')
  } else {
      next()
  }
})

export default router
