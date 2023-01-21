<template>
   <div class="player">
      <div class="player__wrapper">
         <div class="player__controls player-controls" >
            <button class="player-controls__btn">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 17L10 12L18 7V17Z" fill="black"/>
                  <path d="M6 7H9V17H6V7Z" fill="black"/>
               </svg>
            </button>
            <button class="player-controls__btn" v-if="isPlaying" @click="play">
               <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4.3301L0 8.6603V0L6 4.3301Z" fill="black"/>
               </svg>
            </button>
            <button class="player-controls__btn" v-else>
               <svg width="206" height="320" viewBox="0 0 206 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 0H0V320H60V0Z" fill="#252525"/>
                  <path d="M206 0H146V320H206V0Z" fill="#252525"/>
               </svg>
            </button>
            <button class="player-controls__btn">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 17L14 12L6 7V17Z" fill="black"/>
                  <path d="M18 7H15V12V17H18V7Z" fill="black"/>
               </svg>
            </button>
         </div>
         <div class="player__progress player-progress">
            <div class="player-progress__time">0:45 / 3:30</div>
         </div>
         <!-- <div class="player__track player-track">
            <div class="player-track__body">
               <div class="player-track__img">
                  <img :src="!currentTrack ? currentTrack.song_poster : ''" alt="Song Poster">
               </div>
               <div class="player-track__info">
                  <div class="player-track__name">{{ !currentTrack ? currentTrack.name : ''}}</div>
                  <div class="player-track__band">{{ !currentTrack ? currentTrack.track_author : ''}} &middot; {{ !currentTrack ? currentTrack.album.name : ''}} &middot; {{ !currentTrack ? currentTrack.album.release_year : '' }}</div>
               </div>
            </div>
         </div> -->
         <div class="player__actions player-actions">
            <button class="player-actions__btn">
               <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 12V24H8L18 34V1.99996L8 12H0ZM27 18C27 14.47 24.96 11.42 22 9.94996V26.06C24.96 24.58 27 21.53 27 18ZM22 0.459961V4.58996C27.78 6.30996 32 11.66 32 18C32 24.34 27.78 29.69 22 31.41V35.54C30.01 33.72 36 26.57 36 18C36 9.42996 30.01 2.27996 22 0.459961Z" fill="black"/>
               </svg>
            </button>
            <button class="player-actions__btn">
               <svg width="47" height="42" viewBox="0 0 47 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.465 33.95L16.707 25.707L15.293 24.293L7.051 32.535C6.105 33.48 4.85 34 3.515 34H0V36H3.515C5.384 36 7.142 35.272 8.465 33.95Z" fill="black"/>
                  <path d="M31.535 8.05003L23.293 16.293L24.707 17.707L32.949 9.46503C33.895 8.52003 35.15 8.00003 36.485 8.00003H42.586L38.293 12.293L39.707 13.707L46.414 7.00003L39.707 0.29303L38.293 1.70703L42.586 6.00003H36.485C34.616 6.00003 32.858 6.72803 31.535 8.05003Z" fill="black"/>
                  <path d="M7.051 9.464L31.535 33.95C32.858 35.272 34.616 36 36.485 36H42.586L38.293 40.293L39.707 41.707L46.414 35L39.707 28.293L38.293 29.707L42.586 34H36.485C35.15 34 33.894 33.48 32.949 32.536L8.465 8.05C7.142 6.728 5.384 6 3.515 6H0V8H3.515C4.85 8 6.105 8.52 7.051 9.464Z" fill="black"/>
               </svg>
            </button>
            <button class="player-actions__btn">
               <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10H28V16L36 8L28 0V6H4V18H8V10ZM28 30H8V24L0 32L8 40V34H32V22H28V30Z" fill="black"/>
               </svg>
            </button>
         </div>
      </div>
      <div class="player__bar player-bar">
         <div class="player-bar__current"></div>
      </div>
   </div>
</template>

<script>

import { ref} from 'vue'
import { useStore } from 'vuex'
export default {
   name: 'my-player',
   setup() {
      const store = useStore()

      const isPlaying = ref(true)
      const barWidth = ref(null)
      const duration = ref(null) 
      const currentTime = ref(null)
      const currentTrack = ref() 
      const playlist = ref([store.state.player.playlist])
      const currentTrackIndex = ref(0)
      // const tets = watch(() => {
      //    return currentTrack.value = playlist.value[0]
      // })
      // const tet2 = watch(() => {
      //    audio.src = currentTrack.value.song

      // })
      const audio = ref(new Audio())
      const play = () => {

      }
      return{
         audio,
         isPlaying,
         barWidth,
         duration,
         currentTime,
         playlist,
         currentTrack,
         currentTrackIndex,
         play,
         // tet2
      }
   }
}
</script>

<style lang="scss" scoped>

.player {
   display: none;
   // display: flex;
   align-items: center;
   position: fixed;
   bottom: 0;
   left: 0;
   z-index: 300;
   width: 100%;
		// .player__wrapper
		&__wrapper {
         position: relative;
         display: flex;
         align-items: center;
         gap: 10px;
         width: 100%;
         z-index: 15;
         height: 80px;
         padding: 0px 16px;
         backdrop-filter: blur(1px);
         -webkit-backdrop-filter: blur(1px);
         background-color: rgba(10, 10, 10, 0.9);
         box-shadow: 0 8px 32px rgb(2, 4, 24);
         transition: 0.2s ease-out;
      }
		// .player__controls
		&__controls {
      }
      // .player__progress
		&__progress {
         flex: 0 1 35%;
      }
		// .player__track
		&__track {
         flex: 1 1 30%;
      }
      // .player__actions
		&__actions {}
      // .player__bar
		&__bar {}
}
.player-controls {
   display: flex;
   gap: 15px;
   // .controls__btn
   &__btn {
      display: flex;
      justify-content:center;
      align-items: center;
      &:hover {
         svg {
            path {
               fill: $light;
            }
         }
      }
      svg {
         width: 30px;
         height: 30px;
         path {
            transition: all 0.3s ease 0s;
            fill: $white;
         }
      }
   }
}
.player-progress {
   display: flex;
   // justify-content:center;align-items: center;
		// .player-progress__time
		&__time {
         white-space: nowrap;
      }
}
.player-track {
   // .track__body
   // flex: 1 1 40%;
   &__body {
         display: flex;
         align-items: center;
      }
		// .track__img
		&__img {
         img {
            width: 50px;
            height: 50px;
            object-fit: cover;
         }
      }
		// .track__info
		&__info {}
		// .track__name
		&__name {}
		// .track__band
		&__band {}
}
.player-actions {
   display: flex;
   align-items: center;
   gap: 10px;
   // .player-actions__btn
   &__btn {
      svg {
         width: 30px;
         height: 30px;
         path {
            transition: all 0.3s ease 0s;
            fill: $white;
         }
      }
   }
}

.player-bar {
   position: absolute;
   top: 0;
   left: 0;
   z-index: 20;
   width: 100%;
   height: 2px;
   background: rgba(37, 37, 37, 0.9);
		// .player-bar__current
		&__current {
         width: 30%;
         height: 2px;
         background: $light;
      }
}

</style>