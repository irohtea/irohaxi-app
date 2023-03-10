// import router from '@/router'
import axios from 'axios'
import store from '../index'

export default {
    namespaced: true,
    state: {
        response: '',
    },
    mutations: {
        setResponse(state, response) {
            state.response = response
        },
    },
    actions: {
        async updateProfile({commit}, name) {
            console.log(name);
            const url = 'https://irohaxi.site/api/v1/user/update/'
            await axios.put(url, name, 
            {
                headers: {
                    Authorization: 'Bearer ' + store.getters['auth/getToken']
                }
            }).then(res => {
                commit('setResponse', res.data)
            })
        },
        async uploadImage(_, data) {
            const responseData = {}
            try {
                await axios.put('https://irohaxi.site/api/v1/user/update/avatar/',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer' + ' ' + store.getters['auth/getToken']
                    }
                }).then((res) => { 
                    responseData.value = res.data
                })
                console.log(responseData.value);
                return responseData.value
            } catch(e) {
                console.log(e);
            }
        }
    }
}