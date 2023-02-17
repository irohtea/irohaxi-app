<template>
   <div class="album-track" 
      :class="[
      {playing: $store.state.player.playlist.length > 0 
      && $store.state.player.currentTrack.id === track.id
      && $store.state.player.isPlaying},
      
      {paused: $store.state.player.playlist.length > 0 
      && $store.state.player.currentTrack.id === track.id
      && !$store.state.player.isPlaying}
   ]">
      <div class="album-track__body">
         <div class="album-track__img">
            <img :src="track.song_poster" :alt="track.name">
            <div class="album-track__controls controls">
            <button class="controls__play">
               <play-button @click="$store.dispatch('player/changeTrack', track)" />
            </button>
            <button class="controls__pause">
               <pause-button @click="$store.dispatch('player/setPause', false)" />
            </button>
         </div>
         </div>
         <div class="album-track__info">
            <div class="album-track__name">{{ track.name }}</div>
            <div class="album-track__band">{{ track.track_author }}</div>
         </div>
         <button class="album-track__more">
               <more-button />
         </button>
      </div>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue';
import PauseButton from '@/components/UI/Controls/PauseButton.vue';
import MoreButton from '@/components/UI/Controls/MoreButton.vue';

export default {
   components: {
      PlayButton,
      PauseButton,
      MoreButton,
   },
   props: {
      track: {
         type: Object,
         required: true,
      }
   },
   setup () {
      

      return {}
   }
}
</script>

<style lang="scss" scoped>
.album-track {
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
   // .album-track__body
   &__body {
      display: flex;
      gap: 10px;
      align-items: center;
      &:hover {
         transition: all 0.3 ease;
         background: rgba(34, 35, 38, 0.9);
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