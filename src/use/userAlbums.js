import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

export function userAlbums() {
   const store = useStore()
   const albums = ref([])

   onMounted(async() => {
      const config = {
         headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         }
      }
      store.dispatch('setLoadingTrue')
      try {
         await axios.get(`https://irohaxi.site/api/v1/users/albums/`, config)
         .then(response => {
            albums.value = response.data;
            store.dispatch('setLoadingFalse')
         })
      } catch (error) {
         console.log(error);
      } finally {
         store.dispatch('setLoadingFalse')
      }
   })

   return {
      albums
   }

}