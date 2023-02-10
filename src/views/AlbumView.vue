<template>
  <main class="album" :style="background">
   <div class="album__container">
      <div class="album__body" >
         <div class="album__info album-info" >
            <div class="album-info__left">
               <div class="album-info__img">
                  <img :src="album.poster" :alt="album.name">
               </div>
            </div>
            <div class="album-info__right">
               <div class="album-info__name">{{ album.name }}</div>
               <div class="album-info__band">
                 Author &ndash; <span>{{ album.band }}</span> 
               </div>
               <div class="album-info__year">
                 Album &middot; 2022
               </div>
               <div class="album-info__description">
                  <p>{{ album.description }}</p>
               </div>
               <div class="album-info__genre-list">
                  <div class="album-info__genre-item" v-for="genre in album.genre" :key="genre.id">
                     {{ genre.name }}
                  </div>
               </div>
            </div>
         </div>
         <div class="album__actions album-actions">
            <action-button @click="$store.dispatch('player/addAlbumToPlayList', album)">
               <svg width="320" height="384" viewBox="0 0 320 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M309.2 168.9L30.8 3.2C27.4 1.2 23.9 0 19.9 0C9 0 0.0999985 9 0.0999985 20H0V364H0.0999985C0.0999985 375 9 384 19.9 384C24 384 27.4 382.6 31.1 380.6L309.2 215.1C315.8 209.6 320 201.3 320 192C320 182.7 315.8 174.5 309.2 168.9Z" fill="black"/>
               </svg>
               <span>Play</span>
            </action-button>
            <!-- <action-button>
               <svg width="47" height="42" viewBox="0 0 47 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.465 33.95L16.707 25.707L15.293 24.293L7.051 32.535C6.105 33.48 4.85 34 3.515 34H0V36H3.515C5.384 36 7.142 35.272 8.465 33.95Z" fill="black"/>
                  <path d="M31.535 8.05003L23.293 16.293L24.707 17.707L32.949 9.46503C33.895 8.52003 35.15 8.00003 36.485 8.00003H42.586L38.293 12.293L39.707 13.707L46.414 7.00003L39.707 0.29303L38.293 1.70703L42.586 6.00003H36.485C34.616 6.00003 32.858 6.72803 31.535 8.05003Z" fill="black"/>
                  <path d="M7.051 9.464L31.535 33.95C32.858 35.272 34.616 36 36.485 36H42.586L38.293 40.293L39.707 41.707L46.414 35L39.707 28.293L38.293 29.707L42.586 34H36.485C35.15 34 33.894 33.48 32.949 32.536L8.465 8.05C7.142 6.728 5.384 6 3.515 6H0V8H3.515C4.85 8 6.105 8.52 7.051 9.464Z" fill="black"/>
               </svg>
               <span>Mix</span>
            </action-button> -->
         </div>
         <div class="album__tracks album-tracks">
            <my-track 
            v-for="track in album.track" 
            :key="track.id"
            :track="track"
            />
         </div>
      </div>
   </div>
  </main>
</template>
<script>

import { useRoute } from 'vue-router'
import MyTrack from '@/components/MyTrack.vue'

import ActionButton from '@/components/UI/ActionButton.vue'
import { albumRetrieve } from '@/use/albumRetrieve'

export default {
   components: {
      MyTrack,
      ActionButton
   },
   setup() {
      const route = useRoute()
     
      const { album, bgColor, background } = albumRetrieve(route.params.id)

      return {
         album,
         bgColor,
         background
      }
   }
}
</script>

<style lang="scss" scoped>
svg {
   width: 24px;
   height: 24px;
   path {
      fill: $white;
   }
}
.album {
   background: #0d0d13;
		// .album__container
		&__container {}
		// .album__body
		&__body {
         padding: 40px 0;
      }
		// .album__info
		&__info {}
		// .album__actions
		&__actions {}
		// .album__tracks
		&__tracks {}
}
.album-info {
   // background: linear-gradient(90deg, #0d0d13 50%, rgb(23, 49, 71, 0.5));
   border-radius: 10px;
   display: flex;
   align-items: center;
   gap: 20px;

		// .album-info__left
		&__left {
         flex: 1 0 30%;
         display: flex;
         flex-direction: column;
      }
		// .album-info__img
		&__img {
         position: relative;
         padding: 0px 0px 100% 0px;
         min-height: 160px;
         min-width: 160px;
         img {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 15px;
         }
      }
      
		// .album-info__right
		&__right {
         flex: 1 0 50%;
         @media (max-width: 768px){
            margin-top: 20px;
         }
      }
      // .album-info__name
      &__name {
         font-size: 24px;
         font-weight: 700;
         letter-spacing: 1.5px;
         margin-bottom: 20px;
         @media (max-width: 480px){
            margin-bottom: 5px;
            font-size: 18px;
         }
      }
      // .album-info__band
      &__band {
         font-size: 18px;
         font-weight: 700;
         margin-bottom: 10px;
         span {
            text-decoration: underline;
         }
      }
      // .album-info__year
      &__year {
         margin-bottom: 10px;
      }
		// .album-info__description
		&__description {
         @media (max-width: 768px){
              display: none;
         }
      }
		// .album-info__genre-list
		&__genre-list {
         display: flex;
         flex-wrap: wrap;
      }
		// .album-info__genre-item
		&__genre-item {
         margin-top: 15px;
         padding: 10px;
         border: 1px solid $grey;
         border-radius: 5px;
      }

}
.album-actions {
   margin-top: 20px;
   display: flex;
   flex-wrap: wrap;
   column-gap: 30px;
   row-gap: 10px;
   // justify-content: space-between;
		// .album-actions__play
		&__play {}
}
.album-tracks {
   margin-top: 20px;
   padding-top: 20px;
   color: grey;
}


</style>