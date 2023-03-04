<template>
   <div class="album-tracks__list">
      <album-track 
      v-for="track in tracks" 
      :key="track.id" 
      :track="track"
      />
   </div>
</template>

<script>
import AlbumTrack from '@/components/AlbumTrack.vue';
export default {
   components: {
      AlbumTrack,
   },
   props: {
      tracks: {
         type: Array,
         required: true,
      }
   },
}
</script>

<style lang="scss" scoped>
.album-tracks {
   // .album-tracks__list
   &__list {
      display: flex;
      flex-direction: column;
      gap: 15px;
   }
}

</style>