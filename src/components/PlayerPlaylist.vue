<template>
   <div class="playlist__list">
      <div class="playlist__item item" v-for="track in playlist" :key="track.id">
         <div class="item__body">
            <div class="item__img">
               <img :src="track.song_poster" :alt="track.name">
            </div>
            <div class="item__info">
               <div class="item__name">{{ track.name }}</div>
               <div class="item__band">{{ track.track_author }}</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

   export default {
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
		// .item__body
		&__body {
         display: flex;
         gap: 10px;
         align-items: center;
      }
		// .item__img
		&__img {
         width: 100px;
         height: 100px;
         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
      }
		// .item__info
		&__info {}
		// .item__name
		&__name {}
		// .item__band
		&__band {}
}

</style>