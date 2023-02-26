<template>
  <div class="tracks__items">
    <router-link to="/upload-track">
      <add-button class="tracks__add-button">Track</add-button>
    </router-link>
    <my-track 
    v-for="track in tracks" 
    :key="track.id"
    :track="track"
    />
  </div>
  <my-loader v-if="$store.state.is_loading" class="library__loader"></my-loader>
</template>

<script>
import AddButton from '@/components/UI/AddButton.vue';
import MyTrack from '@/components/MyTrack.vue'
import MyLoader from '@/components/UI/MyLoader.vue'

import { userTracks } from '@/use/userTracks'

export default {
  name: 'library-tracks',
  components: {
    MyTrack,
    AddButton,
    MyLoader
  },
  setup() {
    const { tracks } = userTracks()
    
    return {
      tracks
    }
  }
}
</script>

<style lang="scss" scoped>
.tracks {
		// .track__items
		&__items {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
      @media (max-width: 768.98px){
        grid-template-columns: 1fr;
      }
    }
}

</style>