<template>
  <div class="track__items">
      <router-link to="/upload-track">
        <add-button>Track</add-button>
      </router-link>
      <my-track 
      v-for="track in tracks" 
      :key="track.id"
      :track="track" 
      />
  </div>
</template>

<script>
import AddButton from '@/components/UI/AddButton.vue';
import MyTrack from '@/components/MyTrack.vue'
export default {
  name: 'library-tracks',
  components: {
    MyTrack,
    AddButton
  },
  props: {
    tracks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.track {
		// .track__items
		&__items {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fill,minmax(160px, 1fr));
    }
}

</style>