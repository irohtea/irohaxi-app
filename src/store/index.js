import { createStore, } from 'vuex'
import auth from './modules/auth.module'
import reg from './modules/reg.module'


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
    auth, reg
  }
})
