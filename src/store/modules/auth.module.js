import axios from 'axios'
import store from '../index'

const TOKEN_KEY = null
const DATA = null
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY),
        userData: localStorage.getItem(DATA)
    },
    getters: {
        getToken(state){
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
        logout(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        },
        setUserData(state, userData) {
            state.userData = userData
            localStorage.setItem(DATA, userData)
        }
    
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = 'https://irohaxi.site/api/v1/token'
                const {data} = await axios.post(url, {...payload})
                commit('setToken', data.access_token)
                await dispatch('toUser')
            } catch(e) {

            }

        },
        async toUser() {
            try {
                const url = 'https://irohaxi.site/api/v1/users/me/'
                const {getData} = await axios.get(url, {
                    headers: {
                        Authorization: 'Bearer ' + store.getters['auth/getToken']
                    }
            }).then(res => res.data)
            // store.state['auth/userData'] = data
            // commit('setUserData', getData)
            commit('setUserData', getData)
            // console.log('userdata', store.state['auth/userData']);
            }catch(e) {

            }
            
        }
        
    },
    modules: {
    }
}
