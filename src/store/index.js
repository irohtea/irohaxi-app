import { createStore } from 'vuex'
import auth from './modules/auth.module'
import reg from './modules/reg.module'

import player from './modules/player.module'

import edit from './modules/edit.module'
import deleteUser from './modules/deleteUser.module'
import image from './modules/image.module'

import genre from './modules/genre.module'

export default createStore({
  state: {
    is_loading: false,
  },
  getters: {
    penis(state) {
      return state.penis
    }
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
    player,
    auth, 
    reg, 
    edit,
    deleteUser,
    image,
    genre
  }
})
