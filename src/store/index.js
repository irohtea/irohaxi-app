import { createStore, } from 'vuex'
import auth from './modules/auth.module'
import reg from './modules/reg.module'


export default createStore({
  state: {
    is_loading: false,
  },
  getters: {

  },
  mutations: {
    IS_LOADING(state, is_loading) {
      state.is_loading = is_loading
   }
  },
  actions: {
    setLoadingTrue({ commit }) {
      commit('IS_LOADING', true)
    },
    setLoadingFalse({ commit }) {
      commit('IS_LOADING', false)
    }
  },
  modules: {
    auth, reg, 
  }
})
