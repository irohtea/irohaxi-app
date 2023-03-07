<template>
   <div class="album-track" :class="playingState">
      <div class="album-track__body">
         <div class="album-track__img">
            <img :src="track.song_poster" :alt="track.name">
            <my-controls>
               <template #play>
                  <play-button @click="$store.dispatch('player/changeTrack', track)" />
               </template>
               <template #pause>
                  <pause-button @click="$store.dispatch('player/setPause', false)" />
               </template>
            </my-controls>
         </div>
         <div class="album-track__info">
            <div class="album-track__name">{{ track.name }}</div>
            <div class="album-track__band">{{ track.track_author }}</div>
         </div>
         <button class="album-track__more">
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

import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore }from 'vuex'

export default {
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
         close,
         closeTeleport
      }
   }
}
</script>

<style lang="scss" scoped>
.album-track {
   position: relative;
   transition: all 0.3 ease;
   border-radius: 5px;
   &.playing {
      background: rgba(34, 35, 38, 0.4);
      .controls {
         opacity: 1;
      }
      .controls__play {
         display: none;
      }
      .controls__pause {
         display: block;
      }

   }
   &.paused {
      background: rgba(34, 35, 38, 0.4);
      .controls {
         opacity: 1;
      }
      .controls__play {
         display: block;
      }
      .controls__pause {
         display: none;
      }
   }
   // .album-track__body
   &__body {
      display: flex;
      gap: 10px;
      align-items: center;
      &:hover {
         transition: all 0.3 ease;
         background: rgba(34, 35, 38, 0.4);
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
   // .album-track__img
   &__img {
      position: relative;
      flex: 0 0 100px;
      height: 100px;
      @media (max-width: 460px){
         flex: 0 0 70px;
         height: 70px;
      }
      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
         border-radius: 5px;
        
      }
   }
   // .album-track__info
   &__info {
      flex: 1 1 100%;
   }
   // .album-track__name
   &__name {
      color: $white;
   }
   
   // .album-track__band
   &__band {}
   // .album-track__controls 
   &__controls {
      border-radius: 0px;
   }
   // .controls__more
   &__more {
      display: flex;
      pointer-events: all;
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
   }
}
.controls {
   border-radius: 5px;
   @media (max-width: 460px){
        svg {
         width: 20px;
         height: 20px;
        }
   }
}
</style>