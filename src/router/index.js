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
    path: '/library',
    name: 'library',
    component: () => import('../views/LibraryView')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView'),
    children: [
      {
        path: 'account',
        component: () => import('../components/Settings/SettingsAccountSidebar'),
        meta: {
          auth: true,
        }
      },
    ],
    meta: {
      sidebar: 'settings',
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
  {
    path: '/upload-track',
    name: 'upload-track',
    component: () => import('../views/UploadTrackView')
  },
  {
    path: '/upload-album',
    name: 'upload-album',
    component: () => import('../views/UploadAlbumView')
  },
  {
    path: '/album/:id',
    name: 'album',
    component: () => import('../views/AlbumView')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('../views/PlayerExtendedView')
  },
  {
    path: '/all-albums',
    name: 'allalbum',
    component: () => import('..//components/TheAllAlbums')
  },
  {
    path: '/all-tracks',
    name: 'alltracks',
    component: () => import('..//components/Tracks/TheAllTracks.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
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
