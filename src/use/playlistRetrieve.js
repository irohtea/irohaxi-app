import axios from 'axios'
import { ref, onMounted } from 'vue'
import analyze from 'rgbaster'
import { useStore } from 'vuex'

export function playlistRetrieve(id) {
   const store = useStore()
   const playlist = ref({})
   const bgColor = ref('')
   const background = ref({})
   const ignor = [
      '#000000','#080808',	'#101010',	'#181818',	'#202020',	'#282828',	'#303030',	'#383838',	
      '#404040','#484848'	,'#505050','#585858'	,'#606060'	,'#686868','#696969','#707070',	
      '#787878',	'#808080',	'#888888','#909090',	'#989898','#A0A0A0','#A8A8A8','#A9A9A9','#B0B0B0',
      '#B8B8B8','#BEBEBE',	'#C0C0C0','#C8C8C8',	'#D0D0D0','#D3D3D3',	'#D8D8D8',	'#DCDCDC',	'#E0E0E0',	
      '#E8E8E8',	'#F0F0F0','#F5F5F5','#F8F8F8','#FFFFFF',
   ]
   const getAlbum = async () => {
      const config = {
         headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         }
      }

      try {
      store.dispatch('setLoadingTrue')
        await axios.get(`https://irohaxi.site/api/v1/playlist/${id}`, config)
         .then(response => {
            playlist.value = response.data
         }).then()
      } catch (error) {
         console.log(error);
         store.dispatch('setLoadingFalse')
      } finally {
         store.dispatch('setLoadingFalse')
      }
      try {
       store.dispatch('setLoadingTrue')
         const result = await analyze(playlist.value.poster, { ignore: [ ignor ] }) 
         bgColor.value = result[12].color
         console.log(bgColor.value );
         background.value = {
            'background': `linear-gradient(-180deg, #0d0d13 30%, ${result[12].color})`,
            'opacity': '1',
            'box-shadow': `0px 0px 20px ${result[12].color}`,
         }
      } catch (error) {
      store.dispatch('setLoadingFalse')
         console.log(error);
      } finally {
         store.dispatch('setLoadingFalse')
      }
      
   }
   onMounted(getAlbum)

      return {
         playlist,
         getAlbum,
         bgColor,
         background,
         ignor
      }
}

