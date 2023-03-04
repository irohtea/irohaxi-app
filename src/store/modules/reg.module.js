// import store from '../index'

import axios from 'axios'
import router from '@/router'

const TOKEN_KEY = 'jwt_token'
export default ({
   namespaced: true,
   state: {
      token: localStorage.getItem(TOKEN_KEY),
      is_loading: false
   },
   getters: {
   },
   mutations: {
      CREATE_USER(state, is_reg) {
         state.is_reg = is_reg
      },
      SET_TOKEN(state, token) {
         state.token = token
         localStorage.setItem(TOKEN_KEY, token)
      },
      CLEAR_USER(state) {
         state.token = null
         localStorage.removeItem(TOKEN_KEY)
      },
      IS_LOADING(state, is_loading) {
         state.is_loading = is_loading
      }
   },
   actions: {
      async register({ commit }, details) {
         const { email, password } = details
         commit('IS_LOADING', true)
         try {
            await axios.post(`https://irohaxi.site/api/v1/users/create/`,
               {
                  email: email,
                  password: password
               }).then(response => {
                  console.log(response.status);
                  if (response.status === 200) {
                     router.push('/message')
                  }
               })
            commit('IS_LOADING', false)
         } catch (error) {
            console.log(error);
         } finally {
            commit('IS_LOADING', false)
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
            .then(() => { router.go() })
      },
      logout({ commit }) {

         commit('CLEAR_USER')

         router.push('/login')
            .then(() => { router.go() })

      },
   },
   modules: {
   }
})
