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
               <button class="controls__more">
                 <more-button />
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
      </div>
   </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue';
import PauseButton from '@/components/UI/Controls/PauseButton.vue';
import MoreButton from '@/components/UI/Controls/MoreButton.vue';


export default {
   name: 'my-track',
   components: {
      PlayButton,
      PauseButton,
      MoreButton,
   },
   props: {
      track: {
         type: Object,
         required: true,
      },
   },
}
</script>
<style lang="scss">

.track {
   display: grid;
   justify-items: center;
   margin: 0 auto;
   transition: all 0.3 ease;
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
   // .track__body
   &__body {
      position: relative;
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
      img {
         width: 200px;
         height: 200px;
         object-fit: cover;
         border-radius: 10px;
         transition: all 0.3s ease 0s;
      }
   }
   // .track__info
   &__info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
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
.album-tracks {

   .track {
      display: flex;
      max-width: 100%;
      transition: all 0.3s ease 0s;
      cursor: pointer;
      border-bottom: 2px solid rgba(255, 255, 255, 0.09);
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
      &:last-child {
         border-bottom: none;
      }
      &:hover{
         background-color: rgba(255, 255, 255, 0.09);              
      }
      &__body {
         display: flex;
         align-items: center;
         gap: 15px;
         padding: 10px;
      }
      // .track__img
      &__img {
         position: relative;
         width: 80px;
         height: 80px;
         @media (max-width: 425px){
             width: 40px;           
             height: 40px;
         }
         img {
            width: 100%;            
            height: auto;
            object-fit: cover;
            border-radius: 0px;
         }
      }
      // .track__info
      &__info {
         display: flex;
         flex-direction: column;
         gap: 5px;
         margin-top: 10px;
      }
      // .track__name
      &__name {
         font-weight: 700;
         color: #fff;
       
      }
      // .track__controls
      &__controls {
         position: absolute;
         left: 50%;
         transform: translateX(-50%);
         border-radius: 0px;
      }
      // .track__author
      &__author {
         white-space: nowrap;
         @media (max-width: 425px){
             white-space: normal; 
         }
      }
   }
}
</style>