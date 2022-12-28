import { createStore, } from 'vuex'
import auth from './modules/auth.module'
import reg from './modules/reg.module'
import edit from './modules/edit.module'


export default createStore({
  // plugins,
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
    auth, reg, edit
  }
})
