// import store from '../index'

import axios from 'axios'
import router from '@/router'

const TOKEN_KEY = 'jwt_token'
const IS_REG = false
export default ({
   namespaced: true,
   state: {
      // is_loading: false,
      is_active: null,
      is_reg: localStorage.getItem(IS_REG),
      token: localStorage.getItem(TOKEN_KEY),
   },
   getters: {
   },
   mutations: {
      CREATE_USER(state, is_reg) {
         state.is_reg = is_reg
         localStorage.setItem(IS_REG, true)
         // localStorage.setItem(TOKEN_KEY, token)
      },
      SET_TOKEN(state, token) {
         state.token = token
         localStorage.setItem(TOKEN_KEY, token)
      },
      CLEAR_USER(state) {
         state.token = null
         localStorage.removeItem(TOKEN_KEY)
      }
   },
   actions: {
      async register({ commit }, details) {
         const { email, password } = details
         try {
            await axios.post(`https://irohaxi.site/api/v1/users/create/`,
               {
                  email: email,
                  password: password
               })
         } catch (error) {
            console.log(error);
         }
         commit('CREATE_USER', true)
      },
      async activate({ commit }, details) {
         const token = details
         try {
            await axios.post(`https://irohaxi.site/api/v1/user/email/activation/`, {
               token: token
            })
         } catch (error) {
            console.log(error);
         }
         commit('SET_TOKEN', token)
         router.push('/')
      },
      logout({ commit }) {

         commit('CLEAR_USER')

         router.push('/login')
      },
   },
   modules: {
   }
})
