<template>
  <main class="home">
    <div class="home__container">
      <div class="home__albums">
         <section class="albums__slider">
            <div>
               <button @click="next">Next</button>
               <button @click="prev">Prev</button>
            </div>
            <carousel :settings="settings" :breakpoints="breakpoints" class="test" ref="myCarousel">
               <slide v-for="album in popularAlbums" :key="album.id">
                  <div class="album"
                  :class="[
                  {playing: $store.state.player.playlist.length > 0 
                  && $store.state.player.albumId === album.id
                  && $store.state.player.isPlaying},
                  
                  {paused: $store.state.player.playlist.length > 0 
                  && $store.state.player.albumId === album.id
                  && !$store.state.player.isPlaying}
               ]">
                  <div class="album__body">
                     <div class="album__img">
                        <router-link :to="`/album/${album.id}`">
                           <img :src="album.poster" alt="Song Poster">
                        </router-link>
                           <div class="album__controls controls">
                              <button class="controls__more" >
                                 <more-button />
                              </button>
                              <button class="controls__play" >
                                 <play-button @click="$store.dispatch('player/addAlbumToPlayList', album)" />
                              </button>
                              <button class="controls__pause" >
                                 <pause-button @click="$store.dispatch('player/setPause', false)" />
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
                        <div class="dialog__body">
                           <div class="dialog__items">
                              <button class="dialog__btn" @click="deleteAlbum(album.id)">Delete</button>
                              <button class="dialog__btn">Delete</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </slide>
            </carousel>
         </section>
      </div>
    </div>  
  </main>
</template>
<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide,  } from 'vue3-carousel'

import { onMounted, ref, } from 'vue'
import axios from 'axios';
  export default {
    components: {
      Carousel,
      Slide,
    },
    setup() {

      const popularAlbums = ref([])
      const myCarousel = ref(null)
      const next = () => {
         myCarousel.value.next()
      }
      const prev = () => {
         myCarousel.value.prev()
      }
      onMounted(async () => {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
          }
        }
        try {
          await axios.get(`https://irohaxi.site/api/v1/albums/`, config) 
          .then(response => {
            popularAlbums.value = response.data
          })
        } catch (error) {
          console.log(error);
        }
      })

   //   const settings = {
   //    itemsToShow: 2,
   //    snapAlign: 'center',
   //  }
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    const breakpoints = ref({
      700: {
        itemsToShow: 3.5,
      //   snapAlign: 'center',
      },
      1024: {
        itemsToShow: 5,
      //   snapAlign: 'start',
      }
   })

      return {
        popularAlbums,
      //   settings,
        breakpoints,
        myCarousel,
        next,
        prev
      };
    },
  };
</script>
<style lang="scss" scoped>
.home {
   min-width: 0;
}
.albums__slider {
   display: flex;
   flex-direction: column;
}

.album {
   position: relative;
   display: grid;
   justify-items: center;
   margin: 0 auto;
   width: 200px;

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

</style>