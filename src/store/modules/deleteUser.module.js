import axios from 'axios'
import store from '../index'
import router from '@/router'

export default {
    namespaced: true,
    actions: {
        async remove() {
            const resultId = await store.dispatch('auth/toUser')
            const url = `https://irohaxi.site/api/v1/user/${resultId.id}/delete/`
            await axios.delete(url)
            store.commit('reg/CLEAR_USER')
            router.push('/').then(() => router.go())
        } 
    }
}