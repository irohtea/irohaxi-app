<template>
   <transition name="slide">
      <main class="player-extended">
            <div class="player-extended__wrapper">
               <div class="player-extended__current current-track">
                  <div class="current-track__body">
                     <div class="current-track__img">
                        <img :src="currentTrack ? currentTrack.song_poster : ''" :alt="currentTrack ? currentTrack.name : ''">
                     </div>
                     <div class="current-track__info">
                        <!-- <div class="current-track__name">{{ currentTrack ? currentTrack.name : ''}}</div>
                        <div class="current-track__band">{{ currentTrack ? currentTrack.track_author : ''}}</div> -->
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
      </main>
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
   backdrop-filter: blur(1px);
   -webkit-backdrop-filter: blur(1px);
   background: linear-gradient(90deg, rgba(49, 71, 112, 0.9) 0%, rgba(11, 10, 16, 0.9) 100%);
   box-shadow: 0 8px 32px rgb(2, 4, 24);
   transition: 0.2s ease-out;
   padding: 50px 0px 150px 0;
        
   // .player-extended__container
   &__box {
   }
   // .player-extended__wrapper
   &__wrapper {
      position: relative;
      display: flex;
      justify-content:center;
      gap: 30px;
      z-index: 15;
      padding: 0px 60px 150px 60px;
      @media (max-width: 768px){
         flex-direction: column;
      }
   }
   // .player-extended__current
   &__current {
      flex: 0 1 80%;
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
   }
   // .current-track__img
   &__img {
      position: relative;
      padding: 0px 0px 70% 0px;
      min-height: 260px;
      min-width: 260px;
      img {
         // position: absolute;
         // top: 0;
         // left: 0;
         height: 100%;
         width: 100%;
         object-fit: cover;
      }
   }
   // .current-track__info
   &__info {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 10px;
   }
   // .current-track__name
   &__name {
      font-weight: 700;
      font-size: 24px;
   }
   // .current-track__band
   &__band {
      font-size: 18px;
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
      }
}

</style>