import axios from 'axios'
import store from '../index'
import {error} from '@/utils/error'
import router from '@/router'

const TOKEN_KEY = 'jwt_token'

export default {
   namespaced: true,
   state: {
      token: localStorage.getItem(TOKEN_KEY),
      myData: []
   },
   getters: {
      getToken(state) {
         return state.token
      },
      isAuth(state) {
         return !!state.token
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
            throw error(e.response.data.detail)
         } 
         finally {
            router.push('/user')
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
      },
   },
   modules: {
   }
}