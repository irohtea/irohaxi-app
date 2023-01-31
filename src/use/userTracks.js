import { ref, onMounted } from 'vue'
import axios from 'axios'

export function userTracks() {

   const tracks = ref([])
   const currentTrack = ref({})
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
            currentTrack.value = tracks.value[0]
            // console.log(currentTrack.value);
         })
      } catch (error) {
         console.log(error);
      } 
   })

   return {
      tracks,
      currentTrack
   }

}