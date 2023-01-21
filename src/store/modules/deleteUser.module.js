import axios from 'axios'
import store from '../index'
import router from '@/router'

export default {
    namespaced: true,
    actions: {
        async remove() {
            const url = `https://irohaxi.site/api/v1/user/delete/`
            await axios.delete(url, {
                headers: {
                    Authorization: 'Bearer' + ' ' + store.getters['auth/getToken']
                }
            })
            store.commit('reg/CLEAR_USER')
            router.push('/').then(() => router.go())
        } 
    }
}