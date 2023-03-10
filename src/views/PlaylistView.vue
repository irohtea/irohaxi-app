<template>
   <main class="playlist" >
      <div class="playlist__wrapper" :style="background">
         <div class="playlist__container">
            <div class="playlist__body" >
               <div class="playlist__info playlist-info" >
                  <div class="playlist-info__left">
                     <div class="playlist-info__img">
                        <img :src="playlist.poster" :alt="playlist.name">
                     </div>
                  </div>
                  <div class="playlist-info__right">
                     <div class="playlist-info__name"> {{ playlist.name }}</div>
                     <div class="playlist-info__description">
                        <p>{{ playlist.description }}</p>
                     </div>
                     <div class="playlist-info__owner">
                       visible: <span>{{ playlist.is_hidden ? 'for you' : 'For everyone' }}</span> 
                     </div>
                  </div>
               </div>
               <div class="playlist__actions playlist-actions">
                  <action-button @click="$store.dispatch('player/addAlbumToPlayList', playlist)">
                     <svg width="320" height="384" viewBox="0 0 320 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M309.2 168.9L30.8 3.2C27.4 1.2 23.9 0 19.9 0C9 0 0.0999985 9 0.0999985 20H0V364H0.0999985C0.0999985 375 9 384 19.9 384C24 384 27.4 382.6 31.1 380.6L309.2 215.1C315.8 209.6 320 201.3 320 192C320 182.7 315.8 174.5 309.2 168.9Z" fill="black"/>
                     </svg>
                     <span>Play</span>
                  </action-button>
                  <action-button class="playlist-actions__edit" @click="isTeleportOpen = true">
                     <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 28.4999V35.9999H7.5L29.63 13.8699L22.13 6.36988L0 28.4999ZM35.41 8.08988C36.19 7.30988 36.19 6.03988 35.41 5.25988L30.74 0.589883C29.96 -0.190117 28.69 -0.190117 27.91 0.589883L24.25 4.24988L31.75 11.7499L35.41 8.08988Z" fill="black"/>
                     </svg>
                     <span>Edit</span>
                  </action-button>
               </div>
               <div class="playlist__tracks playlist-tracks">
                 <album-playlist :tracks="playlist.track" /> 
               </div>
            </div>
         </div>
      </div>
   </main>
   <Teleport to="#modalUpdate">
      <transition name="modals">
         <div class="modal-wrapper" v-if="isTeleportOpen" >
            <modal-update ref="modalUpdate" @closeTeleport="isTeleportOpen = false" :playlist="playlist" @update="update"/>
         </div>
      </transition> 
   </Teleport>
   <transition name="modals">
      <modal-added v-if="$store.state.isAdded" />
   </transition>
   <album-loader v-if="$store.state.is_loading" />
</template>
<script>

import ActionButton from '@/components/UI/ActionButton.vue'
import AlbumPlaylist from '@/components/AlbumPlaylist.vue'
import ModalAdded from '@/components/ModalAdded.vue'
import ModalUpdate from '@/components/ModalUpdate.vue'
import AlbumLoader from '@/components/UI/AlbumLoader.vue'

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { playlistRetrieve } from '@/use/playlistRetrieve'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
 
 export default {
    components: {
       ActionButton,
       AlbumPlaylist,
       ModalAdded,
       AlbumLoader,
       ModalUpdate
    },
    setup() {
      const route = useRoute()
      const store = useStore()
      const isTeleportOpen = ref(false)
      const modalUpdate = ref(null)

      const { playlist, bgColor, background } = playlistRetrieve(route.params.id)

      const update = async () => {
         const config = {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }
         try {
            store.dispatch('setLoadingTrue')
            await axios.get(`https://irohaxi.site/api/v1/playlist/${route.params.id}`, config)
            .then(response => {
               playlist.value = response.data
            })
            } catch (error) {
               console.log(error);
               store.dispatch('setLoadingFalse')
            } finally {
               store.dispatch('setLoadingFalse')
            }
      }
      onMounted(() => {
         store.dispatch('getPlaylists')
      })

      onClickOutside(modalUpdate, () => {
         isTeleportOpen.value = false
      })

      return {
         playlist,
         bgColor,
         background,
         isTeleportOpen,
         modalUpdate,
         update,
      }
    }
 }
 </script>
 
 <style lang="scss" scoped>
 svg {
    width: 24px;
    height: 24px;
    path {
       fill: $white;
    }
 }
 .playlist {
    background: #0d0d13;
       // .playlist__container
       &__wrapper {
         min-height: 100vh;
         transition: all 0.4s ease 0s;
       }
       // .playlist__container
       &__container {}
       // .playlist__body
       &__body {
         padding: 100px 0px 320px 0px;
       }
       // .playlist__info
       &__info {}
       // .playlist__actions
       &__actions {}
       // .playlist__tracks
       &__tracks {}
 }
 .playlist-info {
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    @media (max-width: 375px){
       flex-direction: column;
       align-items: flex-start;
    }
       // .playlist-info__left
       &__left {
          flex: 1 0 30%;
          display: flex;
          flex-direction: column;
        
       }
       // .playlist-info__img
       &__img {
          position: relative;
          padding: 0px 0px 100% 0px;
          min-height: 130px;
          min-width: 130px;
          img {
             position: absolute;
             top: 0;
             left: 0;
             height: 100%;
             width: 100%;
             object-fit: cover;
             border-radius: 15px;
          }
       
       }
       
       // .playlist-info__right
       &__right {
          flex: 1 0 50%;
          @media (max-width: 768px){
             margin-top: 20px;
          }
          @media (max-width: 375px){
            justify-content:center;align-items: center;
          }
       }
       // .playlist-info__name
       &__name {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        
          @media (max-width: 480px){
             margin-bottom: 5px;
             font-size: 18px;
          }
       }

       // .playlist-info__description
       &__description {
         &:not(:last-child) {margin-bottom: 10px;}
         //  @media (max-width: 768px){
         //       display: none;
         //  }
       }
 }
 .playlist-actions {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 30px;
    row-gap: 10px;
    @media (max-width: 375px){
      justify-content: center;
   }
       // .playlist-actions__play
       &__play {}
       // .playlist-actions__edit
       &__edit {
       }

 }
 .playlist-tracks {
    margin-top: 20px;
    padding-top: 20px;
    color: grey;
 }
 </style>