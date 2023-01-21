import axios from 'axios'
import { ref, onMounted } from 'vue'
import analyze from 'rgbaster'

export function albumRetrieve(id) {
   const album = ref({})
   const bgColor = ref('')
   const background = ref({})
   const getAlbum = async () => {
      const config = {
         headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         }
      }

      try {
        await axios.get(`https://irohaxi.site/api/v1/album/${id}`, config)
         .then(response => {
            album.value = response.data
         }).then()
      } catch (error) {
         console.log(error);
      }
      try {
         const result = await analyze(album.value.poster, { ignore: [ 'rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(128, 128, 128)' ] }) 
         bgColor.value = result[0].color
         background.value = {
            'background': `linear-gradient(180deg, #0d0d13 50%, ${bgColor.value})`,
            'box-shadow': `0px 0px 20px ${bgColor.value}`,
         }
         console.log(bgColor.value);
      } catch (error) {
         console.log(error);
      }
      
   }
   onMounted(getAlbum)

      return {
         album,
         getAlbum,
         bgColor,
         background
      }
}

