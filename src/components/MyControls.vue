<template>
      <div class="controls">
         <button class="controls__more">
            <slot name="more"></slot>
         </button>
         <button class="controls__play">
            <slot name="play"></slot>
         </button>
         <button class="controls__pause">
            <slot name="pause"></slot>
         </button>
      </div>
</template>


<style lang="scss" scoped>
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
   @media (hover: none) {
      background: linear-gradient(180deg, rgba(25, 24, 38, 0.250) 60%, rgba(74, 111, 181, 0.183));
      opacity: 1;
   }

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
.track,
.album,
.playlist,
.album-track,
.playlist-track {

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

}

</style>