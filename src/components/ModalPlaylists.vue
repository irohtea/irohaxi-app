<template>
   <transition name="fade-up">
      <div class="modal-playlist">
         <div class="modal-playlist__body">
            <div class="modal-playlist__top">
               <span>Add to playlist</span>
               <div @click="close">X</div>
               <div @click="test === true">click</div>
            </div>
            <div class="modal-playlist__list">
               <div class="modal-playlist__item playlist" v-for="playlist in playlists" :key="playlist">
                  <div class="playlist__body">
                     <div class="playlist__img"></div>
                     <div class="playlist__info">
                        <div class="playlist__name"></div>
                        <div class="playlist__length"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>
<script>
import axios from 'axios'
import { ref } from 'vue'

export default {

   setup ( props, {emit}) {
      console.log(props.isModalPlaylistsOpen);
      const playlists = ref([])
      const test = ref(false)
    
      
      const getPlaylists = async () => {
         const config = {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }
         try {
            await axios.get(`https://irohaxi.site/api/v1/user/playlists/`, config)
            .then(response => {
               console.log(response);
            })
         } catch (error) {
            console.log(error);
         }
      }

      const close = () => {
         emit('close')
      }
      return {
         playlists,
         getPlaylists,
         close,
         test
      }
   }
}
</script>

<style lang="scss" scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  -webkit-transition: all 1s cubic-bezier(0.68, 0.16, 0.42, 0.75);
  transition: all .3s cubic-bezier(0.68, 0.16, 0.42, 0.75);
}

.fade-up-enter-from,
.fade-up-leave-to {
   transform: translateY(50%);
   opacity: 0;
}
</style>