<template>
   <transition name="slide">
      <div class="player-extended">
            <div class="player-extended__wrapper">
               <div class="player-extended__current current-track">
                  <div class="current-track__body">
                     <div class="current-track__img">
                        <img :src="currentTrack ? currentTrack.song_poster : ''" :alt="currentTrack ? currentTrack.name : ''">
                     </div>
                  </div>
               </div>
               <div class="player-extended__tabs tabs">
                 <div class="tabs__body">
                     <div class="tabs__navigation">
                        <tab-button class="tabs__button" v-for="tab in tabs" :key="tab" @click="comp = tab.component">
                           {{ tab.text }}
                        </tab-button>
                     </div>
                     <div class="tabs__content">
                        <keep-alive>
                           <component :is="comp"/>
                        </keep-alive>
                     </div>
                 </div>
               </div>
            </div>
      </div>
   </transition>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import PlayerPlaylist from '@/components/PlayerPlaylist.vue'
import TrackText from '@/components/TrackText.vue'
import TabButton from '@/components/UI/TabButton.vue'


   export default {
      components: {
         PlayerPlaylist,
         TrackText,
         TabButton
      },
      setup() {
         const store = useStore()
         
         const tabs = ref(
         [
            {text: 'Playlist', component: 'PlayerPlaylist'},
            {text: 'Lyrics', component: 'TrackText'}
         ])

         const comp = ref('PlayerPlaylist')

         return {
            tabs,
            comp,
            currentTrack: computed(() => store.state.player.currentTrack),

         }
      }
   }
</script>

<style lang="scss" scoped>
.player-extended {
   display: flex;
   position: fixed;
   z-index: 205;
   left: 0;
   overflow-y: scroll;
   width: 100vw;
   height: calc(100vh - 100px);
   backdrop-filter: blur(1px);
   -webkit-backdrop-filter: blur(1px);
   background: linear-gradient(90deg, rgba(49, 71, 112, 0.9) 0%, rgba(11, 10, 16, 0.9) 100%);
   box-shadow: 0 8px 32px rgb(2, 4, 24);
   transition: 0.2s ease-out;
   @media (max-width: 768px){
      height: calc(100vh - 90px);
   }
   // .player-extended__container
   &__box {
   }
   // .player-extended__wrapper
   &__wrapper {
      position: relative;
      display: flex;
      // justify-content:center;
      gap: 30px;
      width: 100%;
      height: 100vh;
      z-index: 15;
      padding: 50px 15px;
      @media (max-width: 768px){
         flex-direction: column;
      }
   }
   // .player-extended__current
   &__current {
      flex: 0 1 50%;
      @media (max-width: 768px){
          flex: 0 1 10%;
      }
   }
   // .player-extended__tabs
   &__tabs {
      flex: 0 1 50%;
   }
}
.current-track {
   // .current-track__body
   &__body {
      // flex: 1 0 30%;
      display: flex;
      flex-direction: column;
      @media (max-width: 768px){
           align-items: center;
      }
   }
   // .current-track__img
   &__img {
      min-height: 260px;
      min-width: 260px;
      img {
         max-width: 100%;
         height: 100%;
         width: 100%;
         object-fit: cover;
         box-shadow: 0 0 25px $darkBlue;
         @media (max-width: 768px){
            height: 260px;
            width: 260px;
         }
      }
   }
}
.tabs {
		// .tabs__body
		&__body {
         display: flex;
         flex-direction: column;
         gap: 20px;
      }
		// .tabs__navigation
		&__navigation {
         display: flex;
         justify-content:center;
         align-items: center;
         flex-wrap: wrap;
         gap: 20px;
         border-bottom: 1px solid $grey;
         border-radius: 2px;
      }
		// .tabs__button
		&__button {
         color: $white;
      }
		// .tabs__content
		&__content {
         padding: 15px 25px;
         border-radius: 10px;
         background-color: rgba(13, 13, 19, 0.797);
         max-height: 600px;
         overflow: hidden;
         overflow-y: scroll;
         box-shadow: 0 0 25px $darkBlue;
         @media (max-width: 768){
            max-height: 100%;
            overflow: hidden;
            overflow-y: scroll;
         }
      }
}

</style>