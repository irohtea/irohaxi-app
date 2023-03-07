<template>
   <transition name="fade">
      <div class="player" v-if="playlist.length > 0">
         <div class="player__wrapper" @click.self="$store.dispatch('player/openExtended', isExtended = !isExtended)">
            <div class="player__track player-track">
               <div class="player-track__body" >
                  <div class="player-track__img">
                     <img :src="currentTrack ? currentTrack.song_poster : ''" alt="Song Poster">
                  </div>
                  <div class="player-track__info">
                     <div class="player-track__name">{{ currentTrack ? currentTrack.name : ''}}</div>
                     <div class="player-track__band">{{ currentTrack ?  currentTrack.track_author : '' }}
                     </div>
                  </div>
               </div>
            </div>
            <div class="player__controls player-controls" >
               <button class="player-controls__btn prev-btn" @click="prev">
                  <player-prev />
               </button>
               <button class="player-controls__btn play-btn"  @click="play">
                  <player-play v-if="!isPlaying"/>
                  <player-pause v-else/>
               </button>
               <button class="player-controls__btn next-btn" @click="next">
                  <player-next />
               </button>
            </div>
            <div class="player__actions player-actions">
               <div class="player-actions__item" @mouseenter="showVolume = !showVolume" @mouseleave="showVolume = !showVolume">
                  <transition name="fade">
                     <div class="player-actions__box volume" v-show="showVolume">
                        <input type="range" min="0" max="1" step="0.01" v-model.number="volume">
                     </div>
                  </transition>
                  <button class="player-actions__btn">
                     <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 12V24H8L18 34V1.99996L8 12H0ZM27 18C27 14.47 24.96 11.42 22 9.94996V26.06C24.96 24.58 27 21.53 27 18ZM22 0.459961V4.58996C27.78 6.30996 32 11.66 32 18C32 24.34 27.78 29.69 22 31.41V35.54C30.01 33.72 36 26.57 36 18C36 9.42996 30.01 2.27996 22 0.459961Z" fill="black"/>
                     </svg>
                  </button>
               </div>
               <button class="player-actions__btn chevron-btn" :class="{ rotate: $store.state.player.isExtended }" @click="$store.dispatch('player/openExtended', isExtended = !isExtended)">
                  <svg width="768" height="384" viewBox="0 0 768 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0 0L383.75 383.75L767.5 0H0Z" fill="black"/>
                  </svg>
               </button>
            </div>
            <div class="player__progress player-progress">
               <div class="player-progress__time">{{ currentTime }}</div>
               <div class="player-progress__time">{{ duration }}</div>
            </div>
         </div>
         <div class="player__bar player-bar" @click="clickProgress" ref="progress">
            <div class="player-bar__current" :style="{ width : progressWidth }"></div>
            <div class="player-bar__circle"></div>
         </div>
      </div>
   </transition>
</template>

<script>
import PlayerPlay from '@/components/UI/Player/PlayerPlay.vue'
import PlayerPause from '@/components/UI/Player/PlayerPause.vue'
import PlayerPrev from '@/components/UI/Player/PlayerPrev.vue'
import PlayerNext from '@/components/UI/Player/PlayerNext.vue'

import { computed, ref, watch, watchEffect, } from 'vue'
import { useStore } from 'vuex'

export default {
   name: 'my-player',
   components: {
      PlayerPlay,
      PlayerPause,
      PlayerPrev,
      PlayerNext,
   },
   setup() {
      const store = useStore()
      const audio = new Audio()
      
      const isPlaying = ref(false)
      const isLoading = ref(false)
      const isExtended = ref(false)
      const showVolume = ref(false)

      const playlist = ref([])
      const progressWidth = ref('')
      const currentTrack = ref({})
      const songIndex = ref(0)
      const audioSrc = ref('')
      const currentTime = ref('00:00')  
      const duration = ref('00:00')
      const volume = ref(0.5)
      
      audio.volume = volume.value
      // Current and duration time
      audio.ontimeupdate = function() {
         progressWidth.value = (100 / audio.duration) * audio.currentTime + '%'
         let durmin = Math.floor(audio.duration / 60)
         let dursec = Math.floor(audio.duration - durmin * 60)
         let curmin = Math.floor(audio.currentTime / 60)
         let cursec = Math.floor(audio.currentTime - curmin * 60)

         if (durmin < 10) {
            durmin = '0' + durmin
         }
         if (dursec < 10) {
            dursec = '0' + dursec
         }
         if (curmin < 10) {
            curmin = '0' + curmin
         }
         if (cursec < 10) {
            cursec = '0' + cursec
         }

         duration.value = durmin + ':' + dursec
         currentTime.value = curmin + ':' + cursec
      };
      audio.onended = () => {
         next()
      }
      // Setting up current track src
      watchEffect(() => {
         const index = store.getters['player/songIndex']
         const playlist = store.getters['player/playlist']

         const current = playlist[index];
         
         if(current === []) {
            return
         } else {
            currentTrack.value = current
            store.dispatch('player/setCurrentTrack', currentTrack.value)
            audioSrc.value = currentTrack.value
         } 
      })

      watch(audioSrc, (newSrc) => {
         if(audioSrc.value === undefined) {
            audio.pause()
            isPlaying.value = false

         }
         else {
            audio.src = newSrc.song
            play()
            isPlaying.value = true
         }

      })
      // Volume upd
      watch(volume, (newVolume) => {
         audio.volume = newVolume
      })
      // Player controls 
      const play = () => {
         if(audio.src != '' && audio.paused) {
            isPlaying.value = true
            store.dispatch('player/setPause', true)
            audio.play()
         } else {
            isPlaying.value = false
            store.dispatch('player/setPause', false)
            audio.pause()
         }
      }
      watchEffect(() => {
         const data = store.getters['player/isPlaying']
         if(data === false) {
            isPlaying.value = false
            audio.pause()
         } else if(data === true) {
            isPlaying.value = true
            audio.play()
         }
       
      })

      const prev = () => {
         songIndex.value = store.getters['player/songIndex']
         if(songIndex.value  === 0) {
            store.commit('player/SET_INDEX', store.state.player.playlist.length - 1)
            currentTrack.value = playlist.value[songIndex.value]
            audio.play()
         } else {
            store.commit('player/SET_INDEX', songIndex.value  - 1)
            currentTrack.value = playlist.value[songIndex.value]
            audio.play()
         }
      }
      const next = () => {
         songIndex.value = store.getters['player/songIndex']
         if(songIndex.value === store.state.player.playlist.length - 1) {
            store.commit('player/SET_INDEX', 0)
            currentTrack.value = playlist.value[songIndex.value ]
            audio.play()
         } else {
            store.commit('player/SET_INDEX', songIndex.value  + 1)
            currentTrack.value = playlist.value[songIndex.value]
            audio.play()
         }
      }
      // Updating bar current time
      const updateBar = (x) => {
         let progress = document.querySelector('.player-bar')
         let maxduration = audio.duration
         let position = x - progress.offsetLeft
         let percentage = (100 * position) / progress.offsetWidth
         if (percentage > 100) {
            percentage = 100
         }
         if (percentage < 0) {
            percentage = 0
         }
         progressWidth.value = percentage + '%'
         audio.currentTime = (maxduration * percentage) / 100
         audio.play()
      }
      const clickProgress = (e) => {
         isPlaying.value = true
         audio.pause()
         updateBar(e.pageX)
      }
     
      return {
         playlist: computed(() => store.state.player.playlist),
         isChanged: computed(() => store.state.player.isChanged),
         currentTrack: computed(() => store.state.player.currentTrack),
         songIndex: computed(() => store.state.player.songIndex),
         audio,
         isPlaying,
         isLoading,
         isExtended,
         showVolume,
         audioSrc,
         currentTime,
         duration,
         updateBar,
         clickProgress,
         play,
         prev,
         next,
         volume,
         progressWidth,
      }
   }
}
</script>

<style lang="scss" scoped>

.player {
   display: flex;
   align-items: center;
   position: fixed;
   bottom: 0;
   left: 0;
   z-index: 300;
   width: 100%;
   &:hover {
      .player-bar {
         height: 5px;
      }

		.player-bar__current {
         height: 5px;
      }
		.player-bar__circle {
         opacity: 1;
         transform: scale(1);
      }

   }
   // .player__wrapper
   &__wrapper {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      width: 100%;
      z-index: 15;
      height: 100px;
      padding: 0px 32px;
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
      background: linear-gradient(90deg, rgba(49, 71, 112, 0.9) 0%, rgba(11, 10, 16, 0.9) 100%);
      box-shadow: 0 8px 32px rgb(2, 4, 24);
      transition: 0.2s ease-out;
      @media (max-width: 768px){
         height: 90px;
      }
      @media (max-width: 520px){
         padding: 0px 16px;
      }
   }
   // .player__track
   &__track {
      position: relative;
      z-index: 1;
      display: flex;
      gap: 20px;
      flex: 1 1 33.3333%;
      justify-content: flex-start;
      align-items: center;
      // @media (max-width:$){
         
      // }
      @media (max-width: 768px){
         flex: 1 1 40%;
      }

   }
   // .player__controls
   &__controls {
      position: relative;
      z-index: 1;
      flex: 1 1 33.3333%;
      justify-content:center;
      align-items: center;
      @media (max-width: 768px){
         justify-content: flex-end;
      }
   }
   
   // .player__actions
   &__actions {
      position: relative;
      z-index: 1;
      flex: 1 1 33.3333%;
      justify-content: flex-end;
      align-items: center;
      @media (max-width: 768px){
         flex: 1 1 0%;
      }
   }
   // .player__progress
   &__progress {
      // flex: 0 1 35%;
   }
   // .player__bar
   &__bar {}
}
.player-controls {
   display: flex;
   gap: 15px;
   padding: 10px 0px;
   border-radius: 5px;
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
         width: 50px;
         height: 50px;
         path {
            transition: all 0.3s ease 0s;
            fill: $white;
         }
         @media (max-width: 768px){
            width: 30px;
            height: 30px;
         }
      }
    
   }
}
.play-btn {
   svg {
      width: 55px;
      height: 55px;
      @media (max-width: 768px){
         width: 35px;
         height: 35px;
      }
   }
}
.mix-btn,
.repeat-btn {
   svg {
      width: 35px;
      height: 35px;
   }
   @media (max-width: 768px){
      width: 25px;
      height: 25px;
   }
   @media (max-width: 520px){
      display: none;
   }
}
.player-progress {
   display: flex;
   justify-content: space-between;
   position: absolute;
   padding: 0 16px;
   top: -22px;
   left: 0;
   width: 100%;
		// .player-progress__time
		&__time {
         white-space: nowrap;
         @media (max-width: 768px){
            display: none;
         }
      }
}
.player-track {
   // .track__body
   &__body {
         display: flex;
         align-items: center;
         gap: 15px;
         @media (max-width: 520px){
            gap: 0px;
         }
      }
		// .track__img
		&__img {
         img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            @media (max-width: 768px){
               width: 50px;
               height: 50px;
            }
            @media (max-width: 520px){
               display: none;
            }
         }
      }
		// .track__info
		&__info {
         display: flex;
         flex-direction: column;
         gap: 7px;
      }
		// .track__name
		&__name {
         color: $white;
         font-size: 18px;
         font-weight: 700;
         @media (max-width: 768px){
            font-size: 15px;
         }
      }
		// .track__band
		&__band {
         font-weight: 300;
         @media (max-width: 768px){
            font-size: 14px;
         }
      }
}
@keyframes trackText {
   0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-135%);
  }
}
.player-actions {
   display: flex;
   align-items: center;
   gap: 15px;
   // .player-actions__item
   &__item {
      display: flex;
      gap: 15px;
      align-items: center;
      padding: 15px 0;
      @media (hover: none) {
         visibility: hidden;
         display: none;
      }
   }
   // .player-actions__box
   &__box {
      display: flex;
      justify-content:center;
      align-items: center;
      transition: all 0.3s ease 0s;
   }

   // .player-actions__btn
   &__btn {
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
         @media (max-width: 768px){
            width: 25px;
            height: 25px;
         }
      }
   }
   .chevron-btn {
      position: relative;
      top: -2px;
      transform: rotate(180deg);
      transition: all 0.3s ease 0s;
      &.rotate {
         transform: rotate(0deg);
      }
   }
}
.player-bar {
   cursor: pointer;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 20;
   width: 100%;
   height: 4px;
   background-color: rgba(37, 37, 37, 0.9);
   display: flex;
   align-items: center;
		// .player-bar__current
		&__current {
         width: 0%;
         height: 4px;
         background-color : $light;
      }
      // .player-bar__circle
		&__circle {
         width: 10px;
         height: 10px;
         border-radius: 50%;
         background-color: #fff;
         transform: scale(0);
         opacity: 0;
         transition: all 0.3s ease 0s;
         @media (max-width: 768px){
            transform: scale(1);
            opacity: 1;
         }
      }
}
//========================================================================================================================================================
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

//========================================================================================================================================================

input[type="range"] {
   -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 150px;
}
/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}
/***** Chrome, Safari, Opera and Edge Chromium styles *****/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
   background-color: $grey;
   border-radius: 5px;
   height: 7px;  
}
/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; 
   appearance: none;
   margin-top: -5px;
   background-color: $white;
   height: 20px;
   width: 10px;
   border-radius: 1px;
   transition: all 0.3s ease 0s;
   &:hover {
      background-color: #fff;
   }
}
/******** Firefox styles ********/
/* slider track */
input[type="range"]::-moz-range-track {
   background-color: $grey;
   border-radius: 0.5rem;
   height: 0.5rem;
}
/* slider thumb */
input[type="range"]::-moz-range-thumb {
   border: none; 
   margin-top: -5px;
   background-color: $white;
   height: 20px;
   width: 10px;
   border-radius: 1px;
   transition: all 0.3s ease 0s;
   &:hover {
      background-color: #fff;
   }
}

</style>