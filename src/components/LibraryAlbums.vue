<template>
  <div class="albums__container">
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
  </div>

</template>

<script>
import AddButton from '@/components/UI/AddButton.vue';
import MyAlbum from '@/components/MyAlbum.vue'

export default {
  name: 'library-albums',
  components: { 
    MyAlbum, 
    AddButton,
  },
  props: {
    albums: {
      type: Array,
      required: true
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
    }
}
</style>