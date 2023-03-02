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
    userPlaylists: [], 
    addedPlaylist: {},
    isAdded: false,
  },
  getters: {

  },
  mutations: {
    IS_LOADING(state, is_loading) {
      state.is_loading = is_loading
   },
    GET_PLAYLIST(state, userPlaylists) {
      state.userPlaylists = userPlaylists
   },
   SET_ADDED(state, addedPlaylist) {
      state.addedPlaylist = addedPlaylist
   },
   IS_ADDED(state, isAdded) {
      state.isAdded = isAdded
   },
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
    },
    setAddedPlaylist({commit}, details) {
      commit('SET_ADDED', details)
      commit('IS_ADDED', true)
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
