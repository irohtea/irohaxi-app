import axios from 'axios'
import { ref, onMounted } from 'vue'
import analyze from 'rgbaster'

export function playlistRetrieve(id) {
   const playlist = ref({})
   const bgColor = ref('')
   const background = ref({})
   const getAlbum = async () => {
      const config = {
         headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         }
      }

      try {
        await axios.get(`https://irohaxi.site/api/v1/playlist/${id}`, config)
         .then(response => {
            playlist.value = response.data
         }).then()
      } catch (error) {
         console.log(error);
      }
      try {
         const result = await analyze(playlist.value.poster, { ignore: [ 'rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(128, 128, 128)' ] }) 
         bgColor.value = result[0].color
         background.value = {
            'background': `linear-gradient(180deg, #0d0d13 0%, ${bgColor.value} 100%)`,
            'box-shadow': `0px 0px 20px ${bgColor.value}`,
         }
      } catch (error) {
         console.log(error);
      }
      
   }
   onMounted(getAlbum)

      return {
         playlist,
         getAlbum,
         bgColor,
         background
      }
}

