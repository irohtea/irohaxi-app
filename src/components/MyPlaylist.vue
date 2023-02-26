<template>
   <div class="playlist"
      :class="[
      // {playing: $store.state.player.playlist.length > 0 
      // && $store.state.player.playlistId === playlist.id
      // && $store.state.player.isPlaying},
      
      // {paused: $store.state.player.playlist.length > 0 
      // && $store.state.player.playlistId === playlist.id
      // && !$store.state.player.isPlaying}
      ]">
      <div class="playlist__body">
         <div class="playlist__img">
            <router-link :to="`/playlist/${playlist.id}`">
               <img :src="playlist.poster" alt="Song Poster">
            </router-link>
            <div class="playlist__controls controls">
               <button class="controls__more">
                  <more-button @click="isModalOpen = true"/>
               </button>
               <button class="controls__play">
                  <play-button @click="$store.dispatch('player/addplaylistToPlayList', playlist)"/>
               </button>
               <button class="controls__pause" >
                  <pause-button @click="$store.dispatch('player/setPause', false)" />
               </button>
            </div>
         </div>
         <div class="playlist__info">
            <div class="playlist__name">
               {{ playlist.name }}
            </div>
            <div class="playlist__band">
               <span>playlist</span> &middot; {{ playlist.band }}
            </div>
         </div>
      </div>
      <div class="playlist__dialog dialog" v-show="isModalOpen" >
         <div class="dialog__body" v-click-outside="onClickOutside">
            <div class="dialog__items">
               <button class="dialog__btn" @click="deleteplaylist(playlist.id)">Delete</button>
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
   name: 'my-playlist',

   components: {
      PlayButton,
      PauseButton,
      MoreButton,
   },
   props: {
      playlist: {
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
   
      const deleteplaylist = async (id) => {
         const config = {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }

         store.dispatch('setLoadingTrue')

         try {
            await axios.delete(`https://irohaxi.site/api/v1/users/playlists/${id}`, config)
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
         deleteplaylist,
         isModalOpen,
         onClickOutside
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
   }
   // .playlist__body
   &__body {
      position: relative;
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
      img {
         width: 200px;
         height: 200px;
         object-fit: cover;
         border-radius: 10px;
         transition: all 0.3s ease 0s;
      }
   }
   // .playlist__info
   &__info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
   }
   // .playlist__name
   &__name {
      font-weight: 700;
      color: #fff;
   }
   // .playlist__band
   &__band {
      font-size: 14px;
   }
   // .playlist__controls
   &__controls {

   }
   // .playlist__author
   &__author {

   }
   &__dialog {}

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