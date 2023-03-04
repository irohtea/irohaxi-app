<template>
   <div class="playlists__items">
       <router-link to="/upload-playlist">
         <add-button>Playlists</add-button>
       </router-link>
       <my-playlist
       v-for="playlist in playlists" 
       :key="playlist.id"
       :playlist="playlist" 
       />
   </div>
   <my-loader v-if="$store.state.is_loading" class="library__loader"></my-loader>
 </template>
 
 <script>
 import AddButton from '@/components/UI/AddButton.vue';
 import MyPlaylist from '@/components/MyPlaylist.vue'
 import MyLoader from '@/components/UI/MyLoader.vue'
 
 import { userPlaylists } from '@/use/userPlaylists'
 
 export default {
   name: 'library-albums',
   components: { 
     MyPlaylist,
     AddButton,
     MyLoader
   },
 
   setup() {
 
     const { playlists } = userPlaylists()
 
     return {
      playlists
     }
   }
 }
 </script>
 
 <style lang="scss" scoped>
 .playlists {
      // .playlists__items
    &__items {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
      @media (max-width: 768.98px){
        grid-template-columns: 1fr;
      }
    }
 }
 </style>