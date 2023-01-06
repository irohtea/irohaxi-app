import axios from "axios"
import store from '../index'
// import router from '@/router'


export default {
    namespaced: true,
    actions: {
        async uploadImage(_, data) {
            const response = {}
            try {
                await axios.put('https://irohaxi.site/api/v1/user/update/avatar/',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer' + ' ' + store.getters['auth/getToken']
                    }
                }).then((res) => { 
                    response.value = res.data
                })
                // console.log(response.value);
                return response.value
            } catch(e) {
                console.log(e);
            }
            
        }
    }
}