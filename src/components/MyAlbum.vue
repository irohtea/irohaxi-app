<template>
   <div class="album" :class="playingState">
      <div class="album__body">
         <div class="album__img">
            <router-link :to="`/album/${album.id}`">
               <img :src="album.poster" alt="Song Poster">
            </router-link>
            <my-controls>
               <template #more>
                  <more-button @click="isModalOpen = !isModalOpen"/>
               </template>
               <template #play>
                  <play-button @click="$store.dispatch('player/addAlbumToPlayList', album)" />
               </template>
               <template #pause>
                  <pause-button @click="$store.dispatch('player/setPause', false)" />
               </template>
            </my-controls>
         </div>
         <div class="album__info">
            <div class="album__name">
               {{ album.name }}
            </div>
            <div class="album__band">
               <span>Album</span> &middot; {{ album.band }}
            </div>
         </div>
         <button class="album__more">
            <more-button @click="isModalOpen = !isModalOpen" />
         </button>
      </div>
      <modal-menu 
         v-show="isModalOpen" 
         ref="modal"
      >
         <template #buttons>
            <button @click="deleteAlbum(album.id)">
               <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 32C2 34.21 3.79 36 6 36H22C24.21 36 26 34.21 26 32V8H2V32ZM28 2H21L19 0H9L7 2H0V6H28V2Z" fill="black"/>
               </svg>
               <span>Delete album</span>
            </button>
         </template>
      </modal-menu>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue'
import PauseButton from '@/components/UI/Controls/PauseButton.vue'
import MoreButton from '@/components/UI/Controls/MoreButton.vue'
import ModalMenu from '@/components/ModalMenu.vue'
import MyControls from '@/components/MyControls.vue'

import router from '@/router'
import axios from 'axios'

import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'

export default {
   name: 'my-album',

   components: {
      PlayButton,
      PauseButton,
      MoreButton,
      ModalMenu,
      MyControls
   },
   props: {
      album: {
         type: Object,
         required: true,
      },
   },
   setup(props) {
      const store = useStore()
      const playingState = computed(() => {

         return store.state.player.playlist.length > 0 
         && store.state.player.albumId === props.album.id
         && store.state.player.isPlaying ? 'playing' : 

         store.state.player.playlist.length > 0 
         && store.state.player.albumId === props.album.id
         && !store.state.player.isPlaying ? 'paused' : ''
      })
      
      const isModalOpen = ref(false)
      const modal = ref(null)

      onClickOutside(modal, () => {
         isModalOpen.value = false
      })
   
      const deleteAlbum = async (id) => {
         const config = {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }

         store.dispatch('setLoadingTrue')

         try {
            await axios.delete(`https://irohaxi.site/api/v1/users/albums/${id}`, config)
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
         deleteAlbum,
         isModalOpen,
         modal,
      }
   },
  
}
</script>
<style lang="scss" scoped>
.album {
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
         .album__body {
            border-radius: 10px;
            background: rgba(24, 36, 59, 0.704);
         }
      }
   }
   // .album__body
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
         .album__img {
         }
         .controls__more {
         }
         .controls__play {
         }
      }
   }
   // .album__img
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
   // .album__info
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
   // .album__name
   &__name {
      font-weight: 700;
      color: #fff;
   }
   // .album__band
   &__band {
      font-size: 14px;
   }
   // .album__controls
   &__controls {

   }
   // .album__author
   &__author {

   }
   &__dialog {}

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