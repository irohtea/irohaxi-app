<template>
        
   <div class="track" 
   :class="[
      {playing: $store.state.player.playlist.length > 0 
      && $store.state.player.currentTrack.id === track.id
      && $store.state.player.isPlaying},
      
      {paused: $store.state.player.playlist.length > 0 
      && $store.state.player.currentTrack.id === track.id
      && !$store.state.player.isPlaying}
   ]">
      <div class="track__body">
         <div class="track__img">
            <img :src="track.song_poster" alt="Song Poster">
            <div class="track__controls controls">
               <button class="controls__more" >
                 <more-button @click="isModalOpen = !isModalOpen"/>
               </button>
               <button class="controls__play">
                  <play-button @click="$store.dispatch('player/addUserTrackToPlayList', {track})" />
               </button>
               <button class="controls__pause">
                  <pause-button @click="$store.dispatch('player/setPause', false)" />
               </button>
            </div>
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
            <button>
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
            <div class="modal-create-playlist" v-if="isTeleportOpen">
               <div class="modal-create-playlist__body" ref="modalCreate">
                  <div class="modal-create-playlist__title">New Playlist</div>
                  <form @submit.prevent="" class="modal-create-playlist__form modal-form">
                     <div class="modal-form__body">
                        <div class="modal-form__inputs">
                           <input type="text" class="modal-form__input" placeholder="name">
                           <input type="text" class="modal-form__input" placeholder="description">
                           <div class="modal-form__item">
                              <label class="modal-form__label">Make private?</label>
                              <input type="checkbox" class="modal-form__checkbox">
                           </div>
                        </div>
                        <div class="modal-form__buttons">
                           <button type="button" class="modal-form__close">Cancel</button>
                           <button type="submit" class="modal-form__create">Create</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </transition>
      </Teleport>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue';
import PauseButton from '@/components/UI/Controls/PauseButton.vue';
import MoreButton from '@/components/UI/Controls/MoreButton.vue';
import ModalMenu from '@/components/ModalMenu.vue'
import ModalPlaylists from '@/components/ModalPlaylists.vue'


import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
   name: 'my-track',

   components: {
      PlayButton,
      PauseButton,
      MoreButton,
      ModalMenu,
      ModalPlaylists,
   },
   props: {
      track: {
         type: Object,
         required: true,
      },
   },
   setup() {
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
         isModalPlaylistsOpen.value = false
      })
      onClickOutside(modalCreate, () => {
         isTeleportOpen.value = false
         isModalPlaylistsOpen.value = true

      })
      const close = () => {
         isModalOpen.value = false
         isModalPlaylistsOpen.value = false
         
      }
      return {
         isModalOpen,
         isModalPlaylistsOpen,
         isTeleportOpen,
         modalMenu,
         modalPlaylists,
         modalCreate,
         close
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
   &.playing {
      .controls {
         opacity: 1;
      }
      .controls__play {
         display: none;
      }
      .controls__pause {
         display: block;
      }
      @media (max-width: 768.98px){
         .track__body {
            border-radius: 10px;
            background: rgba(24, 36, 59, 0.704);
         }
      }
   }
   &.paused {
      .controls {
         opacity: 1;
      }
      .controls__play {
         display: block;
      }
      .controls__pause {
         display: none;
      }
      @media (max-width: 768.98px){
         .track__body {
            background: rgba(34, 35, 38, 0.9);
            border-radius: 10px;
         }
      }
   }
   // .track__body
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
.controls {
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   border-radius: 10px;
   pointer-events: none;
   opacity: 0;
   background: linear-gradient(180deg, rgba(25, 24, 38, 0.407) 60%, rgba(74, 111, 181, 0.283));
   transition: all 0.2s ease 0s;
   // .controls__more
   &__more {
      pointer-events: all;
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 10px;
      border-radius: 50%;
      transition: 0.2s ease 0s;
      @media (max-width: 768px){
           display: none;
      }
      &:active {
         background: rgba(79, 103, 139, 0.718);
      }
      &.active {
         background: rgba(79, 103, 139, 0.718);
      }
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
      &__pause{
         pointer-events: all;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         svg {
            width: 30px;
            height: 30px;
            path {
               fill: $white;
            }
         }
      }
      // .controls__play
		&__play {}
      // .controls__pause
		&__pause {
         display: none;
         pointer-events: all;
      }
}

.modal-create-playlist {
   position: fixed;
   top: 0;
   left: 0;
   z-index: 1000;
   width: 100vw;
   height: 100vh;
   background-color: rgb(0, 0, 0, 0.5);
   display: flex;
   justify-content:center;
   align-items: center;
		// .modal-create-playlist__body
		&__body {
         min-width: 500px;
         padding: 50px 50px;
         background-color: rgba(9, 33, 52, 0.95);
         box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
         border: 1px solid #323b48;
       
      }
		// .modal-create-playlist__form
		&__form {}
		// .modal-create-playlist__title
		&__title {
         margin-bottom: 20px;
         font-size: 20px;
      }
	

}
.modal-form {
		// .modal-form__body
		&__body {
       
      }
		// .modal-form__inputs
		&__inputs {
         display: flex;
         flex-direction: column;
         gap: 15px;
      }
		// .modal-form__input
		&__input {
         display: block;
         width: 100%;
         height: 50px;
         padding: 0 15px;
         font-size: 18px;
         background-color: transparent;
         appearance: none;
         color: $white;
         border: none;
         border-bottom: 1px solid rgba(97, 123, 161, 0.472);
         transition: all 0.2s ease 0s;
         &::placeholder {
            transition: opacity 0.2s ease 0s;
         }
         &:focus {
            border-bottom: 1px solid $blue;
            background-color: #111127;
            outline: none;
         &::placeholder {
            opacity: 0;
            }
       }
         &:hover {
            background-color: #182a3b;
            border-bottom: 1px solid $blue;
         }
      }
		// .modal-form__item
		&__item {
         display: flex;
         gap: 5px;
      }
		// .modal-form__label
		&__label {}
		// .modal-form__checkbox
		&__checkbox {}
      // .modal-form__buttons
		&__buttons {
         display: flex;
         justify-content: flex-end;
         margin-top: 10px;
         gap: 10px;
      }
		// .modal-form__close
		&__close {
         background-color: #b8dcfd;
         color: $blue;
         &:hover {
            background-color: #c9e5ff;
         }
      }
		// .modal-form__create
		&__create {
         background-color: $lightBlue;
         color: $white;
         &:hover {
            background-color: #399fff;
         }
      }

		&__close,
		&__create {
         display: inline-flex;
         align-items: center;
         align-self: flex-end;
         gap: 5px;
         padding: 8px 15px;
         margin-right: 10px;
         border-radius: 5px;
         transition: background-color 0.3s ease 0s;
      }
}


.modals-enter-active,
.modals-leave-active {
   transition: all 0.25s ease 0s;
}

.modals-enter-from,
.modals-leave-to {
   opacity: 0;
   transform: scale(1.1);
}
</style>