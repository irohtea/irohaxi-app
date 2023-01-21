import { ref, onMounted } from 'vue'
import axios from 'axios'

export function userTracks() {

   const tracks = ref([])

   onMounted(async() => {
      const config = {
         headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         }
      }
      try {
         await axios.get(`https://irohaxi.site/api/v1/users/tracks/`, config)
         .then(response => {
            tracks.value = response.data;
         })
      } catch (error) {
         console.log(error);
      } 
   })

   return {
      tracks
   }

}