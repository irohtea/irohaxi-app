<template>
   <div class="album">
      <div class="album__body">
         <div class="album__img">
            <router-link :to="`/album/${album.id}`">
               <img :src="album.poster" alt="Song Poster">
            </router-link>
               <div class="album__controls controls" @click.stop="openDialog">
                  <button class="controls__more">
                     <svg width="6" height="32" viewBox="0 0 6 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.99961 32C2.33294 32 1.76627 31.7667 1.29961 31.3C0.832942 30.8333 0.599609 30.2667 0.599609 29.6C0.599609 28.9333 0.832942 28.3667 1.29961 27.9C1.76627 27.4333 2.33294 27.2 2.99961 27.2C3.66628 27.2 4.23294 27.4333 4.69961 27.9C5.16628 28.3667 5.39961 28.9333 5.39961 29.6C5.39961 30.2667 5.16628 30.8333 4.69961 31.3C4.23294 31.7667 3.66628 32 2.99961 32ZM2.99961 18.4C2.33294 18.4 1.76627 18.1667 1.29961 17.7C0.832942 17.2333 0.599609 16.6667 0.599609 16C0.599609 15.3333 0.832942 14.7667 1.29961 14.3C1.76627 13.8333 2.33294 13.6 2.99961 13.6C3.66628 13.6 4.23294 13.8333 4.69961 14.3C5.16628 14.7667 5.39961 15.3333 5.39961 16C5.39961 16.6667 5.16628 17.2333 4.69961 17.7C4.23294 18.1667 3.66628 18.4 2.99961 18.4ZM2.99961 4.8C2.33294 4.8 1.76627 4.56667 1.29961 4.1C0.832942 3.63333 0.599609 3.06667 0.599609 2.4C0.599609 1.73333 0.832942 1.16667 1.29961 0.7C1.76627 0.233333 2.33294 0 2.99961 0C3.66628 0 4.23294 0.233333 4.69961 0.7C5.16628 1.16667 5.39961 1.73333 5.39961 2.4C5.39961 3.06667 5.16628 3.63333 4.69961 4.1C4.23294 4.56667 3.66628 4.8 2.99961 4.8Z" fill="black"/>
                     </svg>
                  </button>
                  <button class="controls__play">
                     <svg width="320" height="384" viewBox="0 0 320 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M309.2 168.9L30.8 3.2C27.4 1.2 23.9 0 19.9 0C9 0 0.0999985 9 0.0999985 20H0V364H0.0999985C0.0999985 375 9 384 19.9 384C24 384 27.4 382.6 31.1 380.6L309.2 215.1C315.8 209.6 320 201.3 320 192C320 182.7 315.8 174.5 309.2 168.9Z" fill="black"/>
                     </svg>
                  </button>
               </div>
            </div>
            <div class="album__info">
               <div class="album__name">
                  {{ album.name }}
               </div>
               <div class="album__band">
                 <span>Album</span> &middot; {{ album.band }}
               </div>
            </div>
         </div>
         <div class="album__dialog dialog" v-if="isDialog">
            <div class="dialog__body" @click.stop>
               <div class="dialog__btn">btn</div>
               <div class="dialog__btn">btn</div>
            </div>
         </div>
    </div>
</template>

<script>

import { ref } from 'vue'

export default {
   name: 'my-album',
   props: {
      album: {
         type: Object,
         required: true,
      },
   },
   setup() {
      const isDialog = ref(false)
      const openDialog = () => {
         isDialog.value = !isDialog.value
      }
      return {
         isDialog,
         openDialog,
      }
   },
  
}
</script>
<style lang="scss" scoped>
.album {
   position: relative;
   display: grid;
   justify-items: center;
   margin: 0 auto;
   // .album__body
   &__body {
      position: relative;
      &:hover {
         .controls {
            opacity: 1;
         }
         .album__img {
         }
         .controls__more {
         }
         .controls__play {
         }
      }
   }
   // .album__img
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
   // .album__info
   &__info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
   }
   // .album__name
   &__name {
      font-weight: 700;
      color: #fff;
   }
   // .album__band
   &__band {
      font-size: 14px;
   }
   // .album__controls
   &__controls {

   }
   // .album__author
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
		&__play {
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

}

.dialog {
      position: absolute;
      top: 18%;
      right: -10%;
      z-index: 5;
		// .dialog__body
		&__body {
         padding: 20px;
         background-color: rgb(33, 33, 33, 0.95);
      }
		// .dialog__btn
		&__btn {}
}

</style>