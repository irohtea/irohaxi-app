<template>
   <div class="playlist" :class="playingState">
      <div class="playlist__body">
         <div class="playlist__img">
            <router-link :to="`/playlist/${playlist.id}`">
               <img :src="playlist.poster" alt="Song Poster">
            </router-link>
            <my-controls>
               <template #more>
                  <more-button @click="isModalOpen = !isModalOpen"/>
               </template>
               <template #play>
                  <play-button @click="$store.dispatch('player/addAlbumToPlayList', playlist)" />
               </template>
               <template #pause>
                  <pause-button @click="$store.dispatch('player/setPause', false)" />
               </template>
            </my-controls>
         </div>
         <div class="playlist__info">
            <div class="playlist__name">
               {{ playlist.name }}
            </div>
            <div class="playlist__length">
               <span>{{ playlist.length }} tracks</span>
            </div>
         </div>
         <button class="playlist__more">
            <more-button @click="isModalOpen = !isModalOpen" />
         </button>
      </div>
      <modal-menu 
         v-show="isModalOpen" 
         ref="modal"
      >
         <template #buttons>
            <button @click="deletePlaylist(playlist.id)">
               <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 32C2 34.21 3.79 36 6 36H22C24.21 36 26 34.21 26 32V8H2V32ZM28 2H21L19 0H9L7 2H0V6H28V2Z" fill="black"/>
               </svg>
               <span>Delete Playlist</span>
            </button>
         </template>
      </modal-menu>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue'
import PauseButton from '@/components/UI/Controls/PauseButton.vue'
import MoreButton from '@/components/UI/Controls/MoreButton.vue'
import MyControls from '@/components/MyControls.vue'
import ModalMenu from '@/components/ModalMenu.vue'

import router from '@/router'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

export default {
   name: 'my-playlist',

   components: {
      PlayButton,
      PauseButton,
      MoreButton,
      MyControls,
      ModalMenu,
   },
   props: {
      playlist: {
         type: Object,
         required: true,
      },
   },
   setup(props) {
      const store = useStore()
      const playingState = computed(() => {

         return store.state.player.playlist.length > 0 
         && store.state.player.albumId === props.playlist.id
         && store.state.player.isPlaying ? 'playing' : 

         store.state.player.playlist.length > 0 
         && store.state.player.albumId === props.playlist.id
         && !store.state.player.isPlaying ? 'paused' : ''
      })
      
      const isModalOpen = ref(false)
      const modal = ref(null)

      onClickOutside(modal, () => {
         isModalOpen.value = false
      })
   
      const deletePlaylist = async (id) => {
         const config = {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }
         store.dispatch('setLoadingTrue')
         try {
            await axios.delete(`https://irohaxi.site/api/v1/user/playlist/${id}`, config)
            .then(response => {
               console.log(response);
            })
            router.push('/library')
            .then(() => { router.go() })
         } catch (error) {
            console.log(error);
         } finally {
            store.dispatch('setLoadingFalse')
         }
      }

      return {
         playingState,
         deletePlaylist,
         isModalOpen,
         modal,
      }
   },
  
}
</script>
<style lang="scss" scoped>
.playlist {
   position: relative;
   display: grid;
   justify-items: center;
   margin: 0 auto;
   width: 200px;
   @media (max-width: 768.98px){
      width: 100%;
      display: flex;
   }
   &.playing,
   &.paused  {
      @media (max-width: 768.98px){
         .playlist__body {
            border-radius: 10px;
            background: rgba(24, 36, 59, 0.704);
         }
      }
   }
   // .playlist__body
   &__body {
      position: relative;
      @media (max-width: 768.98px){
         display: flex;
         flex: 1 1 100%;
         align-items: center;
         gap: 10px;
      }
      &:hover {
         .controls {
            opacity: 1;
         }
         .playlist__img {
         }
         .controls__more {
         }
         .controls__play {
         }
      }
   }
   // .playlist__img
   &__img {
      position: relative;
      z-index: 5;
      width: 200px;
      height: 200px;
      @media (max-width: 768.98px){
         width: 100px;
         height: 100px;
      }
      @media (max-width: 460px){
         width:  70px;
         height: 70px;
      }
      img {
         width: 200px;
         height: 200px;
         object-fit: cover;
         border-radius: 10px;
         transition: all 0.3s ease 0s;
         @media (max-width: 768px){
            width: 100px;
            height: 100px;
         }
         @media (max-width: 460px){
            width:  70px;
            height: 70px;
         }
      }
   }
   // .playlist__info
   &__info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
      @media (max-width: 768.98px){
         flex: 1 1 100%;
      }
      @media (max-width: 460px){
         font-size: 14px;
      }
   }
   // .playlist__name
   &__name {
      font-weight: 700;
      color: #fff;
   }
   // .playlist__band
   &__length {
      font-size: 14px;
   }
   // .playlist__controls
   &__controls {
   }
   // .album__more
   &__more {
      pointer-events: all;
      // margin-right: 15px;
      padding: 10px;
      border-radius: 50%;
      transition: 0.2s ease 0s;
      &:active {
         background: rgba(79, 103, 139, 0.718);
      }
      &.active {
         background: rgba(79, 103, 139, 0.718);
      }
      svg {
         width: 20px;
         height: 20px;
      }
      @media (min-width: 768.98px){
         display: none;
      }
   }

}
//Controls========================================================================================================================================================
.controls {
   // .controls__more
   &__more {
      svg {
         width: 20px;
         height: 20px;
         path {
            fill: $white;
         }
      }
   }
   // .controls__play
   &__play,
   &__pause {
      svg {
         width: 30px;
         height: 30px;
         @media (max-width: 460px){
            width: 20px;
            height: 20px;
         }
         path {
            fill: $white;
         }
      }
   }
}

</style>