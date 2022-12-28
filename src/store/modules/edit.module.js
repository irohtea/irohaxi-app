// import router from '@/router'
import axios from 'axios'
import store from '../index'

export default {
    namespaced: true,
    state: {

    },
    getters: {
    },
    mutations: {

    },
    actions: {
        async updateProfile(_, name) {
            console.log(name);
            const url = 'https://irohaxi.site/api/v1/user/update/'
            await axios.put(url, name, 
            {
                headers: {
                    Authorization: 'Bearer ' + store.getters['auth/getToken']
                }
            }).then(res => res.data)
        }
    }
}