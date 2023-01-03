// import router from '@/router'
import axios from 'axios'
import store from '../index'

const TOKEN_KEY = 'jwt_token'

export default {
   namespaced: true,
   state: {
      token: localStorage.getItem(TOKEN_KEY),
   },
   getters: {
      getToken(state) {
         return state.token
      },
      isAuth(_, getters) {
         return !!getters.token
      }

   },
   mutations: {
      setToken(state, token) {
         state.token = token
         localStorage.setItem(TOKEN_KEY, token)
      },
   },
   actions: {
      async login({ commit }, payload) {
         try {
            const url = 'https://irohaxi.site/api/v1/token'
            const { data } = await axios.post(url, { ...payload })
            commit('setToken', data.access_token)
            return data
         } catch (e) {
            console.log('Error Login :', e);
         }
      },
      async toUser() {
         try {
            const url = 'https://irohaxi.site/api/v1/users/me/'
            const { data } = await axios.get(url, {
               headers: {
                  Authorization: 'Bearer' + ' ' + store.getters['auth/getToken']
               }
            })
            return data
         } catch (e) {
            console.log(e);
         }
      }

   },
   modules: {
   }
}