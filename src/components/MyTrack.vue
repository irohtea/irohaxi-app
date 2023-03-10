<template>
   <div class="track" :class="playingState">
      <div class="track__body">
         <div class="track__img">
            <img :src="track.song_poster" alt="Song Poster">
            <my-controls>
               <template #more>
                  <more-button @click="isModalOpen = !isModalOpen"/>
               </template>
               <template #play>
                  <play-button @click="$store.dispatch('player/addUserTrackToPlayList', {track})" />
               </template>
               <template #pause>
                  <pause-button @click="$store.dispatch('player/setPause', false)" />
               </template>
            </my-controls>
         </div>
         <div class="track__info">
            <div class="track__name">
               {{ track.name }}
            </div>
            <div class="track__author">
               {{ track.track_author }}
            </div>
         </div>
         <button class="track__more">
            <more-button @click="isModalOpen = !isModalOpen"/>
         </button>
      </div>

      <modal-menu 
         v-show="isModalOpen" 
         ref="modalMenu"
      >
         <template #buttons>
            <button @click="isModalPlaylistsOpen = !isModalPlaylistsOpen, isModalOpen = false">
               <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 8H0V12H24V8ZM24 0H0V4H24V0ZM32 16V8H28V16H20V20H28V28H32V20H40V16H32ZM0 20H16V16H0V20Z" fill="black"/>
               </svg>
               <span>Add to playlist</span>
            </button>
            <button @click="deleteTrack(track.id)">
               <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 32C2 34.21 3.79 36 6 36H22C24.21 36 26 34.21 26 32V8H2V32ZM28 2H21L19 0H9L7 2H0V6H28V2Z" fill="black"/>
               </svg>
               <span>Delete track</span>
            </button>
         </template>
      </modal-menu>

      <modal-playlists 
         v-show="isModalPlaylistsOpen" 
         ref="modalPlaylists" 
         @close="close"
         @openTeleport="isTeleportOpen = true"
         :trackId="track.id" 
      >
      </modal-playlists>

      <Teleport to="#modal">
         <transition name="modals">
            <div class="modal-wrapper" v-if="isTeleportOpen" >
               <modal-create ref="modalCreate" @closeTeleport="isTeleportOpen = false" :trackId="track.id"/>
            </div>
         </transition> 
      </Teleport>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue'
import PauseButton from '@/components/UI/Controls/PauseButton.vue'
import MoreButton from '@/components/UI/Controls/MoreButton.vue'
import ModalMenu from '@/components/ModalMenu.vue'
import ModalPlaylists from '@/components/ModalPlaylists.vue'
import ModalCreate from '@/components/ModalCreate.vue'
import MyControls from '@/components/MyControls.vue'

import axios from 'axios'
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore }from 'vuex'

export default {
   name: 'my-track',

   components: {
      PlayButton,
      PauseButton,
      MoreButton,
      ModalMenu,
      ModalPlaylists,
      ModalCreate,
      MyControls
   },
   props: {
      track: {
         type: Object,
         required: true,
      },
   },
   setup(props) {
      const store = useStore()

      const playingState = computed(() => {
         return store.state.player.playlist.length > 0 
         && store.state.player.currentTrack.id === props.track.id
         && store.state.player.isPlaying ? 'playing' : 

         store.state.player.playlist.length > 0 
         && store.state.player.currentTrack.id === props.track.id
         && !store.state.player.isPlaying ? 'paused' : ''
      })

      const isModalOpen = ref(false)
      const isModalPlaylistsOpen = ref(false)
      const isTeleportOpen = ref(false)

      const modalMenu = ref(null)
      const modalPlaylists = ref(null)
      const modalCreate = ref(null)
      
      onClickOutside(modalMenu, () => {
         isModalOpen.value = false
      })
      onClickOutside(modalPlaylists, () => {
         if(isTeleportOpen.value) {
            isModalPlaylistsOpen.value = true
         } else {
            isModalPlaylistsOpen.value = false
         }
      })
      onClickOutside(modalCreate, () => {
         isTeleportOpen.value = false
      })
      
      const deleteTrack = async (id) => {
         const config = {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }

         store.dispatch('setLoadingTrue')

         try {
            await axios.delete(`https://irohaxi.site/api/v1/users/track/${id}`, config)
            .then(response => {
               console.log(response);
            })
            // router.push('/library')
            // .then(() => { router.go() })
         } catch (error) {
            console.log(error);
         } finally {
            store.dispatch('setLoadingFalse')
         }
      }
      const close = () => {
         isModalOpen.value = false
         isModalPlaylistsOpen.value = false
      }
      const closeTeleport = () => {
         isTeleportOpen.value = false
      }
      return {
         playingState,
         isModalOpen,
         isModalPlaylistsOpen,
         isTeleportOpen,
         modalMenu,
         modalPlaylists,
         modalCreate,
         deleteTrack,
         close,
         closeTeleport
      }
   }
}
</script>
<style lang="scss" scoped>
.track {
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
         .track__body {
            border-radius: 10px;
            background: rgba(24, 36, 59, 0.704);
         }
      }
   }
   // // .track__body
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
         .track__img {
         }
         .controls__more {
         }
         .controls__play {
         }
      }
   }
   // .track__img
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
   // .track__info
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
   // .track__name
   &__name {
      font-weight: 700;
      color: #fff;
   }
   // .track__controls
   &__controls {
   }
   // .track__author
   &__author {

   }
   // .track__more
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