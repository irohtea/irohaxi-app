<template>
   <div class="playlist__list">
      <album-track
      v-for="track in playlist" 
      :key="track.id" 
      :track="track" 
      />
   </div>
</template>

<script>

import { useStore } from 'vuex'
import { computed } from 'vue'
import AlbumTrack from '@/components/AlbumTrack.vue';

export default {
   components: {
      AlbumTrack,
   },
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
}

</style>