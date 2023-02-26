<template>
  <div class="albums__items">
      <router-link to="/upload-album">
        <add-button>Albums</add-button>
      </router-link>
      <my-album 
      v-for="album in albums" 
      :key="album.id"
      :album="album" 
      />
  </div>
  <my-loader v-if="$store.state.is_loading" class="library__loader"></my-loader>
</template>

<script>
import AddButton from '@/components/UI/AddButton.vue';
import MyAlbum from '@/components/MyAlbum.vue'
import MyLoader from '@/components/UI/MyLoader.vue'

import { userAlbums } from '@/use/userAlbums'

export default {
  name: 'library-albums',
  components: { 
    MyAlbum, 
    AddButton,
    MyLoader
  },

  setup() {

    const { albums } = userAlbums()

    return {
      albums
    }
  }
}
</script>

<style lang="scss" scoped>
.albums {
		// .album__items
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