<template>
   <div class="playlist__list">
      
      <div class="playlist__item item" 
         v-for="track in playlist" 
         :key="track.id"
         :class="[
         {playing: $store.state.player.playlist.length > 0 
         && $store.state.player.currentTrack.id === track.id
         && $store.state.player.isPlaying},
         
         {paused: $store.state.player.playlist.length > 0 
         && $store.state.player.currentTrack.id === track.id
         && !$store.state.player.isPlaying}
      ]">
         <div class="item__body">
            <div class="item__img">
               <img :src="track.song_poster" :alt="track.name">
               <div class="item__controls controls">
               <button class="controls__play">
                  <play-button @click="$store.dispatch('player/changeTrack', track)" />
               </button>
               <button class="controls__pause">
                  <pause-button @click="$store.dispatch('player/setPause', false)" />
               </button>
            </div>
            </div>
            <div class="item__info">
               <div class="item__name">{{ track.name }}</div>
               <div class="item__band">{{ track.track_author }}</div>
            </div>
            <button class="item__more">
                 <more-button />
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue';
import PauseButton from '@/components/UI/Controls/PauseButton.vue';
import MoreButton from '@/components/UI/Controls/MoreButton.vue';

import { useStore } from 'vuex'
import { computed } from 'vue'

   export default {
      components: {
         PlayButton,
         PauseButton,
         MoreButton,
      },
      setup() {
         const store = useStore()

         return {
            playlist: computed(() => store.state.player.playlist),

         }
      }
   }
</script>

<style lang="scss" scoped>
.playlist {
		// .playlist__list
		&__list {
         display: flex;
         flex-direction: column;
         gap: 15px;
      }
		// .playlist__item
		&__item {}
}
.item {
   transition: all 0.3 ease;
   border-radius: 5px;
   &.playing {
      background: rgba(34, 35, 38, 0.9);
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
      background: rgba(34, 35, 38, 0.9);
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
   // .item__body
   &__body {
      display: flex;
      gap: 10px;
      align-items: center;
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
   // .item__img
   &__img {
      position: relative;
      flex: 0 0 100px;
      height: 100px;
      @media (max-width: 425px){
         flex: 0 0 70px;
         height: 70px;
      }
      @media (max-width: 375px){
         display: none;
      }
      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
         border-radius: 5px;
        
      }
   }
   // .item__info
   &__info {
      flex: 1 1 100%;
   }
   // .item__name
   &__name {
   }
   
   // .item__band
   &__band {}
   // .item__controls 
   &__controls {
      border-radius: 0px;
   }
   // .controls__more
   &__more {
      display: flex;
      pointer-events: all;
      margin-right: 15px;
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
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   pointer-events: none;
   opacity: 0;
   background: linear-gradient(180deg, rgba(25, 24, 38, 0.407) 60%, rgba(74, 111, 181, 0.283));
   transition: all 0.2s ease 0s;
   @media (max-width: 375px){
      position: static;
      display: block;
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
</style>