import { createStore } from 'vuex'
import auth from './modules/auth.module'
import reg from './modules/reg.module'
import edit from './modules/edit.module'
import deleteUser from './modules/deleteUser.module'
import image from './modules/image.module'

export default createStore({
  state: {
    is_loading: false,
  },
  getters: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, 
    reg, 
    edit,
    deleteUser,
    image
  }
})
