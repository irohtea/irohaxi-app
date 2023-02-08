<template>
  <div class="tracks__container">
     <div class="tracks__items">
        <router-link to="/upload-track">
          <add-button>Track</add-button>
        </router-link>
        <my-track 
        v-for="track in tracks" 
        :key="track.id"
        :track="track"
        :playingItem="playingItem"
        @playing="setPlaying"
        />
    </div>
  </div>
 
</template>

<script>
import AddButton from '@/components/UI/AddButton.vue';
import MyTrack from '@/components/MyTrack.vue'
import { ref } from '@vue/reactivity';
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
  },
  setup() {
    const playingItem = ref(null)
    const setPlaying = (id) =>{
      playingItem.value = id;
      console.log(id);
    }
    return {
      setPlaying,
      playingItem
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
    }
}

</style>