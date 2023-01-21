<template>
   <div class="track" @click="$store.dispatch('player/addToPlayList', {track})">
      <div class="track__body">
         <div class="track__img">
            <img :src="track.song_poster" alt="Song Poster">
            <div class="track__controls">X</div>
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
export default {
   name: 'my-track',
   props: {
      track: {
         type: Object,
         required: true,
      }
   }
}
</script>
<style lang="scss">
.track {
   display: grid;
   justify-items: center;
   margin: 0 auto;
   // .track__body
   &__body {
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
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
   }
   // .track__author
   &__author {

   }

}
.album-tracks {

   .track {
      display: flex;
      max-width: 100%;
      transition: all 0.3s ease 0s;
      cursor: pointer;
      // border-bottom: 1px solid $grey;
      border-bottom: 2px solid rgba(255, 255, 255, 0.09);
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
         display: none;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translateX(-50%);
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