import { createStore } from 'vuex'
import auth from './modules/auth.module'
import reg from './modules/reg.module'
import axios from 'axios'

import player from './modules/player.module'
import edit from './modules/edit.module'
import deleteUser from './modules/deleteUser.module'
import image from './modules/image.module'


export default createStore({
  state: {
    is_loading: false,
    userPlaylists: [] 
  },
  getters: {

  },
  mutations: {
    IS_LOADING(state, is_loading) {
      state.is_loading = is_loading
   },
    GET_PLAYLIST(state, userPlaylists) {
      state.userPlaylists = userPlaylists
   }
  },
  actions: {
    setLoadingTrue({ commit }) {
      commit('IS_LOADING', true)
    },
    setLoadingFalse({ commit }) {
      commit('IS_LOADING', false)
    },
    async getPlaylists({commit}) {
      const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
        }
      }
      try {
          await axios.get(`https://irohaxi.site/api/v1/user/playlists/`, config)
          .then(response => {
            commit('GET_PLAYLIST', response.data)
          })
      } catch (error) {
          console.log(error);
      }
    }
  },
  modules: {
    player,
    auth, 
    reg, 
    edit,
    deleteUser,
    image
  }
})
