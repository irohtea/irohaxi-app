import axios from 'axios'
import store from '..'

const TOKEN_KEY = null

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY)
    },
    getters: {
        getToken(state){
            return state.token
        }

    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            const url = 'https://irohaxi.site/api/v1/token'
            const {data} = await axios.post(url, {...payload})
            commit('setToken', data.access_token)
            dispatch('toUser')

        },
        async toUser() {
            const url = 'https://irohaxi.site/api/v1/users/me/'
            await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + store.getters['auth/getToken']
                }
            })
        }
        
    },
    modules: {
    }
}
