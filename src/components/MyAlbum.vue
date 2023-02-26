<template>
   <div class="album"
      :class="[
      {playing: $store.state.player.playlist.length > 0 
      && $store.state.player.albumId === album.id
      && $store.state.player.isPlaying},
      
      {paused: $store.state.player.playlist.length > 0 
      && $store.state.player.albumId === album.id
      && !$store.state.player.isPlaying}
      ]">
      <div class="album__body">
         <div class="album__img">
            <router-link :to="`/album/${album.id}`">
               <img :src="album.poster" alt="Song Poster">
            </router-link>
               <div class="album__controls controls">
                  <button class="controls__more">
                     <more-button @click="isModalOpen = true"/>
                  </button>
                  <button class="controls__play">
                     <play-button @click="$store.dispatch('player/addAlbumToPlayList', album)"/>
                  </button>
                  <button class="controls__pause" >
                     <pause-button @click="$store.dispatch('player/setPause', false)" />
                  </button>
               </div>
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
            <more-button />
         </button>
      </div>
      <div class="album__dialog dialog" v-show="isModalOpen" >
         <div class="dialog__body" v-click-outside="onClickOutside">
            <div class="dialog__items">
               <button class="dialog__btn" @click="deleteAlbum(album.id)">Delete</button>
               <button class="dialog__btn">SOME</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue'
import PauseButton from '@/components/UI/Controls/PauseButton.vue'
import MoreButton from '@/components/UI/Controls/MoreButton.vue'

import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
   name: 'my-album',

   components: {
      PlayButton,
      PauseButton,
      MoreButton,
   },
   props: {
      album: {
         type: Object,
         required: true,
      },
   },
   setup() {
      const store = useStore()
      const isModalOpen = ref(false)
      
     const onClickOutside = () => {
      //   console.log('Clicked outside. Event: ', event.target.value)
         isModalOpen.value = false

      }
   
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
         deleteAlbum,
         isModalOpen,
         onClickOutside
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
      @media (max-width: 768.98px){
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
   &__pause {
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
.dialog {
      position: absolute;
      top: 18%;
      right: -10%;
      z-index: 5;
		// .dialog__body
		&__body {
         padding: 10px;
         background-color: rgb(33, 33, 33, 0.95);
      }
      // .dialog__items
      &__items {
         display: flex;
         flex-direction: column;
      }
		// .dialog__btn
		&__btn {
         padding: 10px;
         color: $white;
      }
}

</style>