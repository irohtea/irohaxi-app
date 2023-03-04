import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

export function userPlaylists() {
   const store = useStore()
   const playlists = ref([])

   onMounted(async() => {
      const config = {
         headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         }
      }
      store.dispatch('setLoadingTrue')
      try {
         await axios.get(`https://irohaxi.site/api/v1/user/playlists/`, config)
         .then(response => {
            playlists.value = response.data;
            store.dispatch('setLoadingFalse')
         })
      } catch (error) {
         console.log(error);
      } finally {
         store.dispatch('setLoadingFalse')
      }
   })

   return {
      playlists
   }

}