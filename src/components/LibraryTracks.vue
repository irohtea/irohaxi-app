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
import { onMounted } from 'vue';
import { useStore } from 'vuex'
export default {
  name: 'library-tracks',
  components: {
    MyTrack,
    AddButton,
    MyLoader
  },
  setup() {
    const store = useStore()
    const { tracks } = userTracks()

    onMounted(() => {
      store.dispatch('getPlaylists')
    })
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

.slide-enter-active,
.slide-leave-active {
  -webkit-transition: all 1s cubic-bezier(0.68, 0.16, 0.42, 0.75);
  transition: all .3s cubic-bezier(0.68, 0.16, 0.42, 0.75);
}

.slide-enter-from,
.slide-leave-to {
  //  transform: translateX(100%);
   opacity: 0;
}
</style>