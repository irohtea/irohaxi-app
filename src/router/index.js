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
    path: '/library',
    name: 'library',
    component: () => import('../views/LibraryView')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/SuccessRegView')
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
